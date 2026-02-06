import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonAds from "../../components/CommonAds/CommonAds";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import MapView from "../../components/MapView/MapView";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import TopHeader from "../../components/TopHeader";
import useTranslation from "../../hooks/useTranslation";
import {
  fetchFamousStayDetail,
  fetchFamousStays,
  updateFilters,
} from "../../state/slices/famousStaysSlice";
import "./FamousstayPage.css";

const FamousstayPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    topPicks = [],
    quickFilters = [],
    nearbyFoods = [],
    commonAds = [],
    mapNearbyFilters = [],
    filters: reduxFilters,
    status,
    error,
  } = useSelector((state) => state.famousStays || {});

  useEffect(() => {
    // Only fetch if status is idle
    if (status === "idle") {
      dispatch(fetchFamousStays());
    }
  }, [dispatch, status]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [activeNearbyFilter, setActiveNearbyFilter] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    price: "All",
    rating: "All",
    location: "All",
  });

  /* Pagination State */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [selectedStay, setSelectedStay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online"); // 'online' or 'offline'
  const [bookingStatus, setBookingStatus] = useState("idle"); // 'idle', 'processing', 'confirmed'

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Extract unique locations from stays
  const uniqueLocations = useMemo(() => {
    // Extract unique locations. Assuming stay.location is a string.
    const locs = new Set(topPicks.map((stay) => stay.location));
    return ["All", ...Array.from(locs)];
  }, [topPicks]);

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

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const handleLocalFilterChange = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
    setOpenDropdown(null);
  };

  // Filter logic
  const filteredStays = useMemo(() => {
    let filtered = [...topPicks];

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (stay) =>
          stay.name?.toLowerCase().includes(q) ||
          stay.location?.toLowerCase().includes(q) ||
          stay.amenities?.some((amenity) => amenity.toLowerCase().includes(q)),
      );
    }

    // Rating filter (Redux)
    if (reduxFilters.rating === "4.0+") {
      filtered = filtered.filter((stay) => stay.rating >= 4.0);
    }

    // New Filter Logic from Top Dropdowns

    // Price Filter
    if (activeFilters.price !== "All") {
      if (activeFilters.price === "< ₹2000") {
        filtered = filtered.filter((stay) => stay.price < 2000);
      } else if (activeFilters.price === "₹2000 - ₹5000") {
        filtered = filtered.filter(
          (stay) => stay.price >= 2000 && stay.price <= 5000,
        );
      } else if (activeFilters.price === "> ₹5000") {
        filtered = filtered.filter((stay) => stay.price > 5000);
      }
    }

    // Rating Filter (Dropdown)
    if (activeFilters.rating !== "All") {
      if (activeFilters.rating === "4.0+") {
        filtered = filtered.filter((stay) => stay.rating >= 4.0);
      } else if (activeFilters.rating === "4.5+") {
        filtered = filtered.filter((stay) => stay.rating >= 4.5);
      }
    }

    // Location Filter
    if (activeFilters.location !== "All") {
      filtered = filtered.filter(
        (stay) => stay.location === activeFilters.location,
      );
    }

    // WiFi filter
    if (reduxFilters.freeWiFi) {
      filtered = filtered.filter((stay) =>
        stay.amenities?.some((a) => a.toLowerCase().includes("wi-fi")),
      );
    }

    // Breakfast filter
    if (reduxFilters.breakfast) {
      filtered = filtered.filter((stay) =>
        stay.amenities?.some((a) => a.toLowerCase().includes("breakfast")),
      );
    }

    // Parking filter
    if (reduxFilters.parking) {
      filtered = filtered.filter((stay) =>
        stay.amenities?.some((a) => a.toLowerCase().includes("parking")),
      );
    }

    return filtered;
  }, [topPicks, searchTerm, reduxFilters, activeFilters]);

  // Reset pagination when filters search/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, reduxFilters, activeFilters]);

  const displayedStays = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStays.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStays, currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of list
    const section = document.querySelector(".famousstay-top-picks");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleFilterToggle = (filterKey) => {
    if (filterKey === "rating") {
      dispatch(
        updateFilters({
          rating: reduxFilters.rating === "4.0+" ? "All" : "4.0+",
        }),
      );
    } else {
      dispatch(
        updateFilters({
          [filterKey]: !reduxFilters[filterKey],
        }),
      );
    }
  };

  const handleCardClick = async (stay) => {
    setSelectedStay(stay);
    setShowModal(true);

    if (stay.id) {
      try {
        const resultAction = await dispatch(fetchFamousStayDetail(stay.id));
        if (fetchFamousStayDetail.fulfilled.match(resultAction)) {
          setSelectedStay((prev) => ({ ...stay, ...resultAction.payload }));
        }
      } catch (e) {
        console.error("Failed to fetch stay details", e);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedStay(null), 300);
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setBookingStatus("idle");
    setPaymentMethod("online");
  };

  const handleBookingConfirm = (e) => {
    e.preventDefault();
    setBookingStatus("processing");

    // Simulate API call
    setTimeout(() => {
      setBookingStatus("confirmed");
    }, 1500);
  };

  const handleStayAction = (stay, action) => {
    console.log(`${action} for ${stay.name}`);

    if (action === "Book now" || action === "Check availability") {
      setSelectedStay(stay);
      // Check if details modal is open, if so, close it?
      // User experience: Maybe keep details open underneath?
      // React-bootstrap modals stack fine.
      setShowBookingModal(true);
    } else if (action === "Save") {
      // Functional Save: Persist to localStorage
      const saved = JSON.parse(localStorage.getItem("savedStays") || "[]");
      const isSaved = saved.some((s) => s.id === stay.id);

      if (isSaved) {
        const newSaved = saved.filter((s) => s.id !== stay.id);
        localStorage.setItem("savedStays", JSON.stringify(newSaved));
        alert(`${stay.name} removed from your wishlist.`);
      } else {
        saved.push(stay);
        localStorage.setItem("savedStays", JSON.stringify(saved));
        alert(`${stay.name} saved to your wishlist!`);
      }
    } else if (action === "Share") {
      // Functional Share: Clipboard
      const text = `Check out ${stay.name} in Nellore! Rated ${stay.rating}/5. Located at ${stay.location}.`;
      if (navigator.share) {
        navigator
          .share({
            title: stay.name,
            text: text,
            url: window.location.href,
          })
          .catch((err) => console.log("Error sharing", err));
      } else {
        navigator.clipboard.writeText(text).then(() => {
          alert("Stay details copied to clipboard!");
        });
      }
    }
  };

  return (
    <div className="famousstay-page">
      <TopHeader />
      <MainHeader siteName={t("siteName") + ".IN"} tagline={t("tagline")} />
      <Navbar includeSearch={false} />

      <main className="famousstay-main">
        {/* Hero Header Section */}
        {/* Hero Header Section */}
        <section className="famousstay-header-section">
          <div className="container-fluid">
            <div className="famousstay-header-container">
              {/* Left Image Removed */}
              {/* <div className="famousstay-header-image-wrapper">
                <img src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200" alt="Famous Stays" />
              </div> */}

              {/* Right Content */}
              <div className="famousstay-header-content-wrapper">
                <h1 className="famousstay-header-title">
                  Famous Stays in Nellore
                </h1>
                <p className="famousstay-header-subtitle">
                  Curated hotels, heritage stays, and budget picks — close to
                  food streets and historic landmarks.
                </p>

                <div className="famousstay-combined-search-row">
                  <div className="famousstay-combined-bar">
                    <i className="bi bi-search search-icon"></i>
                    <input
                      type="text"
                      placeholder="Search hotel, area, landmark"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="combined-search-input"
                    />
                    <div className="combined-divider"></div>
                    <div className="filter-wrapper combined-filter-wrapper">
                      <button
                        className="combined-filter-btn"
                        onClick={() => toggleDropdown("price")}
                      >
                        <i className="bi bi-funnel"></i>
                        <span>Filters</span>
                      </button>
                      {openDropdown === "price" && (
                        <div className="filter-dropdown">
                          {["All", "< ₹2000", "₹2000 - ₹5000", "> ₹5000"].map(
                            (price) => (
                              <button
                                key={price}
                                className={
                                  activeFilters.price === price
                                    ? "selected"
                                    : ""
                                }
                                onClick={() =>
                                  handleLocalFilterChange("price", price)
                                }
                              >
                                {price}
                              </button>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-fluid">
          <div className="famousstay-content-wrapper">
            {/* Main Content */}
            <div className="famousstay-main-content">
              {/* Top Picks Section */}
              <section className="famousstay-top-picks">
                <div className="famousstay-section-header">
                  <div>
                    <h2 className="famousstay-section-title">
                      {t("TopPicks")}
                    </h2>
                    <span className="famousstay-editor-label">
                      {t("EditorsChoice")}
                    </span>
                  </div>

                  {status === "loading" && (
                    <div
                      className="spinner-border text-primary ms-3"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </div>

                {status === "failed" && (
                  <div className="alert alert-warning mb-4">
                    Note: Showing cached/mock data due to connection error. (
                    {error})
                  </div>
                )}

                <div className="famousstay-stays-grid">
                  {displayedStays.map((stay) => (
                    <div
                      key={stay.id}
                      className="famousstay-stay-card"
                      onClick={() => handleCardClick(stay)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="famousstay-stay-image">
                        <img src={stay.image} alt={stay.name} />
                        {stay.isEditorChoice && (
                          <span className="famousstay-editor-badge">
                            {t("EditorsChoice")}
                          </span>
                        )}
                      </div>
                      <div className="famousstay-stay-body">
                        <div className="famousstay-stay-header">
                          <h3 className="famousstay-stay-name">{stay.name}</h3>
                          <div className="famousstay-stay-rating">
                            <i className="bi bi-star-fill"></i>
                            <span>{stay.rating}</span>
                          </div>
                        </div>
                        <p className="famousstay-stay-location">
                          <i className="bi bi-geo-alt"></i>
                          {stay.location}
                        </p>
                        <p className="famousstay-stay-price">
                          ₹{stay.price.toLocaleString()}/{stay.priceUnit}
                        </p>
                        <div className="famousstay-stay-amenities">
                          {stay.amenities.map((amenity, idx) => (
                            <span key={idx} className="famousstay-amenity-tag">
                              {amenity}
                            </span>
                          ))}
                        </div>
                        <div className="famousstay-stay-actions">
                          {stay.actions.map((action, idx) => (
                            <button
                              key={idx}
                              className={`famousstay-action-btn ${
                                idx === 0
                                  ? "famousstay-action-primary"
                                  : "famousstay-action-secondary"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStayAction(stay, action);
                              }}
                            >
                              {t(action.replace(/\s/g, "")) || action}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalItems={filteredStays.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={onPageChange}
                />
              </section>

              {/* Map & Nearby Section */}
              <section className="famousstay-map-section">
                <div className="famousstay-section-header">
                  <h2 className="famousstay-section-title">{t("MapNearby")}</h2>
                  <button className="famousstay-explore-btn">
                    {t("Explore")}
                  </button>
                </div>
                <div className="famousstay-map-container">
                  {/* <div className="famousstay-map-placeholder">
                    <i className="bi bi-map"></i>
                    <p>Interactive Map View</p>
                  </div>  */}
                  <MapView />
                </div>
                <div className="famousstay-nearby-filters">
                  <span className="famousstay-nearby-label">
                    {t("ShowStaysNear")}
                  </span>
                  <div className="famousstay-nearby-buttons">
                    {mapNearbyFilters.map((filter) => (
                      <button
                        key={filter.id}
                        className={`famousstay-nearby-btn ${
                          activeNearbyFilter === filter.id ? "active" : ""
                        }`}
                        onClick={() =>
                          setActiveNearbyFilter(
                            activeNearbyFilter === filter.id ? null : filter.id,
                          )
                        }
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  <button className="famousstay-refine-btn">
                    {t("Refine")}
                  </button>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="famousstay-sidebar">
              {/* Quick Filters */}
              <div className="famousstay-sidebar-section">
                <h4 className="famousstay-sidebar-title">
                  {t("QuickFilters")}
                </h4>
                <div className="famousstay-filters-grid">
                  {quickFilters.map((filter) => (
                    <button
                      key={filter.id}
                      className={`famousstay-filter-chip ${
                        (filter.label === "Rating 4.0+" &&
                          reduxFilters.rating === "4.0+") ||
                        (filter.label === "Free Wi-Fi" &&
                          reduxFilters.freeWiFi) ||
                        (filter.label === "Breakfast" &&
                          reduxFilters.breakfast) ||
                        (filter.label === "Parking" && reduxFilters.parking)
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        if (filter.label === "Rating 4.0+") {
                          handleFilterToggle("rating");
                        } else if (filter.label === "Free Wi-Fi") {
                          handleFilterToggle("freeWiFi");
                        } else if (filter.label === "Breakfast") {
                          handleFilterToggle("breakfast");
                        } else if (filter.label === "Parking") {
                          handleFilterToggle("parking");
                        }
                      }}
                    >
                      <i className={`bi ${filter.icon}`}></i>
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nearby Famous Foods */}
              <CommonAds />
            </aside>
          </div>
        </div>
      </main>

      <Footer siteName={t("siteName") + ".IN"} tagline={t("FooterTagline")} />

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedStay && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedStay.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4 text-center">
                <img
                  src={selectedStay.image}
                  alt={selectedStay.name}
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-primary fs-6">
                  <i className="bi bi-star-fill me-1"></i>
                  {selectedStay.rating} / 5
                </span>
                <span className="text-secondary fw-bold fs-5">
                  ₹{selectedStay.price.toLocaleString()}{" "}
                  <span className="fs-6 fw-normal text-muted">
                    / {selectedStay.priceUnit}
                  </span>
                </span>
              </div>
              <p className="text-muted mb-3">
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                {selectedStay.location}
              </p>

              <div className="mb-3">
                <h6 className="fw-bold">Amenities:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {selectedStay.amenities.map((amenity, idx) => (
                    <span key={idx} className="badge bg-light text-dark border">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="famousstay-full-content">
                <h5 className="mb-3 text-secondary">
                  {t("AboutProperty") || "About Property"}
                </h5>
                {selectedStay.fullContent ? (
                  selectedStay.fullContent
                    .split("\n\n")
                    .map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-secondary"
                        style={{ lineHeight: "1.6" }}
                      >
                        {paragraph}
                      </p>
                    ))
                ) : (
                  <p className="text-secondary">
                    Explore the best hospitality in Nellore. This property
                    offers a unique blend of comfort and convenience.
                  </p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleCloseModal}>
                {t("Close")}
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleCloseModal(); // Optional: close details
                  handleStayAction(selectedStay, "Book now");
                }}
              >
                {t("BookNow") || "Book Now"}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Booking Modal */}
      <Modal
        show={showBookingModal}
        onHide={handleCloseBookingModal}
        centered
        backdrop="static"
      >
        {selectedStay && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {bookingStatus === "confirmed"
                  ? "Booking Confirmed!"
                  : "Book Your Stay"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {bookingStatus === "confirmed" ? (
                <div className="text-center py-4">
                  <div className="mb-3">
                    <i
                      className="bi bi-check-circle-fill text-success"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <h4>Thank You!</h4>
                  <p className="text-muted">
                    Your booking at <strong>{selectedStay.name}</strong> has
                    been confirmed.
                  </p>
                  <p>
                    Booking ID:{" "}
                    <strong>
                      NEL-{Math.floor(1000 + Math.random() * 9000)}
                    </strong>
                  </p>
                  {paymentMethod === "offline" && (
                    <div className="alert alert-warning mt-3">
                      <i className="bi bi-cash-coin me-2"></i>
                      Please pay <strong>₹{selectedStay.price}</strong> at the
                      hotel reception upon arrival.
                    </div>
                  )}
                  <p className="small text-muted mt-4">
                    A confirmation email has been sent to your registered
                    address.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingConfirm}>
                  {/* Stay Summary */}
                  <div className="d-flex align-items-center mb-4 p-3 bg-light rounded">
                    <img
                      src={selectedStay.image}
                      alt=""
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                      className="me-3"
                    />
                    <div>
                      <h6 className="mb-0">{selectedStay.name}</h6>
                      <small className="text-muted">
                        {selectedStay.location}
                      </small>
                      <div className="fw-bold text-primary">
                        ₹{selectedStay.price}{" "}
                        <span className="fw-normal text-muted">/ night</span>
                      </div>
                    </div>
                  </div>

                  {/* Guest Details */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small text-muted">
                        Check-in
                      </label>
                      <input type="date" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-muted">
                        Check-out
                      </label>
                      <input type="date" className="form-control" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label small text-muted">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Payment Method</label>

                    <div
                      className="border rounded p-3 mb-2"
                      onClick={() => setPaymentMethod("online")}
                      style={{
                        cursor: "pointer",
                        borderColor:
                          paymentMethod === "online" ? "#0d6efd" : "#dee2e6",
                        backgroundColor:
                          paymentMethod === "online" ? "#f8f9fa" : "white",
                      }}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === "online"}
                          onChange={() => {}}
                        />
                        <label className="form-check-label fw-bold">
                          Pay Online
                        </label>
                        <div className="small text-muted mt-1">
                          Credit/Debit Card, UPI, Net Banking
                        </div>
                        {paymentMethod === "online" && (
                          <div className="mt-2 text-primary small">
                            <i className="bi bi-shield-lock me-1"></i> Secure
                            Payment Gateway
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className="border rounded p-3"
                      onClick={() => setPaymentMethod("offline")}
                      style={{
                        cursor: "pointer",
                        borderColor:
                          paymentMethod === "offline" ? "#0d6efd" : "#dee2e6",
                        backgroundColor:
                          paymentMethod === "offline" ? "#f8f9fa" : "white",
                      }}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === "offline"}
                          onChange={() => {}}
                        />
                        <label className="form-check-label fw-bold">
                          Pay at Hotel
                        </label>
                        <div className="small text-muted mt-1">
                          Pay cash or card when you check-in. No prepayment
                          required.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-grid">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={bookingStatus === "processing"}
                      size="lg"
                    >
                      {bookingStatus === "processing"
                        ? "Processing..."
                        : paymentMethod === "online"
                          ? `Pay ₹${selectedStay.price}`
                          : "Confirm Booking"}
                    </Button>
                  </div>
                </form>
              )}
            </Modal.Body>
            {bookingStatus === "confirmed" && (
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseBookingModal}>
                  Close
                </Button>
              </Modal.Footer>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default FamousstayPage;
