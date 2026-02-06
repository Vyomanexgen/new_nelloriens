import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CommonAds from "../../components/CommonAds/CommonAds";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import TopHeader from "../../components/TopHeader";
import useTranslation from "../../hooks/useTranslation";
import "./JobsPage.css";

import { fetchJobDetail, fetchJobs } from "../../state/slices/newsSlice";

const JobsPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    govtJobs = [],
    privateJobs = [],
    internships = [],
    jobsStatus,
    jobsError,
  } = useSelector((state) => state.news);

  useEffect(() => {
    if (jobsStatus === "idle") {
      dispatch(fetchJobs());
    }
  }, [dispatch, jobsStatus]);

  // Combine all jobs into a single array with normalized properties for filtering
  const allJobs = useMemo(() => {
    const normalizeJob = (job, category) => ({
      ...job,
      category, // Normalize category ('Government', 'Private', 'Internships')
      // Ensure postedDate is treated consistently if needed, though we use the raw string for display
    });

    return [
      ...govtJobs.map((j) => normalizeJob(j, "Government")),
      ...privateJobs.map((j) => normalizeJob(j, "Private")),
      ...internships.map((j) => normalizeJob(j, "Internships")),
    ];
  }, [govtJobs, privateJobs, internships]);

  // Extract unique locations dynamically from the job data
  const uniqueLocations = useMemo(() => {
    const locs = new Set();
    allJobs.forEach((job) => {
      if (job.location) locs.add(job.location);
    });
    return Array.from(locs).sort();
  }, [allJobs]);

  const [filters, setFilters] = useState({
    category: "All",
    location: "All",
    date: "All time",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setOpenDropdown(null);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const toggleDropdown = (filterType) => {
    setOpenDropdown(openDropdown === filterType ? null : filterType);
  };

  // Helper to parse date strings like "2d ago", "Posted Today"
  const getDaysAgo = (dateStr) => {
    if (!dateStr) return Infinity;
    const str = dateStr.toLowerCase();

    if (
      str.includes("today") ||
      str.includes("just now") ||
      str.includes("min") ||
      str.includes("hr")
    ) {
      return 0;
    }
    if (str.includes("yesterday")) {
      return 1;
    }

    // Match "Xd ago" pattern
    const daysMatch = str.match(/(\d+)\s*d\s*ago/);
    if (daysMatch) {
      return parseInt(daysMatch[1], 10);
    }

    // Match "Xw ago" or "X weeks" pattern for approximate days
    const weeksMatch = str.match(/(\d+)\s*(w|week)/);
    if (weeksMatch) {
      return parseInt(weeksMatch[1], 10) * 7;
    }

    // If it's something like "Fresher", "3+ yrs", treat as not matching specific date ranges
    return Infinity;
  };

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // 0. Search Filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
          job.title?.toLowerCase().includes(term) ||
          job.company?.toLowerCase().includes(term) ||
          job.location?.toLowerCase().includes(term);

        if (!matchesSearch) return false;
      }

      // 1. Category Filter
      if (filters.category !== "All" && job.category !== filters.category) {
        return false;
      }

      // 2. Location Filter
      if (filters.location !== "All" && job.location !== filters.location) {
        return false;
      }

      // 3. Date Filter
      if (filters.date !== "All time") {
        const daysAgo = getDaysAgo(job.postedDate);
        if (daysAgo === Infinity) return false; // Exclude non-date values when date filter is active?
        // Or render them? Assuming if I filter for "Last 7 days", I only want recent posts.

        if (filters.date === "Last 7 days" && daysAgo > 7) return false;
        if (filters.date === "Last 14 days" && daysAgo > 14) return false;
        if (filters.date === "Last 30 days" && daysAgo > 30) return false;
      }

      return true;
    });
  }, [allJobs, filters, searchTerm]);

  /* Pagination State */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const displayedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredJobs, currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleJobAction = async (job) => {
    setSelectedJob(job);
    setShowModal(true);

    if (job.id) {
      try {
        const resultAction = await dispatch(fetchJobDetail(job.id));
        if (fetchJobDetail.fulfilled.match(resultAction)) {
          // Merge the detail with existing job info to preserve category etc if needed
          setSelectedJob((prev) => ({ ...prev, ...resultAction.payload }));
        }
      } catch (error) {
        console.error("Failed to fetch job details:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  const renderJobCard = (job) => {
    const metaParts = [job.company];
    if (job.location) metaParts.push(job.location);
    if (job.postedDate) metaParts.push(job.postedDate);
    const jobMeta = metaParts.join(" · ");

    return (
      <div key={job.id} className="job-card">
        <h6 className="job-title">{job.title}</h6>
        <p className="job-meta">{jobMeta}</p>
        <p className="job-description">{job.description}</p>
        <button
          className={`job-action-btn ${job.buttonType === "apply" ? "job-action-btn-apply" : "job-action-btn-view"}`}
          onClick={() => handleJobAction(job)}
        >
          {job.buttonType === "apply" ? t("Apply") : t("View Details")}
        </button>
      </div>
    );
  };

  // Helper to determine active class for filter buttons
  const getFilterBtnClass = (isActive) =>
    `filter-pill-btn ${isActive ? "filter-pill-btn-active" : ""}`;

  const getDateLabel = (dateStr) => {
    const map = {
      "All time": "AllTime",
      "Last 7 days": "Last7Days",
      "Last 14 days": "Last14Days",
      "Last 30 days": "Last30Days",
    };
    return map[dateStr] ? t(map[dateStr]) : dateStr;
  };

  return (
    <div className="jobs-page">
      <TopHeader />
      <MainHeader siteName={t("siteName") + ".IN"} tagline={t("tagline")} />
      <Navbar includeSearch={false} />

      <div className="jobs-filter-section">
        <div className="container-fluid">
          <div className="jobs-section-heading">
            <i className="bi bi-briefcase me-2"></i>
            <h2 className="jobs-heading-title">{t("Jobs")}</h2>
          </div>
          <div className="jobs-filter-row" ref={dropdownRef}>
            <div className="filter-buttons-container">
              {/* Category Filter */}
              <div className="filter-button-wrapper">
                <button
                  className={getFilterBtnClass(
                    filters.category !== "All" || openDropdown === "category",
                  )}
                  onClick={() => toggleDropdown("category")}
                >
                  <i className="bi bi-stack me-2"></i>
                  <span>
                    {filters.category === "All"
                      ? t("Categories")
                      : t(filters.category)}
                  </span>
                </button>
                {openDropdown === "category" && (
                  <div className="filter-dropdown">
                    <button
                      onClick={() => handleFilterChange("category", "All")}
                    >
                      {t("AllCategories")}
                    </button>
                    <button
                      onClick={() =>
                        handleFilterChange("category", "Government")
                      }
                    >
                      {t("Government")}
                    </button>
                    <button
                      onClick={() => handleFilterChange("category", "Private")}
                    >
                      {t("Private")}
                    </button>
                    <button
                      onClick={() =>
                        handleFilterChange("category", "Internships")
                      }
                    >
                      {t("Internships")}
                    </button>
                  </div>
                )}
              </div>

              {/* Location Filter */}
              <div className="filter-button-wrapper">
                <button
                  className={getFilterBtnClass(
                    filters.location !== "All" || openDropdown === "location",
                  )}
                  onClick={() => toggleDropdown("location")}
                >
                  <i className="bi bi-geo-alt me-2"></i>
                  <span>
                    {filters.location === "All"
                      ? t("Location")
                      : filters.location}
                  </span>
                </button>
                {openDropdown === "location" && (
                  <div className="filter-dropdown">
                    <button
                      onClick={() => handleFilterChange("location", "All")}
                    >
                      {t("AllLocations")}
                    </button>
                    {uniqueLocations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleFilterChange("location", loc)}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Filter */}
              <div className="filter-button-wrapper">
                <button
                  className={getFilterBtnClass(
                    filters.date !== "All time" || openDropdown === "date",
                  )}
                  onClick={() => toggleDropdown("date")}
                >
                  <i className="bi bi-calendar me-2"></i>
                  <span>
                    {filters.date === "All time"
                      ? t("Date")
                      : getDateLabel(filters.date)}
                  </span>
                </button>
                {openDropdown === "date" && (
                  <div className="filter-dropdown">
                    <button
                      onClick={() => handleFilterChange("date", "All time")}
                    >
                      {t("AllTime")}
                    </button>
                    <button
                      onClick={() => handleFilterChange("date", "Last 7 days")}
                    >
                      {t("Last7Days")}
                    </button>
                    <button
                      onClick={() => handleFilterChange("date", "Last 14 days")}
                    >
                      {t("Last14Days")}
                    </button>
                    <button
                      onClick={() => handleFilterChange("date", "Last 30 days")}
                    >
                      {t("Last30Days")}
                    </button>
                  </div>
                )}
              </div>

              {/* Search Bar */}
              <div
                className="jobs-search-bar"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: "50px",
                  padding: "0.5rem 1rem",
                  border: "1px solid #dee2e6",
                  minWidth: "250px",
                }}
              >
                <i className="bi bi-search me-2 text-muted"></i>
                <input
                  type="text"
                  placeholder={t("SearchJobs") || "Search jobs..."}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    width: "100%",
                    fontSize: "0.9rem",
                    color: "#495057",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {jobsStatus === "loading" && (
          <div className="container py-3">
            <div className="d-flex align-items-center">
              <div className="spinner-border text-primary me-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span>Fetching latest jobs...</span>
            </div>
          </div>
        )}

        {jobsStatus === "failed" && (
          <div className="container py-3">
            <div className="alert alert-warning mb-0">
              Note: Showing cached/mock data due to connection error. (
              {jobsError})
            </div>
          </div>
        )}
      </div>

      <main className="jobs-main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="jobs-grid">
                {displayedJobs.length > 0 ? (
                  displayedJobs.map(renderJobCard)
                ) : (
                  <div className="no-jobs-found text-center py-5">
                    <h5 className="text-muted">{t("NoJobsFound")}</h5>
                  </div>
                )}
              </div>
              <Pagination
                currentPage={currentPage}
                totalItems={filteredJobs.length}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
              />
            </div>
            <div className="col-lg-4">
              <aside className="jobs-sidebar">
                <CommonAds />
              </aside>
            </div>
          </div>
        </div>
      </main>

      <Footer siteName={t("siteName") + ".IN"} tagline={t("FooterTagline")} />

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedJob && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedJob.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">
                <h5 className="text-secondary mb-2">{selectedJob.company}</h5>
                <div className="d-flex flex-wrap gap-2 text-muted mb-3">
                  <span className="d-flex align-items-center">
                    <i className="bi bi-geo-alt me-1"></i>
                    {selectedJob.location}
                  </span>
                  <span className="d-flex align-items-center">
                    <i className="bi bi-clock me-1"></i>
                    {selectedJob.postedDate}
                  </span>
                  <span className="d-flex align-items-center">
                    <i className="bi bi-briefcase me-1"></i>
                    {selectedJob.jobType}
                  </span>
                  <span className="d-flex align-items-center">
                    <i className="bi bi-star me-1"></i>
                    {selectedJob.experience}
                  </span>
                  {selectedJob.salary && (
                    <span className="d-flex align-items-center">
                      <i className="bi bi-currency-rupee me-1"></i>
                      {selectedJob.salary}
                    </span>
                  )}
                </div>

                {selectedJob.skills && selectedJob.skills.length > 0 && (
                  <div className="mb-3">
                    {selectedJob.skills.map((skill) => (
                      <Badge
                        bg="light"
                        text="dark"
                        className="me-2 mb-1 border"
                        key={skill}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="job-full-content">
                <h6 className="mb-2">
                  {t("JobDescription") || "Job Description"}
                </h6>
                {selectedJob.fullContent ? (
                  selectedJob.fullContent
                    .split("\n\n")
                    .map((paragraph, idx) => (
                      <p key={idx} className="text-secondary">
                        {paragraph}
                      </p>
                    ))
                ) : (
                  <p className="text-secondary">{selectedJob.description}</p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                {t("Close")}
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  console.log("Applying for:", selectedJob.id);
                  // Just close modal for now to simulate action completion or keep open
                  handleCloseModal();
                  alert("Application submitted successfully!");
                }}
              >
                {t("ApplyNow") || "Apply Now"}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default JobsPage;
