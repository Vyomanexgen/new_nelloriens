import { useEffect, useState } from "react";
import "./BreakingNews.css";

const BreakingNews = () => {
  const [breakingNews, setBreakingNews] = useState([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=Nellore&language=en&sortBy=publishedAt&apiKey=65332609237d43e9ac14eb5c20d87394",
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data.articles) {
          const titles = data.articles
            .map((article) => article.title)
            .slice(0, 10);
          setBreakingNews(titles);
          setError(false);
        }
      } catch (error) {
        console.error("Error fetching breaking news:", error);
        setError(true);
      }
    };

    fetchNews();
  }, []);

  const newsContent =
    breakingNews.length > 0 ? (
      breakingNews.map((news, index) => (
        <span key={index} className="news-item">
          {news}
          {index < breakingNews.length - 1 && (
            <span className="separator"> • </span>
          )}
        </span>
      ))
    ) : error ? (
      <span className="news-item">Latest updates unavailable</span>
    ) : (
      <span className="news-item">Loading live updates...</span>
    );

  return (
    <div className="breaking-news-container">
      <div className="d-flex">
        <div className="breaking-news-banner">
          <span className="pulse-icon">((o))</span>
          <span className="breaking-news-text">BREAKING NEWS</span>
        </div>
        <div className="news-ticker">
          <div className="ticker-wrapper">
            <div className="ticker-content">
              {newsContent}

              {breakingNews.length > 0 && (
                <>
                  <span className="ticker-spacer"> • </span>
                  {newsContent}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
