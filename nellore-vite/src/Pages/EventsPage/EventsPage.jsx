import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CommonAds from "../../components/CommonAds/CommonAds";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import Navbar from "../../components/Navbar";
import TopHeader from "../../components/TopHeader";
import useTranslation from "../../hooks/useTranslation";
import { resetFilters } from "../../state/slices/eventsSlice";
import "./EventsPage.css";

const EventsPage = () => {
  const dispatch = useDispatch();
  const {
    timeFilters,
    locationFilters,
    categoryFilters,
    featuredEvents,
    upcomingEvents,
    planAheadEvents,
    filterLocations,
    activeFilters,
  } = useSelector((state) => state.events);

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { t } = useTranslation();

  /* Local Filter State */
  const [activeLocalFilters, setActiveLocalFilters] = useState({
    category: 'All',
    location: 'All',
    time: 'All'
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Consolidate events for filter extraction
  const allEvents = useMemo(() => {
    return [...featuredEvents, ...upcomingEvents, ...planAheadEvents];
  }, [featuredEvents, upcomingEvents, planAheadEvents]);

  // Extract unique values
  const uniqueLocations = useMemo(() => {
    const locs = new Set(allEvents.map(e => e.location));
    return ['All', ...Array.from(locs)];
  }, [allEvents]);

  const uniqueCategories = useMemo(() => {
    const cats = new Set(allEvents.map(e => e.category));
    return ['All', ...Array.from(cats)];
  }, [allEvents]);

  const timeOptions = ['All', 'Today', 'Tomorrow', 'This Week', 'Next Month'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const handleFilterChange = (key, value) => {
    setActiveLocalFilters(prev => ({ ...prev, [key]: value }));
    setOpenDropdown(null);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setActiveLocalFilters({ category: 'All', location: 'All', time: 'All' });
  };

  const handleEventAction = (event, actionType) => {
    console.log(`Action: ${actionType} for event: ${event.title}`);
  };

  const filteredEvents = useMemo(() => {
    let filtered = [...featuredEvents, ...upcomingEvents, ...planAheadEvents];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title?.toLowerCase().includes(term) ||
          event.location?.toLowerCase().includes(term) ||
          event.category?.toLowerCase().includes(term)
      );
    }

    // Filter by Active Local Filters
    if (activeLocalFilters.category !== 'All') {
      filtered = filtered.filter(e => e.category === activeLocalFilters.category);
    }

    if (activeLocalFilters.location !== 'All') {
      filtered = filtered.filter(e => e.location === activeLocalFilters.location);
    }

    if (activeLocalFilters.time !== 'All') {
        // Mock time filtering logic - real implementation depends on date parsing
        // For now, assuming exact match or simple logic if dates were proper objects
        // filtering loosely based on string presence or logic
         if (activeLocalFilters.time === 'Today') {
             // simplified for demo
         }
    }

    return filtered;
  }, [
    featuredEvents,
    upcomingEvents,
    planAheadEvents,
    searchTerm,
    activeFilters,
    activeLocalFilters
  ]);



  return (
    <div className="events-page">
      <TopHeader />
      <MainHeader
        siteName={t('siteName') + ".IN"}
        tagline={t('tagline')}
      />
      <Navbar includeSearch={false} />

      <main className="events-main">
          {/* Header Section */}
          <section className="events-header">
            <div className="events-header-content">
              <div className="events-title-section">
                <h1 className="events-title">{t('EventsInNellore')}</h1>
              </div>
              <div className="events-header-filters">
                <div className="events-combined-search-row">
                  <div className="events-combined-bar">
                    <i className="bi bi-search search-icon"></i>
                    <input
                      type="text"
                      placeholder={t('SearchEvents')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="combined-search-input"
                    />
                    <div className="combined-divider"></div>
                    <button 
                      className="combined-filter-btn"
                      onClick={() => setShowFilterModal(true)}
                    >
                      <i className="bi bi-sliders"></i>
                      <span>{t('Filters')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>


        <div className="container-fluid">
          {/* Content Wrapper */}
          <div className="events-content-wrapper">
            {/* Main Content */}
            <div className="events-main-content">
              {/* Featured Events Section */}
              <section className="events-section">
                <div className="events-section-header">
                  <h2 className="events-section-title">{t('FeaturedEvents')}</h2>
                  <span className="events-section-label">{t('Handpicked')}</span>
                </div>
                <div className="events-featured-grid">
                  {featuredEvents.map((event) => (
                    <div key={event.id} className="events-featured-card">
                      <div className="events-card-image">
                        <img src={event.image} alt={event.title} />
                        <span className="events-card-category">
                          {event.category}
                        </span>
                      </div>
                      <div className="events-card-content">
                        <h3 className="events-card-title">{event.title}</h3>
                        <div className="events-card-details">
                          <span className="events-card-date">{event.date}</span>
                          <span className="events-card-location">
                            {event.location}
                          </span>
                        </div>
                        <div className="events-card-actions">
                          <button
                            className="events-primary-btn"
                            onClick={() =>
                              handleEventAction(event, event.primaryAction)
                            }
                          >
                            {event.primaryAction}
                          </button>
                          <button
                            className="events-secondary-btn"
                            onClick={() =>
                              handleEventAction(event, event.secondaryAction)
                            }
                          >
                            {event.secondaryAction}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Upcoming This Week Section */}
              <section className="events-section">
                <div className="events-section-header">
                  <h2 className="events-section-title">{t('UpcomingThisWeek')}</h2>
                  <span className="events-section-label">{t('NelloreNearby')}</span>
                </div>
                <div className="events-upcoming-list">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="events-upcoming-item">
                      <div className="events-upcoming-content">
                        <h4 className="events-upcoming-title">{event.title}</h4>
                        <div className="events-upcoming-details">
                          <span className="events-upcoming-date">
                            {event.date}
                          </span>
                          <span className="events-upcoming-location">
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <span className="events-upcoming-category">
                        {event.category}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Plan Ahead Section */}
              <section className="events-section">
                <div className="events-section-header">
                  <h2 className="events-section-title">{t('PlanAhead')}</h2>
                  <span className="events-section-label">{t('NextMonth')}</span>
                </div>
                <div className="events-plan-ahead-grid">
                  {planAheadEvents.map((event) => (
                    <div key={event.id} className="events-plan-card">
                      <div className="events-card-image">
                        <img src={event.image} alt={event.title} />
                        <span className="events-card-category">
                          {event.category}
                        </span>
                      </div>
                      <div className="events-card-content">
                        <h3 className="events-card-title">{event.title}</h3>
                        <div className="events-card-details">
                          <span className="events-card-date">{event.date}</span>
                          <span className="events-card-location">
                            {event.location}
                          </span>
                        </div>
                        <div className="events-card-actions">
                          <button
                            className="events-primary-btn"
                            onClick={() =>
                              handleEventAction(event, event.primaryAction)
                            }
                          >
                            {event.primaryAction}
                          </button>
                          <button
                            className="events-secondary-btn"
                            onClick={() =>
                              handleEventAction(event, event.secondaryAction)
                            }
                          >
                            {event.secondaryAction}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>


            </div>

            {/* Sidebar */}
            <div className="events-sidebar">
              {/* Common Ads */}
              <CommonAds />
            </div>
          </div>
        </div>
      </main>

      <Footer
        siteName={t('siteName') + ".IN"}
        tagline={t('FooterTagline')}
      />

      {/* Filter Modal */}
      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t('Filters')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="events-filters-content p-0">
             {/* Category Filter */}
             <div className="events-filter-group mb-4">
                  <label className="events-filter-label d-block mb-2 fw-bold">{t('SelectCategory')}:</label>
                  <div className="d-flex flex-wrap gap-2">
                    {uniqueCategories.map((cat, idx) => (
                      <button
                        key={idx}
                        className={`btn btn-sm rounded-pill ${
                          activeLocalFilters.category === cat ? "btn-primary" : "btn-outline-secondary"
                        }`}
                        onClick={() => handleFilterChange('category', cat)}
                      >
                        {cat === 'All' ? t('All') : cat}
                      </button>
                    ))}
                  </div>
              </div>

              {/* Date Filter */}
              <div className="events-filter-group mb-4">
                  <label className="events-filter-label d-block mb-2 fw-bold">{t('PickDates')}:</label>
                  <div className="d-flex flex-wrap gap-2">
                    {timeOptions.map((date, idx) => (
                      <button
                        key={idx}
                        className={`btn btn-sm rounded-pill ${
                          activeLocalFilters.time === date ? "btn-primary" : "btn-outline-secondary"
                        }`}
                        onClick={() => handleFilterChange('time', date)}
                      >
                        {date === 'All' ? t('All') : date}
                      </button>
                    ))}
                  </div>
              </div>

              {/* Location Filter */}
              <div className="events-filter-group">
                  <label className="events-filter-label d-block mb-2 fw-bold">{t('Location')}:</label>
                  <div className="d-flex flex-wrap gap-2">
                    {uniqueLocations.map((loc, idx) => (
                      <button
                        key={idx}
                        className={`btn btn-sm rounded-pill ${
                          activeLocalFilters.location === loc ? "btn-primary" : "btn-outline-secondary"
                        }`}
                        onClick={() => handleFilterChange('location', loc)}
                      >
                        {loc === 'All' ? t('All') : loc}
                      </button>
                    ))}
                  </div>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleResetFilters}>
            {t('Reset')}
          </Button>
          <Button variant="primary" onClick={() => setShowFilterModal(false)}>
            {t('ViewResults')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventsPage;
