import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BannerImg from "../../assets/images/Banner_img.jpg";
import HistoryImg1 from "../../assets/images/history-img1.jpg";
import NellorePic from "../../assets/images/nellore_pic.jpg";
import SportsImg from "../../assets/images/sports-hero.jpg";
import CommonAds from "../../components/CommonAds/CommonAds";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import Navbar from "../../components/Navbar";
import TopHeader from "../../components/TopHeader";
import useTranslation from "../../hooks/useTranslation";
import {
  fetchHistory,
  fetchHistorySectionDetail,
} from "../../state/slices/historySlice";
import "./HistoryPage.css";

const HistoryPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    timelineData = [],
    landmarks = [],
    status,
    error,
  } = useSelector((state) => state.history || {});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHistory());
    }
  }, [dispatch, status]);

  /* Gallery State */
  const [activeDot, setActiveDot] = useState(0);
  const galleryRef = useRef(null);

  const galleryImages = [
    { src: HistoryImg1, id: 1 },
    { src: NellorePic, id: 2 },
    { src: BannerImg, id: 3 },
    { src: SportsImg, id: 4 },
    { src: HistoryImg1, id: 5 },
  ];

  /* Gallery Logic */
  const handleScroll = () => {
    if (galleryRef.current && galleryRef.current.firstChild) {
      const scrollLeft = galleryRef.current.scrollLeft;
      const itemWidth = galleryRef.current.firstChild.offsetWidth;
      const gap = 20;
      const totalItemWidth = itemWidth + gap;

      const newIndex = Math.round(scrollLeft / totalItemWidth);
      // Ensure we don't go out of bounds
      const clampedIndex = Math.max(
        0,
        Math.min(newIndex, galleryImages.length - 1),
      );
      setActiveDot(clampedIndex);
    }
  };

  const scrollToIndex = (index) => {
    if (galleryRef.current && galleryRef.current.firstChild) {
      const itemWidth = galleryRef.current.firstChild.offsetWidth;
      const gap = 20;
      const totalItemWidth = itemWidth + gap;

      galleryRef.current.scrollTo({
        left: index * totalItemWidth,
        behavior: "smooth",
      });
      setActiveDot(index);
    }
  };

  /* Auto Scroll Effect */
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeDot + 1) % galleryImages.length;
      scrollToIndex(nextIndex);
    }, 4000); // 4 seconds for better UX

    return () => clearInterval(interval);
  }, [activeDot, galleryImages.length]);

  /* Removed local timelineData in favor of Redux state */

  /* Removed local landmarks in favor of Redux state */

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = async (item) => {
    setSelectedItem(item);
    setShowModal(true);

    if (item.id) {
      try {
        // Assuming detail endpoint gives more info or overwrites current info
        const resultAction = await dispatch(fetchHistorySectionDetail(item.id));
        if (fetchHistorySectionDetail.fulfilled.match(resultAction)) {
          const detail = resultAction.payload;
          setSelectedItem((current) => ({ ...current, ...detail }));
        }
      } catch (e) {
        console.error("Failed to fetch history details", e);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <div className="history-page">
      <TopHeader />
      <MainHeader siteName={t("siteName") + ".IN"} tagline={t("tagline")} />
      <Navbar includeSearch={false} />

      <main className="history-page-main">
        {/* hero section */}
        <div className="container-fluid">
          <section className="history-hero">
            <div className="history-hero-content mr-2">
              <div className="history-title-wrapper">
                <i className="bi bi-hourglass-split history-icon"></i>
                <h1>{t("NelloreHistory")}</h1>
              </div>
              <p className="history-subtitle">{t("HistoryTagline")}</p>
            </div>
          </section>
        </div>

        {/* Improved Image Gallery Section - Scrollable */}
        <section className="container-fluid mb-4">
          <div className="history-header-gallery">
            <div className="gallery-header text-center mb-4">
              <h2 className="gallery-title">Nellore Chronicle</h2>
            </div>

            <div
              className="gallery-scroll-container"
              ref={galleryRef}
              onScroll={handleScroll}
            >
              {galleryImages.map((img, idx) => (
                <div
                  key={img.id + "-" + idx}
                  className="gallery-card scroll-item"
                >
                  <img src={img.src} alt={`History Gallery ${idx + 1}`} />
                </div>
              ))}
            </div>

            {/* Dots Navigation */}
            <div className="gallery-dots">
              {galleryImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`gallery-dot ${activeDot === idx ? "active" : ""}`}
                  onClick={() => scrollToIndex(idx)}
                ></span>
              ))}
            </div>
          </div>
        </section>

        <div className="container-fluid">
          <div className="history-content-grid">
            {/* Left Column Wrapper */}
            <div className="history-main-column">
              {/* left side timeline section */}
              <div className="history-timeline-section">
                <div className="section-header">
                  <h3>{t("TimelineHighlights")}</h3>

                  {status === "loading" && (
                    <div
                      className="spinner-border text-primary ms-3"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}

                  <span className="badge-curated">{t("Curated")}</span>
                </div>

                {status === "failed" && (
                  <div className="alert alert-warning mb-3">
                    Note: Showing cached/mock data due to connection error. (
                    {error})
                  </div>
                )}

                <div className="timeline-list">
                  <div className="timeline-decoration text-center mb-3">
                    <i className="bi bi-three-dots-vertical text-primary fs-4"></i>
                  </div>

                  {timelineData.map((item) => (
                    <div
                      key={item.id}
                      className="timeline-card"
                      onClick={() => handleCardClick(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="timeline-img">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="timeline-info">
                        <h4>{t(item.title)}</h4>
                        <p>{t(item.description)}</p>
                        <div className="timeline-tags">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className={`tag ${
                                idx === 0 ? "tag-primary" : "tag-secondary"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Landmarks */}
              <div className="key-landmarks-section">
                <div className="landmarks-container">
                  <div className="section-header">
                    <h3>{t("KeyLandmarks")}</h3>
                    <button className="visit-btn">{t("Visit")}</button>
                  </div>
                  <div className="landmark-list">
                    {landmarks.map((landmark, idx) => (
                      <div key={idx} className="landmark-item">
                        <div className="landmark-icon">
                          <i className={`bi ${landmark.icon}`}></i>
                        </div>
                        <div className="landmark-details">
                          <h4>{t(landmark.title)}</h4>
                          <p>{t(landmark.desc)}</p>
                        </div>
                        <span className="landmark-tag">{landmark.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Latest News Section */}
              {/* <div className="history-news-section">
                <div className="section-header">
                  <h3>{t('LatestNews')}</h3>
                  <button
                    className="visit-btn"
                    onClick={() => navigate("/hub/news")}
                  >
                    {t('ViewAll')}
                  </button>
                </div>
                <div className="news-cards-container">
                  {(newsFeedArticles || []).slice(0, 2).map((article) => (
                    <article key={article.id} className="news-page-card">
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
                          onClick={() => navigate(`/hub/news/${article.id}`)}
                        >
                          {t('ReadFullArticle')}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div> */}
            </div>

            {/* right side sidebar */}
            <div className="history-sidebar">
              {/* Common Ads section */}
              <CommonAds />
            </div>
          </div>
        </div>
      </main>

      <Footer siteName={t("siteName") + ".IN"} tagline={t("FooterTagline")} />

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedItem && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{t(selectedItem.title)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">
                <div className="d-flex flex-wrap gap-2 text-muted mb-3">
                  {selectedItem.tags &&
                    selectedItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="badge bg-light text-dark border me-1"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                <div className="text-center mb-3">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>

              <div className="history-full-content">
                <h5 className="mb-3 text-brown" style={{ color: "#8B4513" }}>
                  {t("HistoricalInsight") || "Historical Insight"}
                </h5>
                {selectedItem.fullContent ? (
                  selectedItem.fullContent
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
                    {t(selectedItem.description)}
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

export default HistoryPage;
