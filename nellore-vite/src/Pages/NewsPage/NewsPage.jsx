import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SidebarContent from "../../components/ContentSections/SidebarContent";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import TopHeader from "../../components/TopHeader";
import useTranslation from "../../hooks/useTranslation";
import { fetchNews, fetchNewsDetail } from "../../state/slices/newsSlice";
import "./NewsPage.css";

const NewsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams(); // Get ID from URL
  const {
    newsFeedArticles,
    newsFeedFilters,
    newsPage,
    currNewsDetail,
    status, // Get status from state
    error, // Get error from state
  } = useSelector((state) => state.news);

  // Fetch news on mount
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);
  const defaultFilter = newsFeedFilters?.[0]?.id ?? "local";
  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const filteredArticles = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return newsFeedArticles.filter((article) => {
      const matchesFilter =
        activeFilter === "All" ? true : article.filterCategory === activeFilter;

      if (!term) return matchesFilter;

      const text = `${article.title} ${article.categoryLabel}`.toLowerCase();
      return matchesFilter && text.includes(term);
    });
  }, [newsFeedArticles, activeFilter, searchTerm]);

  const handleFilterChange = (filterId) => {
    if (activeFilter === filterId) return;
    setActiveFilter(filterId);
    setSearchTerm("");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const isLoading = isLocalLoading || newsPage.isLoading;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm]);

  // Handle URL ID parameter
  useEffect(() => {
    if (id) {
      dispatch(fetchNewsDetail(id))
        .unwrap()
        .then((data) => {
          setSelectedArticle(data);
          setShowFullContent(true);
          setShowModal(true);
        })
        .catch((error) => console.error("Failed to fetch news detail:", error));
    }
  }, [id, dispatch]);

  const displayedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredArticles, currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCardClick = (article) => {
    setSelectedArticle(article);
    setShowFullContent(false);
    setShowModal(true);
  };

  const handleOpenFullArticle = (article) => {
    setSelectedArticle(article);
    setShowFullContent(true);
    setShowModal(true);
    dispatch(fetchNewsDetail(article.id));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setSelectedArticle(null);
      setShowFullContent(false);
      // If we are on a specific news route, go back to main news page
      if (id) {
        navigate("/hub/news"); // Defaulting to hub path
      }
    }, 300);
  };

  return (
    <div className="news-page">
      <TopHeader />
      <MainHeader siteName={t("siteName") + ".IN"} tagline={t("tagline")} />
      <Navbar includeSearch={false} />

      <main className="news-page-main">
        <div className="container-fluid">
          <section className="news-page-panel">
            <div className="news-page-header">
              <div className="news-page-title">
                <span className="news-page-title-icon">
                  <i className="bi bi-newspaper"></i>
                </span>
                <div>
                  <h2 className="news-page-heading">{t("News")}</h2>
                </div>
              </div>
              {status === "failed" && (
                <div
                  className="alert alert-danger ms-auto mb-0 py-2 px-3"
                  role="alert"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  API Error: {error || "Connection Failed"}
                </div>
              )}
              {status === "succeeded" && (
                <div
                  className="text-success ms-auto fw-bold"
                  style={{ fontSize: "0.9rem" }}
                >
                  <i className="bi bi-check-circle-fill me-1"></i> Live
                </div>
              )}
            </div>

            <div className="news-page-tabs-row d-flex flex-wrap align-items-center gap-3 mb-4">
              <div className="news-page-tabs d-flex flex-wrap gap-2">
                {newsFeedFilters.map((tab) => (
                  <button
                    key={tab.id}
                    className={`news-page-tab ${
                      activeFilter === tab.id ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange(tab.id)}
                  >
                    <i className={`bi ${tab.icon} me-2`}></i>
                    {t(tab.label)}
                  </button>
                ))}
              </div>

              <div
                className="news-page-search"
                style={{ minWidth: "250px", marginTop: "1rem" }}
              >
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder={t("SearchArticles")}
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </div>

            <div className="news-content-layout">
              <div className="news-main-column">
                <div className="news-page-grid">
                  {displayedArticles.map((article) => (
                    <article
                      key={article.id}
                      className="news-page-card"
                      onClick={() => handleCardClick(article)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="news-page-card-image">
                        <img src={article.image} alt={article.title} />
                      </div>
                      <div className="news-page-card-body">
                        <h3 className="news-page-card-title">
                          {article.title}
                        </h3>
                        <p className="news-page-card-meta">
                          {t(article.categoryLabel)} · {article.time}
                        </p>
                        <button
                          className="news-page-card-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenFullArticle(article);
                          }}
                        >
                          {t("ReadFullArticle")}
                        </button>
                      </div>
                    </article>
                  ))}
                  {!displayedArticles.length && (
                    <div className="news-page-empty-state">
                      <i className="bi bi-emoji-neutral"></i>
                      <p>{t("NoNewsMatches")}</p>
                    </div>
                  )}
                </div>

                {/* Load More Section */}
                {/* Pagination Section */}
                <Pagination
                  currentPage={currentPage}
                  totalItems={filteredArticles.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={onPageChange}
                />
              </div>

              <div className="news-sidebar">
                <SidebarContent includeAds={true} />
              </div>
            </div>
          </section>

          {/* Article Details, Live News Feed, and Headlines Section */}
          {/* <section className="news-featured-section"> */}
          {/* Article Details */}
          {/* <div className="article-details-container">
              <div className="article-details-label">{t('ArticleDetails')}</div>
              <div className="article-details-content">
                <h2 className="article-details-title">
                  {featuredArticle.title}
                </h2>
                <p className="article-details-date">
                  {t('Published')}: {featuredArticle.publishedDate}
                </p>
                <div
                  className="article-details-image-wrapper"
                  onClick={handleArticleImageClick}
                >
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="article-details-image"
                  />
                  <span className="article-details-hint">{t('OpensOnClick')}</span>
                </div>
                <p className="article-details-summary">
                  {featuredArticle.summary}
                </p>
              </div>
            </div>

            <div className="news-feed-headlines-layout">
              <div className="live-news-feed-container">
                <h3 className="live-news-feed-title">{t('LiveNewsFeed')}</h3>
                <div className="live-news-feed-list">
                  {liveNewsFeed.map((item) => (
                    <div key={item.id} className="live-news-item">
                      <div className="live-news-item-image">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="live-news-item-content">
                        <h4 className="live-news-item-title">{item.title}</h4>
                        <p className="live-news-item-meta">
                          {t(item.category)} • {item.time}
                        </p>
                        <div className="live-news-item-actions">
                          {item.actions.map((action, idx) => (
                            <button
                              key={idx}
                              className="live-news-action-btn"
                              onClick={() =>
                                handleLiveNewsAction(action, item.id)
                              }
                            >
                              {t(action)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="live-news-indicator">
                  {t('Live')}: {liveNewsCount} {t('NewPosts')}
                </div>
              </div> */}

          {/* headlines section */}
          {/* <div className="headlines-container">
                <h3 className="headlines-title">{t('Headlines')}</h3>
                <ul className="headlines-list">
                  {headlines.list.map((headline, idx) => (
                    <li key={idx} className="headlines-list-item">
                      {headline}
                    </li>
                  ))}
                </ul>
                <div className="headlines-items">
                  {headlines.items.map((item) => (
                    <div key={item.id} className="headlines-item">
                      <div className="headlines-item-image">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="headlines-item-content">
                        <h4 className="headlines-item-title">{item.title}</h4>
                        <p className="headlines-item-meta">
                          {t(item.category)} • {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
          {/* </div> */}

          {/* <button className="load-new-btn" onClick={handleLoadNew}>
              <i className="bi bi-arrow-clockwise me-2"></i>
              Load New
            </button> */}
          {/* </section> */}
        </div>
      </main>

      <Footer siteName={t("siteName") + ".IN"} tagline={t("FooterTagline")} />

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedArticle && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedArticle.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="img-fluid rounded mb-3 w-100"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
              <div className="d-flex align-items-center mb-3 text-muted">
                <small>{t(selectedArticle.categoryLabel)}</small>
                <span className="mx-2">•</span>
                <small>{selectedArticle.time}</small>
              </div>
              <p className="lead" style={{ fontSize: "1.1rem" }}>
                {showFullContent &&
                (currNewsDetail?.id === selectedArticle?.id
                  ? currNewsDetail.fullContent
                  : selectedArticle.fullContent)
                  ? (currNewsDetail?.id === selectedArticle?.id
                      ? currNewsDetail.fullContent
                      : selectedArticle.fullContent
                    )
                      .split("\n\n")
                      .map((paragraph, idx) => (
                        <span
                          key={idx}
                          style={{ display: "block", marginBottom: "1rem" }}
                        >
                          {paragraph}
                        </span>
                      ))
                  : selectedArticle.summary}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                {t("Close")}
              </Button>
              {!showFullContent && (
                <Button
                  variant="primary"
                  onClick={() => setShowFullContent(true)}
                  style={{
                    backgroundColor: "var(--accent-color, #0d6efd)",
                    borderColor: "var(--accent-color, #0d6efd)",
                  }}
                >
                  {t("ReadFullArticle")}
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default NewsPage;
