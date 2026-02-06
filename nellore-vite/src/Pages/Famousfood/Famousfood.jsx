import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonAds from "../../components/CommonAds/CommonAds";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import TopHeader from "../../components/TopHeader";
import useTranslation from "../../hooks/useTranslation";
import {
  fetchFamousFoodDetail,
  fetchFamousFoods,
} from "../../state/slices/famousFoodsSlice";
import "./Famousfood.css";

// Unused import 'useDispatch' effectively unused now if handleCreateItinerary removed,
// but sticking to instructions to remove lines.
// However, handleCreateItinerary used dispatch. If I remove handleCreateItinerary, dispatch might be unused.
// Let's check other usages of dispatch. None found in search.
// So removal of dispatch is safe.
const Famousfood = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    signatureDishes = [],
    topRatedSpots = [],
    commonAds = [],
    filters: reduxFilters,
    status, // Get status from state
    error, // Get error from state
  } = useSelector((state) => state.famousFoods || {});

  useEffect(() => {
    // Fetch foods if status is idle
    if (status === "idle") {
      dispatch(fetchFamousFoods());
    }
  }, [dispatch, status]);

  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    category: "All",
    location: "All",
  });

  /* Pagination State */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  /* Modal State */
  const [showModal, setShowModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  // Normalize dishes and add mock locations for filtering demonstration
  const allDishes = useMemo(() => {
    const locations = ["Nellore", "Gudur", "Nellore", "Kavali"];
    return signatureDishes.map((dish, index) => ({
      ...dish,
      location: locations[index % locations.length] || "Nellore",
    }));
  }, [signatureDishes]);

  // Extract unique categories and locations
  const uniqueCategories = useMemo(() => {
    const cats = new Set(allDishes.map((d) => d.category || d.tag)); // Use category or tag
    return ["All", ...Array.from(cats)];
  }, [allDishes]);

  const uniqueLocations = useMemo(() => {
    const locs = new Set(allDishes.map((d) => d.location));
    return ["All", ...Array.from(locs)];
  }, [allDishes]);

  // Reset pagination when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

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

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
    setOpenDropdown(null);
  };

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  // Filter logic
  const filteredDishes = useMemo(() => {
    return allDishes.filter((dish) => {
      // Category filter
      if (
        filters.category !== "All" &&
        dish.category !== filters.category &&
        dish.tag !== filters.category
      ) {
        return false;
      }

      // Location filter
      if (filters.location !== "All" && dish.location !== filters.location) {
        return false;
      }

      // Search filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          dish.name?.toLowerCase().includes(q) ||
          dish.description?.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [allDishes, filters, searchTerm]);

  const displayedDishes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDishes.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDishes, currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    const section = document.querySelector(".famousfood-signature-dishes");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleDishAction = (dish, action) => {
    console.log(`${action} for ${dish.name}`);
    if (action === "Where to eat" || action === "Popular spots") {
      navigate(`/food/${dish.id}/locations`);
    } else if (action === "Map") {
      navigate(`/food/${dish.id}/map`);
    }
  };

  const handleLocalFavorites = () => {
    console.log("Navigate to local favorites");
    navigate("/food/local-favorites");
  };

  const handleSpotClick = (spot) => {
    console.log("Navigate to:", spot.name);
    navigate(`/food/restaurants/${spot.id}`);
  };

  const handleCardClick = async (dish) => {
    setSelectedDish(dish);
    setShowModal(true);

    if (dish.id) {
      try {
        const resultAction = await dispatch(fetchFamousFoodDetail(dish.id));
        if (fetchFamousFoodDetail.fulfilled.match(resultAction)) {
          setSelectedDish((prev) => ({ ...dish, ...resultAction.payload }));
        }
      } catch (e) {
        console.error("Failed to fetch food details", e);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedDish(null), 300);
  };

  return (
    <div className="famousfood-page">
      <TopHeader />
      <MainHeader siteName={t("siteName") + ".IN"} tagline={t("tagline")} />
      <Navbar includeSearch={false} />

      <main className="famousfood-main">
        {/* Header Section */}
        <section className="famousfood-header">
          <div className="famousfood-header-content">
            <div className="famousfood-title-section">
              <h1 className="famousfood-title">{t("FamousFoodsOfNellore")}</h1>
              <button
                className="famousfood-local-btn"
                onClick={handleLocalFavorites}
              >
                <i className="bi bi-utensils"></i>
                {t("LocalFavorites")}
              </button>
            </div>

            <div className="famousfood-controls" ref={dropdownRef}>
              <div className="famousfood-search-bar">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder={t("SearchDishes")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="famousfood-filter-buttons">
                {/* Category Dropdown */}
                <div className="filter-wrapper">
                  <button
                    className={`famousfood-filter-btn ${filters.category !== "All" || openDropdown === "category" ? "active" : ""}`}
                    onClick={() => toggleDropdown("category")}
                  >
                    <i className="bi bi-tags"></i>
                    {filters.category === "All"
                      ? t("SelectCategory")
                      : filters.category}
                  </button>
                  {openDropdown === "category" && (
                    <div className="filter-dropdown">
                      {uniqueCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleFilterChange("category", cat)}
                          className={filters.category === cat ? "selected" : ""}
                        >
                          {cat === "All" ? t("All") : cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Dropdown */}
                <div className="filter-wrapper">
                  <button
                    className={`famousfood-filter-btn ${filters.location !== "All" || openDropdown === "location" ? "active" : ""}`}
                    onClick={() => toggleDropdown("location")}
                  >
                    <i className="bi bi-geo-alt"></i>
                    {filters.location === "All"
                      ? t("Location") + ": " + t("All")
                      : filters.location}
                  </button>
                  {openDropdown === "location" && (
                    <div className="filter-dropdown">
                      {uniqueLocations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => handleFilterChange("location", loc)}
                          className={filters.location === loc ? "selected" : ""}
                        >
                          {loc === "All" ? t("All") : loc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container-fluid">
          <div className="famousfood-content-wrapper">
            {/* Main Content */}
            <div className="famousfood-main-content">
              {/* Signature Dishes Section */}
              <section className="famousfood-signature-dishes">
                <div className="famousfood-section-header">
                  <h2 className="famousfood-section-title">
                    {t("SignatureDishes")}
                  </h2>

                  {status === "loading" && (
                    <div
                      className="spinner-border text-primary ms-3"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}

                  <button className="famousfood-must-try-btn">
                    {t("MustTry")}
                  </button>
                </div>

                {status === "failed" && (
                  <div className="alert alert-warning mb-4">
                    Note: Showing cached/mock data due to connection error. (
                    {error})
                  </div>
                )}

                <div className="famousfood-dishes-list">
                  {displayedDishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="famousfood-dish-card"
                      onClick={() => handleCardClick(dish)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="famousfood-dish-image">
                        <img src={dish.image} alt={dish.name} />
                      </div>
                      <div className="famousfood-dish-body">
                        <h3 className="famousfood-dish-name">{dish.name}</h3>
                        <p className="famousfood-dish-description">
                          {dish.description}
                        </p>
                        <div className="famousfood-dish-footer">
                          <span
                            className={`famousfood-dish-tag ${dish.tag.toLowerCase()}`}
                          >
                            {dish.tag}
                          </span>
                          <button
                            className="famousfood-dish-action-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDishAction(dish, dish.actionLabel);
                            }}
                          >
                            {dish.actionLabel}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalItems={filteredDishes.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={onPageChange}
                />
              </section>
            </div>

            {/* Sidebar */}
            <aside className="famousfood-sidebar">
              {/* Top Rated Spots */}
              <div className="famousfood-sidebar-section">
                <h4 className="famousfood-sidebar-title">
                  {t("TopRatedSpots")}
                </h4>
                <div className="famousfood-spots-list">
                  {topRatedSpots.map((spot) => (
                    <div
                      key={spot.id}
                      className="famousfood-spot-item"
                      onClick={() => handleSpotClick(spot)}
                    >
                      <i className={`bi ${spot.icon}`}></i>
                      <div className="famousfood-spot-content">
                        <h5 className="famousfood-spot-name">{spot.name}</h5>
                        <p className="famousfood-spot-description">
                          {spot.description}
                        </p>
                        <div className="famousfood-spot-rating">
                          <i className="bi bi-star-fill"></i>
                          <span>{spot.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Ads */}
              <CommonAds />
            </aside>
          </div>
        </div>
      </main>

      <Footer siteName={t("siteName") + ".IN"} tagline={t("FooterTagline")} />

      {/* Preview Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedDish && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedDish.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4 text-center">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span
                  className={`badge ${selectedDish.tag === "Veg" ? "bg-success" : selectedDish.tag === "Non-Veg" ? "bg-danger" : "bg-warning text-dark"} fs-6`}
                >
                  {selectedDish.tag}
                </span>
                <span className="text-secondary fw-bold fs-5">
                  <i className="bi bi-geo-alt-fill me-1"></i>
                  {selectedDish.location || "Nellore"}
                </span>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold text-secondary">Description</h5>
                <p
                  className="text-muted"
                  style={{ fontSize: "1.1rem", lineHeight: "1.6" }}
                >
                  {selectedDish.description}
                </p>
                <p className="text-muted">
                  This is a famous dish widely loved by the locals and visitors
                  alike. Made with traditional spices and authentic preparation
                  methods, it represents the culinary heritage of the region.
                </p>
              </div>

              <div className="alert alert-light border">
                <strong>
                  <i className="bi bi-info-circle me-2"></i>Taste Note:
                </strong>
                <span className="text-muted ms-1">
                  Authentic, Spacious, and typically spicy. Best served hot.
                </span>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleCloseModal}>
                {t("Close")}
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleCloseModal();
                  handleDishAction(selectedDish, selectedDish.actionLabel);
                }}
              >
                {selectedDish.actionLabel || t("Explore")}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Famousfood;
