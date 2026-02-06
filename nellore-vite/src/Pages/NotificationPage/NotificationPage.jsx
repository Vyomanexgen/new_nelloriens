import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { jsPDF } from "jspdf";
import { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CommonAds from "../../components/CommonAds/CommonAds";
import CommonPageLayout from "../../components/CommonPageLayout";
import Pagination from "../../components/Pagination";
import useTranslation from "../../hooks/useTranslation";
import { fetchUpdates } from "../../state/slices/newsSlice";
import {
  addToRecentlyOpened,
  getNotificationDetail,
  getNotifications,
} from "../../state/slices/notificationSlice";
import "./NotificationPage.css";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    notificationsList,
    notificationsFilters,

    status,
    error,
  } = useSelector((state) => state.notifications);

  const { updatesFeedItems, updatesStatus, updatesError } = useSelector(
    (state) => state.news,
  );

  useEffect(() => {
    // Fetch Notifications
    if (status === "idle") {
      dispatch(getNotifications());
    }
    // Fetch Updates
    if (updatesStatus === "idle") {
      dispatch(fetchUpdates());
    }
  }, [dispatch, status, updatesStatus]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Tool States
  const [showToolModal, setShowToolModal] = useState(null); // 'date', 'category', 'alert'
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [tempDateRange, setTempDateRange] = useState({ start: "", end: "" }); // For modal inputs

  const mergedNotifications = useMemo(() => {
    const formattedUpdates = updatesFeedItems.map((item) => ({
      id: `update-${item.id}`,
      title: item.title,
      category: item.category || "Updates",
      board: item.location || "Nellore",
      session: item.timeLabel || "Recent",
      tags: [item.category, item.timeframe].filter(Boolean),
      description: item.description,
      actions: [item.primaryAction, item.secondaryAction].filter(Boolean),
      publishedDate: item.detail?.postedOn
        ? new Date(item.detail.postedOn)
        : new Date(),
      isUpdate: true, // Marker if needed
    }));

    return [...notificationsList, ...formattedUpdates];
  }, [notificationsList, updatesFeedItems]);

  const filteredNotifications = useMemo(() => {
    let filtered = mergedNotifications.filter((notification) => {
      const matchesFilter =
        activeFilter === "All" || notification.category === activeFilter;

      if (!matchesFilter) {
        return false;
      }

      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        return (
          notification.title.toLowerCase().includes(term) ||
          notification.description.toLowerCase().includes(term) ||
          notification.tags.some((tag) => tag.toLowerCase().includes(term))
        );
      }

      if (dateRange.start) {
        const startDate = new Date(dateRange.start);
        if (new Date(notification.publishedDate) < startDate) return false;
      }
      if (dateRange.end) {
        const endDate = new Date(dateRange.end);
        // Set end date to end of day
        endDate.setHours(23, 59, 59, 999);
        if (new Date(notification.publishedDate) > endDate) return false;
      }

      return true;
    });

    // Sort by published date (most recent first)
    filtered.sort(
      (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate),
    );

    return filtered;
  }, [mergedNotifications, activeFilter, searchTerm, dateRange]);

  const handleFilterChange = (filterLabel) => {
    setActiveFilter(filterLabel);
    setCurrentPage(1);
  };

  /* Pagination State */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset page when filters change

  const displayedNotifications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNotifications.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNotifications, currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNotificationAction = async (notification, actionType) => {
    dispatch(addToRecentlyOpened(notification));

    // Fetch full details
    if (notification.id && !notification.isUpdate) {
      try {
        const resultAction = await dispatch(
          getNotificationDetail(notification.id),
        );
        if (getNotificationDetail.fulfilled.match(resultAction)) {
          const fullDetails = resultAction.payload;
          // Merge details, ensuring we don't lose existing UI props like tags/actions if API doesn't return them
          setSelectedNotification({
            ...notification,
            ...fullDetails,
          });
        } else {
          setSelectedNotification(notification);
        }
      } catch (e) {
        console.error("Failed to fetch notification details", e);
        setSelectedNotification(notification);
      }
    } else {
      setSelectedNotification(notification);
    }

    if (
      actionType.toLowerCase().includes("pdf") ||
      actionType.toLowerCase().includes("download")
    ) {
      // Ideally wait for details before generating PDF, but for responsiveness we show modal first
      // generating PDF might fail if fullContent is missing, so we'll rely on the modal for now
      // or generate with what we have.
      generatePDF(notification); // using basic info for now
      setShowModal(true);
    } else {
      setShowModal(true);
    }
    console.log(`Action: ${actionType} for notification: ${notification.id}`);
  };

  const generatePDF = (item) => {
    const doc = new jsPDF();

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 51, 102); // Dark Blue
    doc.text("Nellorien Hub Notifications", 105, 20, { align: "center" });

    // Line
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    const titleLines = doc.splitTextToSize(item.title, 190);
    doc.text(titleLines, 10, 40);

    let yPos = 40 + titleLines.length * 7 + 5;

    // Meta
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100);
    const metaText = `Category: ${item.category}   |   Date: ${item.publishedDate ? new Date(item.publishedDate).toLocaleDateString() : "N/A"}   |   Board: ${item.board || "N/A"}`;
    doc.text(metaText, 10, yPos);

    yPos += 10;

    // Full Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0);

    const content = item.fullContent || item.description || "";
    // Handle paragraphs explicitly if needed, but splitTextToSize roughly handles wrapping.
    // To handle \n\n properly, we can split by newline first.
    const paragraphs = content.split("\n");

    paragraphs.forEach((para) => {
      if (!para.trim()) {
        yPos += 5; // Extra spacing for empty lines
        return;
      }
      const lines = doc.splitTextToSize(para.trim(), 190);

      // Check for page break
      if (yPos + lines.length * 7 > 280) {
        doc.addPage();
        yPos = 20;
      }

      doc.text(lines, 10, yPos);
      yPos += lines.length * 7 + 5; // Line height + paragraph spacing
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Generated by Nellorien Hub", 105, 290, { align: "center" });

    doc.save(
      `${item.title
        .substring(0, 30)
        .trim()
        .replace(/[^a-z0-9]/gi, "_")}.pdf`,
    );
  };

  const handleModalPrimaryAction = () => {
    if (!selectedNotification) return;

    const primaryAction = selectedNotification.actions[0];
    if (
      primaryAction &&
      (primaryAction.toLowerCase().includes("pdf") ||
        primaryAction.toLowerCase().includes("download"))
    ) {
      generatePDF(selectedNotification);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedNotification(null), 300);
  };

  /*
   * Handlers
   */

  const handleApplyDateFilter = () => {
    setDateRange(tempDateRange);
    setShowToolModal(null);
    setCurrentPage(1);
  };

  const clearDateFilter = () => {
    setTempDateRange({ start: "", end: "" });
    setDateRange({ start: "", end: "" });
    setShowToolModal(null);
  };

  const handleSetAlert = () => {
    setShowToolModal(null);
  };

  // Main Content
  const mainContent = (
    <>
      {/* Updates Status/Error Feedback which are merged into list below, but effectively handled by slice fallback */}
      {updatesStatus === "failed" && (
        <div className="alert alert-info py-1 mb-2 small">
          Updates: Showing cached data. ({updatesError})
        </div>
      )}
      <div className="notifications-list">
        {status === "loading" && (
          <div className="d-flex align-items-center justify-content-center p-5">
            <div className="spinner-border text-primary me-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span>Loading notifications...</span>
          </div>
        )}
        {status === "failed" && (
          <div className="alert alert-warning mb-3">
            Note: Showing cached/mock data due to connection error. ({error})
          </div>
        )}
        {displayedNotifications.map((notification) => (
          <div key={notification.id} className="notification-card">
            <div className="notification-card-header">
              <h3 className="notification-card-title">{notification.title}</h3>
              <div className="notification-card-tags">
                {notification.tags.map((tag, idx) => (
                  <span key={idx} className="notification-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="notification-card-description">
              {notification.description}
            </p>
            <div className="notification-card-footer">
              <span className="notification-meta">
                {notification.board} • {notification.session}
              </span>
              <div className="notification-actions">
                {notification.actions.map((action, idx) => (
                  <button
                    key={idx}
                    className={`notification-action-btn ${
                      idx === 0
                        ? "notification-action-primary"
                        : "notification-action-secondary"
                    }`}
                    onClick={() =>
                      handleNotificationAction(notification, action)
                    }
                  >
                    {t(action) || action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
        {displayedNotifications.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">
              {t("NoNotificationsFound") || "No notifications found"}
            </p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredNotifications.length}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </>
  );

  // Sidebar Content
  const sidebarContent = (
    <>
      <CommonAds />
    </>
  );

  const localizedFilters = notificationsFilters.map((f) => ({
    ...f,
    label: t(f.label) || f.label,
  }));

  return (
    <>
      <CommonPageLayout
        pageTitle={t("Notifications")}
        pageIcon="bi bi-bell"
        pageSubtitle={t("NotificationsSubtitle")}
        filterTabs={localizedFilters}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        searchTerm={searchTerm}
        onSearchChange={(newTerm) => {
          setSearchTerm(newTerm);
          setCurrentPage(1);
        }}
        searchPlaceholder={t("SearchNotifications")}
        includeSearch={true}
        mainContent={mainContent}
        sidebarContent={sidebarContent}
        footerTagline={t("NotificationFooterTagline")}
        includeNavbarSearch={false}
      />

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedNotification && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedNotification.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">
                <div className="d-flex flex-wrap gap-2 text-muted mb-3">
                  <span className="d-flex align-items-center">
                    <i className="bi bi-tag me-1"></i>
                    {selectedNotification.category}
                  </span>
                  <span className="d-flex align-items-center">
                    <i className="bi bi-calendar me-1"></i>
                    {selectedNotification.publishedDate
                      ? new Date(
                          selectedNotification.publishedDate,
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                  <span className="d-flex align-items-center">
                    <i className="bi bi-bookmark me-1"></i>
                    {selectedNotification.session || "Current"}
                  </span>
                </div>

                {selectedNotification.tags &&
                  selectedNotification.tags.length > 0 && (
                    <div className="mb-3">
                      {selectedNotification.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="notification-tag me-2 mb-1 d-inline-block"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
              </div>

              <div className="notification-full-content">
                <h6 className="mb-2 text-primary">
                  {t("FullDetails") || "Full Details"}
                </h6>
                {selectedNotification.fullContent ? (
                  selectedNotification.fullContent
                    .split("\n\n")
                    .map((paragraph, idx) => (
                      <p key={idx} className="text-secondary">
                        {paragraph}
                      </p>
                    ))
                ) : (
                  <p className="text-secondary">
                    {selectedNotification.description}
                  </p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                {t("Close")}
              </Button>
              {/* Render actions from data if needed, or generic primary action */}
              {selectedNotification.actions &&
                selectedNotification.actions[0] && (
                  <Button variant="primary" onClick={handleModalPrimaryAction}>
                    {t(selectedNotification.actions[0]) ||
                      selectedNotification.actions[0]}
                  </Button>
                )}
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Tools Modal */}
      <Modal
        show={!!showToolModal}
        onHide={() => setShowToolModal(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {showToolModal === "date" &&
              (t("FilterByDate") || "Filter by Date")}
            {showToolModal === "category" &&
              (t("ChooseCategory") || "Choose Category")}
            {showToolModal === "alert" && (t("SetAlerts") || "Set Alerts")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showToolModal === "date" && (
            <div className="d-flex flex-column gap-3">
              <div>
                <label className="form-label">
                  {t("StartDate") || "Start Date"}
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={tempDateRange.start}
                  onChange={(e) =>
                    setTempDateRange({
                      ...tempDateRange,
                      start: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="form-label">
                  {t("EndDate") || "End Date"}
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={tempDateRange.end}
                  onChange={(e) =>
                    setTempDateRange({ ...tempDateRange, end: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {showToolModal === "category" && (
            <div className="d-flex flex-wrap gap-2">
              {notificationsFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={
                    activeFilter === filter.label
                      ? "primary"
                      : "outline-secondary"
                  }
                  onClick={() => setActiveFilter(filter.label)}
                >
                  {t(filter.label) || filter.label}
                </Button>
              ))}
            </div>
          )}

          {showToolModal === "alert" && (
            <div>
              <p>
                {t("AlertInstruction") ||
                  "Enter your email to receive instant alerts for these notifications."}
              </p>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="name@example.com"
                defaultValue=""
              />
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="dailyDigest"
                />
                <label className="form-check-label" htmlFor="dailyDigest">
                  {t("DailyDigest") || "Send me a daily digest"}
                </label>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowToolModal(null)}>
            {t("Close")}
          </Button>

          {showToolModal === "date" && (
            <>
              <Button variant="outline-danger" onClick={clearDateFilter}>
                {t("ClearFilter") || "Clear Filter"}
              </Button>
              <Button variant="primary" onClick={handleApplyDateFilter}>
                {t("Apply") || "Apply"}
              </Button>
            </>
          )}

          {showToolModal === "category" && (
            <Button variant="primary" onClick={() => setShowToolModal(null)}>
              {t("Done") || "Done"}
            </Button>
          )}

          {showToolModal === "alert" && (
            <Button variant="primary" onClick={handleSetAlert}>
              {t("SetAlert") || "Set Alert"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NotificationPage;
