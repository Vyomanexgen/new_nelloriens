import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Pages/NewsFeed/NewsFeed.css";

const newsFeedArticles = [
  {
    id: 1,
    title: "Coastal cleanup drive this Sunday",
    categoryLabel: "Local",
    time: "2 hrs ago",
    filterCategory: "local",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    title: "New flight routes to Chennai & Hyderabad",
    categoryLabel: "Travel",
    time: "4 hrs ago",
    filterCategory: "local",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    title: "Markets rally after policy update",
    categoryLabel: "International",
    time: "Today",
    filterCategory: "international",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    title: "Port throughput hits monthly record",
    categoryLabel: "Business",
    time: "1 hr ago",
    filterCategory: "international",
    image:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=500&fit=crop",
  },
  {
    id: 5,
    title: "Intermittent showers across district",
    categoryLabel: "Weather",
    time: "Today",
    filterCategory: "local",
    image:
      "https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=800&h=500&fit=crop",
  },
  {
    id: 6,
    title: "State volleyball qualifiers announced",
    categoryLabel: "Sports",
    time: "3 hrs ago",
    filterCategory: "international",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop",
  },
  {
    id: 7,
    title: "Polytechnic results: help desks set up",
    categoryLabel: "Education",
    time: "5 hrs ago",
    filterCategory: "tourism",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=500&fit=crop",
  },
  {
    id: 8,
    title: "Peak-hour traffic diversions tonight",
    categoryLabel: "Traffic",
    time: "Tonight",
    filterCategory: "tourism",
    image:
      "https://images.unsplash.com/photo-1503785640985-f62e9378a7b6?w=800&h=500&fit=crop",
  },
  {
    id: 9,
    title: "Cultural fest lineup released",
    categoryLabel: "Events",
    time: "This Week",
    filterCategory: "tourism",
    image:
      "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800&h=500&fit=crop",
  },
];

const filterTabs = [
  { id: "local", label: "Local", icon: "bi-house-door" },
  { id: "tourism", label: "Tourism", icon: "bi-sun" },
  { id: "international", label: "International", icon: "bi-globe2" },
];

const NewsFeedSection = ({ initialFilter = "local" }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(2);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const totalPages = 32;

  const filteredArticles = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return newsFeedArticles.filter((article) => {
      const matchesFilter = article.filterCategory === activeFilter;
      const matchesSearch =
        !term ||
        article.title.toLowerCase().includes(term) ||
        article.categoryLabel.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setSearchTerm("");
  };

  const handleReadFullArticle = (article) => {
    navigate(`/hub/news/${article.id}`);
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

  return (
    <section className="news-feed-section">
      <div className="news-feed-heading">
        <div className="news-feed-title">
          <span className="news-feed-title-icon">
            <i className="bi bi-newspaper"></i>
          </span>
          <div>
            <p className="news-feed-title-label">News</p>
            <h2 className="news-feed-title-heading">Latest updates today</h2>
          </div>
        </div>
        <div className="news-feed-controls">
          <div className="news-feed-tabs">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                className={`news-feed-tab ${
                  activeFilter === tab.id ? "active" : ""
                }`}
                onClick={() => handleFilterChange(tab.id)}
              >
                <i className={`bi ${tab.icon} me-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="news-feed-search">
            <i className="bi bi-search"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles"
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
                {article.categoryLabel} - {article.time}
              </p>
              <button
                className="news-feed-card-btn"
                onClick={() => handleReadFullArticle(article)}
              >
                Read Full Article
              </button>
            </div>
          </div>
        ))}
        {!filteredArticles.length && (
          <div className="news-feed-empty-state">
            <i className="bi bi-emoji-neutral"></i>
            <p>No news matches your search.</p>
          </div>
        )}
      </div>

      <section className="news-feed-pagination">
        <div className="news-feed-pagination-panel">
          <div className="news-pagination-controls-group">
            <span className="news-pagination-status-chip">
              Page {currentPage} of {totalPages}
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
                Next
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
                Loading more...
              </>
            ) : (
              <>
                <i className="bi bi-arrow-repeat me-2"></i>
                Ready
              </>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default NewsFeedSection;
