import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CommonAds from "../../components/CommonAds/CommonAds";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import TopHeader from "../../components/TopHeader";
import useTranslation from "../../hooks/useTranslation";
import {
  getFixtures,
  getMatchResult,
  getMatchResults,
  setSportsCategory,
  setSportsNewsPage,
  setSportsRegion,
} from "../../state/slices/sportsSlice";
import "./SportsPage.css";

const SportsPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    heroImage,
    categories,
    regions,
    liveScores,
    upcomingFixtures,
    sportsNews,
    newsLines,
    standings,
    sportsNewsPage,
    status,
    error,
  } = useSelector((state) => state.sports);

  useEffect(() => {
    // Determine if we need to fetch. Only fetch if idle
    if (status === "idle") {
      dispatch(getFixtures());
      dispatch(getMatchResults());
    }
  }, [dispatch, status]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeRegion, setActiveRegion] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    dispatch(setSportsCategory(category));
  };

  const handleRegionChange = (region) => {
    setActiveRegion(region);
    dispatch(setSportsRegion(region));
  };

  const filteredFixtures = useMemo(() => {
    let filtered = [...upcomingFixtures];

    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (fixture) => fixture.category === activeCategory,
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (fixture) =>
          fixture.title?.toLowerCase().includes(term) ||
          fixture.location?.toLowerCase().includes(term) ||
          fixture.category?.toLowerCase().includes(term),
      );
    }

    return filtered;
  }, [upcomingFixtures, activeCategory, searchTerm]);

  const filteredNews = useMemo(() => {
    let filtered = [...sportsNews];

    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (news) => news.tag?.toLowerCase() === activeCategory.toLowerCase(),
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((news) =>
        news.title?.toLowerCase().includes(term),
      );
    }

    return filtered;
  }, [sportsNews, activeCategory, searchTerm]);

  const displayedNews = useMemo(() => {
    const startIndex =
      (sportsNewsPage.currentPage - 1) * sportsNewsPage.itemsPerPage;
    return filteredNews.slice(
      startIndex,
      startIndex + sportsNewsPage.itemsPerPage,
    );
  }, [filteredNews, sportsNewsPage]);

  const handlePageChange = (page) => {
    dispatch(setSportsNewsPage(page));
  };

  const handleCardClick = async (item) => {
    // If it's a match/score item (has match property or is from liveScores), fetch details
    if (
      !item.date &&
      (item.match || item.type === "Live" || item.type === "Recent")
    ) {
      setSelectedItem(item);
      setShowModal(true);
      if (item.id) {
        try {
          const resultAction = await dispatch(getMatchResult(item.id));
          if (getMatchResult.fulfilled.match(resultAction)) {
            setSelectedItem(() => ({ ...item, ...resultAction.payload }));
          }
        } catch (e) {
          console.error("Failed to fetch match details", e);
        }
      }
    } else {
      // Standard item (news, fixture)
      setSelectedItem(item);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <div className="sports-page">
      <TopHeader />
      <MainHeader siteName={t("siteName")} tagline={t("tagline")} />
      <Navbar includeSearch={false} />

      <main className="sports-main">
        <div className="container-fluid">
          {/* Top Section: Hero, Filters, and Sidebar */}
          <div className="sports-top-section">
            {/* Filters Section and Hero - placed side-by-side on wide screens */}
            <div className="sports-hero-and-filters">
              <section className="sports-filters-section">
                <div className="sports-filters-row">
                  <div className="sports-search-bar">
                    <i className="bi bi-search"></i>
                    <input
                      type="text"
                      placeholder={t("SearchTeams")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="sports-filter-dropdown">
                    <i className="bi bi-funnel"></i>
                    <select
                      value={activeCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.label}>
                          {t("Categories")}: {t(cat.label)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sports-filter-dropdown">
                    <i className="bi bi-geo-alt"></i>
                    <select
                      value={activeRegion}
                      onChange={(e) => handleRegionChange(e.target.value)}
                    >
                      {regions.map((region) => (
                        <option key={region.id} value={region.label}>
                          {t("Region")}: {t(region.label)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="sports-time-indicator">
                  <i className="bi bi-calendar3"></i>
                  <span>{t("ThisWeek")}</span>
                </div>
                {status === "loading" && (
                  <div
                    className="ms-3 spinner-border text-primary spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </section>

              {status === "failed" && (
                <div
                  className="alert alert-warning mb-2"
                  style={{ maxWidth: "400px" }}
                >
                  Note: Showing cached/mock data due to connection error. (
                  {error})
                </div>
              )}

              {/* Hero Section */}
              <section className="sports-hero">
                <div
                  className="sports-hero-image"
                  style={{ backgroundImage: `url(${heroImage})` }}
                >
                  <div className="sports-hero-overlay">
                    <button className="sports-hub-btn">
                      <i className="bi bi-trophy"></i>
                      {t("SportsHub")}
                    </button>
                    <h1 className="sports-hero-title">{t("SportsTagline")}</h1>
                    <p className="sports-hero-subtitle">
                      {t("SportsSubtitle")}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Sidebar - News Lines and Standings (beside hero/filters) */}
            <div className="sports-top-sidebar">
              {/* News Lines Section */}
              {/* <section className="sports-sidebar-section">
                <h3 className="sports-sidebar-title">News Lines</h3>
                <div className="sports-news-lines-list">
                  {newsLines.map((line) => (
                    <div key={line.id} className="sports-news-line-item">
                      <i className="bi bi-lightning-charge"></i>
                      <span>{line.text}</span>
                    </div>
                  ))}
                </div>
              </section> */}

              {/* Standings Section */}
              {/* <section className="sports-sidebar-section">
                <h3 className="sports-sidebar-title">
                  Standings - {standings.league}
                </h3>
                <div className="sports-standings-list">
                  {standings.teams.map((team, index) => (
                    <div key={team.id} className="sports-standing-item">
                      <div className="sports-standing-rank">{index + 1}</div>
                      <div className="sports-standing-team">
                        <span className="sports-standing-name">
                          {team.name}
                        </span>
                        <span className="sports-standing-stats">
                          P{team.played}, Pts {team.points}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section> */}
            </div>
          </div>

          {/* Content Wrapper */}
          <div className="sports-content-wrapper">
            {/* Main Content - Left Column */}
            <div className="sports-main-content">
              {/* Live Scores Section */}
              <section className="sports-section">
                <div className="sports-section-header">
                  <h2 className="sports-section-title">{t("LiveScores")}</h2>
                  <button className="sports-section-action-btn">
                    {t("Updating")}
                  </button>
                </div>
                <div className="sports-live-scores-list">
                  {liveScores.map((score) => (
                    <div
                      key={score.id}
                      className="sports-score-card"
                      onClick={() => handleCardClick(score)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="sports-score-content">
                        <h3 className="sports-score-match">{score.match}</h3>
                        <div className="sports-score-details">
                          <span className="sports-score-sport">
                            {t(score.sport) || score.sport}
                          </span>
                          <span className="sports-score-score">
                            {score.score}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`sports-score-badge ${score.type.toLowerCase()}`}
                      >
                        {t(score.type) || score.type}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Upcoming Fixtures Section */}
              <section className="sports-section">
                <div className="sports-section-header">
                  <h2 className="sports-section-title">
                    {t("UpcomingFixtures")}
                  </h2>
                  <button className="sports-section-action-btn">
                    {t("ThisWeek")}
                  </button>
                </div>
                <div className="sports-fixtures-grid">
                  {filteredFixtures.map((fixture) => (
                    <div
                      key={fixture.id}
                      className="sports-fixture-card"
                      onClick={() => handleCardClick(fixture)}
                      style={{ cursor: "pointer" }}
                    >
                      <h4 className="sports-fixture-title">{fixture.title}</h4>
                      <div className="sports-fixture-details">
                        <span className="sports-fixture-date">
                          {fixture.date} -{" "}
                          {t(fixture.location) || fixture.location} -{" "}
                          {fixture.time}
                        </span>
                      </div>
                      <span className="sports-fixture-category">
                        {t(fixture.category) || fixture.category}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sports News Section */}
              <section className="sports-section">
                <div className="sports-section-header">
                  <h2 className="sports-section-title">{t("SportsNews")}</h2>
                  <button className="sports-section-action-btn">
                    {t("LocalNational")}
                  </button>
                </div>
                <div className="sports-news-grid">
                  {displayedNews.map((news) => (
                    <div
                      key={news.id}
                      className="sports-news-card"
                      onClick={() => handleCardClick(news)}
                      style={{ cursor: "pointer" }}
                    >
                      <h4 className="sports-news-title">{news.title}</h4>
                      <div className="sports-news-footer">
                        <span className="sports-news-posted">
                          {news.posted}
                        </span>
                        <span className="sports-news-tag">
                          {t(news.tag) || news.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Pagination
                  currentPage={sportsNewsPage.currentPage}
                  totalItems={filteredNews.length}
                  itemsPerPage={sportsNewsPage.itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </section>

              <section className="sports-sidebar-section">
                <h3 className="sports-sidebar-title">
                  {t("Standings")} - {standings.league}
                </h3>
                <div className="sports-standings-list">
                  {standings.teams.map((team, index) => (
                    <div key={team.id} className="sports-standing-item">
                      <div className="sports-standing-rank">{index + 1}</div>
                      <div className="sports-standing-team">
                        <span className="sports-standing-name">
                          {team.name}
                        </span>
                        <span className="sports-standing-stats">
                          {t("P")}
                          {team.played}, {t("Pts")} {team.points}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar - Right Column (only Sponsored now) */}
            <div className="sports-sidebar">
              <section className="sports-sidebar-section">
                <h3 className="sports-sidebar-title">{t("NewsLines")}</h3>
                <div className="sports-news-lines-list">
                  {newsLines.map((line) => (
                    <div key={line.id} className="sports-news-line-item">
                      <i className="bi bi-lightning-charge"></i>
                      <span>{line.text}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Common Ads */}
              <CommonAds />

              {/* Sponsored Section */}
              {/* <section className="sports-sidebar-section">
                <h3 className="sports-sidebar-title">Sponsored</h3>
                <div className="sports-sponsored-content">
                  <p className="sports-sponsored-text">{sponsored.title}</p>
                  <div className="sports-sponsored-tags">
                    {sponsored.tags.map((tag, idx) => (
                      <span key={idx} className="sports-sponsored-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="sports-sponsored-btn">
                    {sponsored.action}
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </section> */}
            </div>
          </div>
        </div>
      </main>

      <Footer siteName={t("siteName") + ".IN"} tagline={t("FooterTagline")} />

      {/* Full Content Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedItem && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedItem.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">
                <div className="d-flex flex-wrap gap-2 text-muted mb-3">
                  {selectedItem.date ? (
                    // Fixture Meta
                    <>
                      <span className="d-flex align-items-center">
                        <i className="bi bi-calendar me-1"></i>
                        {selectedItem.date}
                      </span>
                      <span className="d-flex align-items-center">
                        <i className="bi bi-clock me-1"></i>
                        {selectedItem.time}
                      </span>
                      <span className="d-flex align-items-center">
                        <i className="bi bi-geo-alt me-1"></i>
                        {selectedItem.location}
                      </span>
                      <span className="d-flex align-items-center">
                        <i className="bi bi-tag me-1"></i>
                        {selectedItem.category}
                      </span>
                    </>
                  ) : (
                    // News Meta
                    <>
                      <span className="d-flex align-items-center">
                        <i className="bi bi-clock-history me-1"></i>
                        {selectedItem.posted}
                      </span>
                      <span className="d-flex align-items-center">
                        <i className="bi bi-tag me-1"></i>
                        {selectedItem.tag}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="sports-full-content">
                <h6 className="mb-2 text-danger">
                  {t("FullDetails") || "Full Details"}
                </h6>
                {selectedItem.fullContent ? (
                  selectedItem.fullContent
                    .split("\n\n")
                    .map((paragraph, idx) => (
                      <p key={idx} className="text-secondary">
                        {paragraph}
                      </p>
                    ))
                ) : (
                  <p className="text-secondary">
                    No additional details available.
                  </p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                {t("Close")}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default SportsPage;
