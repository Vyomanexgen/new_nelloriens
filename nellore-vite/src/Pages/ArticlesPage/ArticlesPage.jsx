import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import Navbar from "../../components/Navbar";
import TopHeader from "../../components/TopHeader";
import useTranslation from "../../hooks/useTranslation";
import "./ArticlesPage.css";

const ArticlesPage = () => {
  const { t } = useTranslation();
  const { currentArticle, relatedArticles } = useSelector(
    (state) => state.articles
  );

  const handleArticleAction = (action) => {
    console.log(`Action: ${action} for article: ${currentArticle.id}`);
  };

  const handleRelatedArticleClick = (article) => {
    console.log("Navigate to article:", article.id);
  };

  return (
    <div className="articles-page">
      <TopHeader />
      <MainHeader
        siteName={t('siteName') + ".IN"}
        tagline={t('tagline')}
      />
      <Navbar includeSearch={false} />

      <main className="articles-main">
        <div className="container-fluid">
          {/* Breadcrumb Navigation */}
          <nav className="articles-breadcrumb">
            {currentArticle.breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <span className="articles-breadcrumb-separator"> &gt; </span>
                )}
                <span className="articles-breadcrumb-item">{t(crumb) || crumb}</span>
              </React.Fragment>
            ))}
          </nav>

          {/* Content Wrapper */}
          <div className="articles-content-wrapper">
            {/* Main Content - Left Column */}
            <div className="articles-main-content">
              {/* Article Header */}
              <header className="articles-header">
                <h1 className="articles-title">{currentArticle.title}</h1>
                <div className="articles-meta">
                  <span className="articles-tag">{t(currentArticle.tag) || currentArticle.tag}</span>
                  <span className="articles-posted">
                    {currentArticle.posted}
                  </span>
                  <span className="articles-author">
                    {currentArticle.author}
                  </span>
                </div>
              </header>

              {/* Hero Image */}
              <div className="articles-hero-image">
                <img
                  src={currentArticle.heroImage}
                  alt={currentArticle.title}
                />
              </div>

              {/* Article Body */}
              <article className="articles-body">
                {currentArticle.paragraphs.map((paragraph, index) => (
                  <p key={index} className="articles-paragraph">
                    {paragraph}
                  </p>
                ))}

                {/* Medal Tally Section */}
                <div className="articles-medal-tally">
                  <div className="articles-medal-tally-header">
                    <i className="bi bi-award"></i>
                    <span>{t('MedalTally')} ({t('Athletics')}):</span>
                  </div>
                  <div className="articles-medal-tally-content">
                    <span className="articles-medal-gold">
                      {t('Gold')} {currentArticle.medalTally.gold}
                    </span>
                    <span className="articles-medal-separator"> · </span>
                    <span className="articles-medal-silver">
                      {t('Silver')} {currentArticle.medalTally.silver}
                    </span>
                    <span className="articles-medal-separator"> · </span>
                    <span className="articles-medal-bronze">
                      {t('Bronze')} {currentArticle.medalTally.bronze}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="articles-actions">
                  <button
                    className="articles-action-btn"
                    onClick={() => handleArticleAction("Share")}
                  >
                    <i className="bi bi-share"></i>
                    {t('Share')}
                  </button>
                  <button
                    className="articles-action-btn"
                    onClick={() => handleArticleAction("Save")}
                  >
                    <i className="bi bi-bookmark"></i>
                    {t('Save')}
                  </button>
                  <button
                    className="articles-action-btn"
                    onClick={() => handleArticleAction("Comment")}
                  >
                    <i className="bi bi-chat-left"></i>
                    {t('Comment')}
                  </button>
                </div>
              </article>
            </div>

            {/* Sidebar - Right Column */}
            <aside className="articles-sidebar">
              <section className="articles-sidebar-section">
                <h3 className="articles-sidebar-title">{t('RelatedSportsNews')}</h3>
                <div className="articles-related-list">
                  {relatedArticles.map((article) => (
                    <div
                      key={article.id}
                      className="articles-related-card"
                      onClick={() => handleRelatedArticleClick(article)}
                    >
                      <div className="articles-related-icon">
                        <i className={`bi ${article.icon}`}></i>
                      </div>
                      <div className="articles-related-content">
                        <h4 className="articles-related-title">
                          {article.title}
                        </h4>
                        <div className="articles-related-footer">
                          <span className="articles-related-posted">
                            {article.posted}
                          </span>
                          <span className="articles-related-tag">
                            {t(article.tag) || article.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>

      <Footer
        siteName={t('siteName') + ".IN"}
        tagline={t('FooterTagline')}
      />
    </div>
  );
};

export default ArticlesPage;
