import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import MainHeader from '../../components/MainHeader';
import Navbar from '../../components/Navbar';
import TopHeader from '../../components/TopHeader';
import useTranslation from '../../hooks/useTranslation';
import { fetchNews } from '../../state/slices/newsSlice';
import './NewsFeed.css';

const NewsFeed = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { newsFeedArticles, newsFeedFilters } = useSelector((state) => ({
    newsFeedArticles: state.news.newsFeedArticles,
    newsFeedFilters: state.news.newsFeedFilters,
  }));
  const initialFilter = newsFeedFilters?.[0]?.id ?? 'local';
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(2);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const totalPages = 32;

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const filteredArticles = useMemo(() => {
    return newsFeedArticles.filter((article) => {
      const matchesFilter = article.filterCategory === activeFilter;
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        !term ||
        article.title.toLowerCase().includes(term) ||
        article.categoryLabel.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, newsFeedArticles, searchTerm]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setSearchTerm('');
  };

  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoadingMore(false);
    }, 400);
  };

  const handleNextPage = () => {
    if (currentPage >= totalPages) return;
    handlePageChange(currentPage + 1);
  };

  const handleReadFullArticle = (article) => {
    navigate(`/hub/news/${article.id}`);
  };

  return (
    <div className="news-feed-page">
      <TopHeader />
      <MainHeader
        siteName={t('siteName') + ".IN"}
        tagline={t('tagline')}
      />
      <Navbar includeSearch={false} />

      <main className="news-feed-main">
        <div className="container-fluid">
          <section className="news-feed-section">
            <div className="news-feed-heading">
              <div className="news-feed-title">
                <span className="news-feed-title-icon">
                  <i className="bi bi-newspaper"></i>
                </span>
                <div>
                  <p className="news-feed-title-label">{t('News')}</p>
                  <h2 className="news-feed-title-heading">{t('LatestUpdatesToday')}</h2>
                </div>
              </div>
              <div className="news-feed-controls">
                <div className="news-feed-tabs">
                  {newsFeedFilters.map((tab) => (
                    <button
                      key={tab.id}
                      className={`news-feed-tab ${
                        activeFilter === tab.id ? 'active' : ''
                      }`}
                      onClick={() => handleFilterChange(tab.id)}
                    >
                      <i className={`bi ${tab.icon} me-2`}></i>
                      {t(tab.label)}
                    </button>
                  ))}
                </div>
                <div className="news-feed-search">
                  <i className="bi bi-search"></i>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('SearchArticles')}
                  />
                </div>
              </div>
            </div>

            <div className="news-feed-cards-grid">
              {filteredArticles.map((article) => (
                <div key={article.id} className="news-feed-card">
                  <div className="news-feed-card-image">
                    <img src={article.image} alt={article.title} />
                  </div>
                  <div className="news-feed-card-body">
                    <h5>{article.title}</h5>
                    <p className="news-feed-card-meta">
                      {t(article.categoryLabel)} - {article.time}
                    </p>
                    <button
                      className="news-feed-card-btn"
                      onClick={() => handleReadFullArticle(article)}
                    >
                      {t('ReadFullArticle')}
                    </button>
                  </div>
                </div>
              ))}
              {!filteredArticles.length && (
                <div className="news-feed-empty-state">
                  <i className="bi bi-emoji-neutral"></i>
                  <p>{t('NoNewsMatches')}</p>
                </div>
              )}
            </div>
          </section>

          <section className="news-feed-pagination">
            <div className="news-feed-pagination-panel">
              <div className="news-pagination-controls-group">
                <span className="news-pagination-status-chip">
                  {t('Page')} {currentPage} {t('Of')} {totalPages}
                </span>
                <div className="news-pagination-controls">
                  <button
                    className="btn news-pagination-chip-btn"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >
                    1
                  </button>
                  <button
                    className="btn news-pagination-chip-btn"
                    onClick={() => handlePageChange(2)}
                    disabled={currentPage === 2}
                  >
                    2
                  </button>
                  <button
                    className="btn news-pagination-chip-btn"
                    onClick={() => handlePageChange(3)}
                    disabled={currentPage === 3}
                  >
                    3
                  </button>
                  <button
                    className="btn news-pagination-chip-btn news-pagination-chip-btn-primary"
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages || isLoadingMore}
                  >
                    {t('Next')}
                  </button>
                </div>
              </div>
              <div className="news-pagination-loading-chip">
                {isLoadingMore ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {t('LoadingMore')}
                  </>
                ) : (
                  <>
                    <i className="bi bi-arrow-repeat me-2"></i>
                    {t('Ready')}
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer
        siteName={t('siteName') + ".IN"}
        tagline={t('FooterTagline')}
      />
    </div>
  );
};

export default NewsFeed;
