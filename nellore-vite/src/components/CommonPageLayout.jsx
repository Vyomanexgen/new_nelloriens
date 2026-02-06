import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Footer from "./Footer";
import MainHeader from "./MainHeader";
import Navbar from "./Navbar";
import TopHeader from "./TopHeader";
import "./CommonPageLayout.css";

const CommonPageLayout = ({
  pageTitle,
  pageSubtitle,
  pageIcon,
  filterTabs,
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  includeSearch = false,
  findSectionLeft,
  findSectionRight,
  filtersRow,
  mainContent,
  sidebarContent,
  pagination,
  footerTagline = "Your trusted gateway to explore Nellore - connecting you with opportunities, news, and destinations.",
  siteName = "NELLORIENS.IN",
  includeNavbarSearch = false,
  className = "",
  mainClassName = "",
}) => {
  // Determine class prefix based on className prop for backward compatibility
  const isResultsPage = className.includes("results-page");

  return (
    <div className={`common-page-layout ${className}`}>
      <TopHeader />
      <MainHeader siteName={siteName} tagline="Explore, Discover, Connect" />
      <Navbar includeSearch={includeNavbarSearch} />

      <main className={`${isResultsPage ? "results-page-main" : "common-page-main"} ${mainClassName}`}>
        <div className="container-fluid">
          {/* Header Section */}
          {(pageTitle || pageSubtitle) && (
            <section className={isResultsPage ? "results-header" : "common-page-header"}>
              <div className={isResultsPage ? "results-header-content" : "common-page-header-content"}>
                {pageTitle && (
                  <h1 className={`${isResultsPage ? "results-title" : "common-page-title"} ${pageIcon ? pageIcon : ""}`}>
                    {pageTitle}
                  </h1>
                )}
                {pageSubtitle && (
                  <p className={isResultsPage ? "results-subtitle" : "common-page-subtitle"}>{pageSubtitle}</p>
                )}
              </div>
            </section>
          )}

          {/* Navigation Filters */}
          {(filterTabs || includeSearch) && (
            <section className={isResultsPage ? "results-nav-filters" : "common-nav-filters"}>
              {filterTabs && (
                <div className={isResultsPage ? "results-filter-tabs" : "common-filter-tabs"}>
                  {filterTabs.map((filter) => (
                    <button
                      key={filter.id || filter.label}
                      className={`${isResultsPage ? "results-filter-tab" : "common-filter-tab"} ${
                        activeFilter === filter.label || activeFilter === filter.id ? "active" : ""
                      }`}
                      onClick={() => onFilterChange && onFilterChange(filter.label || filter.id)}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              )}
              {includeSearch && (
                <div className={isResultsPage ? "results-search-bar" : "common-search-bar"}>
                  <i className="bi bi-search"></i>
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchTerm || ""}
                    onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  />
                </div>
              )}
            </section>
          )}

          {/* Find Section */}
          {(findSectionLeft || findSectionRight) && (
            <section className={isResultsPage ? "results-find-section" : "common-find-section"}>
              {findSectionLeft && (
                <div className={isResultsPage ? "results-find-left" : "common-find-left"}>{findSectionLeft}</div>
              )}
              {findSectionRight && (
                <div className={isResultsPage ? "results-find-right" : "common-find-right"}>{findSectionRight}</div>
              )}
            </section>
          )}

          {/* Content Wrapper */}
          <div className={isResultsPage ? "results-content-wrapper" : "common-content-wrapper"}>
            {/* Main Content */}
            <div className={isResultsPage ? "results-main-content" : "common-main-content"}>
              {filtersRow && (
                <div className={isResultsPage ? "results-filters-row" : "common-filters-row"}>{filtersRow}</div>
              )}
              {mainContent}
              {pagination && (
                <div className={isResultsPage ? "results-pagination" : "common-pagination"}>{pagination}</div>
              )}
            </div>

            {/* Sidebar */}
            {sidebarContent && (
              <div className={isResultsPage ? "results-sidebar" : "common-sidebar"}>{sidebarContent}</div>
            )}
          </div>
        </div>
      </main>

      <Footer siteName={siteName} tagline={footerTagline} />
    </div>
  );
};

export default CommonPageLayout;

