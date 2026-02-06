import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import Navbar from "../../components/Navbar";
import TopHeader from "../../components/TopHeader";
import WeatherCard from "../../components/WeatherCard";
import useTranslation from '../../hooks/useTranslation';
import { setLanguage } from "../../state/slices/appSlice";
import "../../styles/HubHomePage.css";

export function HubHomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.app);
  const { t } = useTranslation();

  const jobs = [
    {
      title: "Junior Assistant - District Court",
      location: "Nellore, Andhra Pradesh",
    },
    {
      title: "Logistics Executive - Sri Krishnapuram Port",
      location: "Nellore, Andhra Pradesh",
    },
  ];

  const newsItems = [
    { title: "City to host master marathon", location: "Nellore" },
    { title: "National Games: State to host 3 events", location: "Nellore" },
  ];

  const updates = [
    { title: "Power shutdown announced (24th-26th)", location: "Nellore" },
    { title: "Light showers across district", location: "Nellore" },
  ];

  const events = [
    { title: "Tourism Festival Starting Night", location: "Nellore" },
    { title: "Nellore Music Evening", location: "Nellore" },
  ];

  const results = [
    { title: "APPSC Group 4 provisional list", location: "Nellore" },
    { title: "Polytechnic semester results", location: "Nellore" },
  ];

  const sports = [
    { title: "State wins 2 golds in athletics", location: "Nellore" },
    { title: "Nellore to host league race format", location: "Nellore" },
  ];

  const foods = [
    { title: "Nellore Chepala Pulusu", location: "Nellore" },
    { title: "Ghee Dosa (Ghee Dosa Town)", location: "Nellore" },
  ];

  const history = [
    { title: "Origins of Nellore", location: "Nellore" },
    { title: "Udayagiri Fort (Nellore)", location: "Nellore" },
  ];

  const stays = [
    { title: "Seaside Resort - Mykonos", location: "Nellore" },
    { title: "Business Hotel - City Center", location: "Nellore" },
  ];

  const offers = [
    { title: "Restaurant Meals: Flat 20% off", location: "Nellore" },
    { title: "Bus Pass Discounts", location: "Nellore" },
  ];

  const sidebarNews = [
    "Heavy traffic near Meguma bypass causes delays.",
    "Water maintenance: Dam Zero 7 will be closed.",
    "State wins over 200 plus miles on Saturday.",
  ];

  const renderItemCard = (item, index, onView) => (
    <div key={index} className="hub-item-card">
      <div className="d-flex align-items-center">
        <div className="hub-item-icon me-3">
          <i className="bi bi-circle-fill"></i>
        </div>
        <div className="flex-grow-1">
          <h6 className="mb-1 fw-semibold">{item.title}</h6>
          {item.location && (
            <p className="text-muted small mb-0">
              <i className="bi bi-geo-alt me-1"></i>
              {item.location}
            </p>
          )}
        </div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onView && onView()}
        >
          View
        </button>
      </div>
    </div>
  );

  const renderSection = (title, viewAllLink, items, onView) => (
    <section className="hub-content-section">
      <div className="hub-section-header">
        <h5 className="mb-0">{title}</h5>
        <a href="#" className="text-primary text-decoration-none fw-semibold">
          {viewAllLink}
        </a>
      </div>
      <div className="hub-section-body">
        {items.map((item, index) =>
          renderItemCard(item, index, () => onView && onView(item, index))
        )}
      </div>
    </section>
  );

  return (
    <div className="hub-home-page">
      {/* Top nav section */}
      <div className="hub-top-bar">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-2">
            <div>
              <span>{t('MagazinesBlogsPodcasts')}</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <select
                className="form-select form-select-sm"
                style={{
                  width: "auto",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                }}
                value={language}
                onChange={(e) => dispatch(setLanguage(e.target.value))}
              >
                <option value="English" style={{ background: "#0d6efd", color: "white" }}>
                  English
                </option>
                <option value="Telugu" style={{ background: "#0d6efd", color: "white" }}>
                  Telugu
                </option>
                <option value="Hindi" style={{ background: "#0d6efd", color: "white" }}>
                  Hindi
                </option>
              </select>
              <i className="bi bi-question-circle fs-5"></i>
            </div>
          </div>
        </div>
      </div>

      <TopHeader />
      <MainHeader
        siteName="NELLOREHUB.IN"
        tagline={t('tagline')}
      />
      <Navbar includeSearch={false} />

      {/* top search bar secrion and links */}
      {/* <div className="top-search-section">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="top-search-bar">
              <input
                type="text"
                placeholder="Search jobs, news, destinations..."
                className="form-control"
              />
            </div>
            <div className="top-quick-links">
              <Link to="/hub/jobs" className="btn btn-link text-primary">
                Jobs
              </Link>
              <Link to="/hub/events" className="btn btn-link text-primary">
                Events
              </Link>
              <Link to="/history" className="btn btn-link text-primary">
                Nellore History
              </Link>
              <Link to="/hub/contact" className="btn btn-link text-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      <main className="hub-main-content">
        <div className="container-fluid">
          <div className="row">
            {/* main content column section */}
            <div className="col-lg-8">
              {/* hero section - keeping commented as it has missing images */}
              {/* <div className="hero-section mb-4">
                ... 
              </div> */}

              {/*navigation sections */}
              {renderSection("Jobs", "View All", jobs, (item, index) =>
                navigate(`/hub/jobs/${index}`)
              )}
              {renderSection("News", "View All", newsItems, (item, index) =>
                navigate(`/hub/news/${index}`)
              )}
              {renderSection("Updates", "View All", updates, (item, index) =>
                navigate(`/hub/updates/${index}`)
              )}
              {renderSection("Events", "View All", events, (item, index) =>
                navigate(`/hub/events/${index}`)
              )}
              {renderSection("Results", "View All", results, (item, index) =>
                navigate(`/hub/results/${index}`)
              )}
              {renderSection("Sports", "View All", sports, (item, index) =>
                navigate(`/hub/sports/${index}`)
              )}
              {renderSection("Famous/Foods", "View All", foods, (item, index) =>
                navigate(`/hub/foods/${index}`)
              )}
              {renderSection(
                "Nellore History",
                "View All",
                history,
                (item, index) => navigate(`/hub/history/${index}`)
              )}
              {renderSection("Famous/Stay", "View All", stays, (item, index) =>
                navigate(`/hub/famousstay/${index}`)
              )}
              {/* Offers Section Removed */}
            </div>

            {/* sidebar that column */}
            <div className="col-lg-4">
              <aside className="hub-sidebar">

              {/* Weather Card Section */}
                  <WeatherCard />
              
                {/* News Lines Section */}
                <div className="sidebar-section mb-4">
                   <h5 className="mb-3 fw-bold">News Lines</h5>
                   <ul className="list-unstyled bg-white p-3 rounded shadow-sm">
                     {sidebarNews.map((news, index) => (
                       <li key={index} className="mb-2 pb-2 border-bottom last-no-border">
                         <div className="d-flex">
                           <i className="bi bi-newspaper me-2 text-primary"></i>
                           <span className="small">{news}</span>
                         </div>
                       </li>
                     ))}
                   </ul>
                </div>


                {/* search section */}
                {/* <div className="sidebar-search mb-4">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Search jobs, news, destinations..."
                      className="form-control border-start-0"
                    />
                  </div>
                </div> */}

                {/* category buttons section */}
                <div className="category-buttons-grid">
                  <button
                    className="category-btn btn btn-outline-primary rounded-pill mb-2 me-2"
                    onClick={() => navigate("/hub/events")}
                  >
                    Events
                  </button>
                  <button
                    className="category-btn btn btn-outline-primary rounded-pill mb-2 me-2"
                    onClick={() => navigate("/hub/famousFood")}
                  >
                    Famous Foods
                  </button>
                  <button
                    className="category-btn btn btn-outline-primary rounded-pill mb-2 me-2"
                    onClick={() => navigate("/hub/history")}
                  >
                    Nellore History
                  </button>
                  <button
                    className="category-btn btn btn-outline-primary rounded-pill mb-2"
                    onClick={() => navigate("/hub/famousstay")}
                  >
                    Famous Stay
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      {/* Tourism Portal Section
      <section className="tourism-portal-section">
        <div className="container-fluid">
          <div className="tourism-portal-header">
            <h2 className="tourism-portal-title">Nellore Tourism Portal</h2>
            <p className="tourism-portal-subtitle">Discover the beauty, culture, and heritage of Nellore</p>
          </div>
          {/* Popular Destinations */}
      {/* <div className="tourism-section mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="section-title">Popular Destinations</h3>
              <a href="#" className="view-all-link">View All Destinations</a>
            </div>
            <div className="row g-4">
              <div className="col-md-4 col-lg-3">
                <div className="tourism-card">
                  <div className="tourism-card-image">
                    <img src="image yet to do" alt="Mypadu Beach" />
                    <div className="tourism-card-overlay">
                      <button className="btn btn-light btn-sm">Explore</button>
                    </div>
                  </div>
                  <div className="tourism-card-body">
                    <h5>Mypadu Beach</h5>
                    <p className="text-muted small mb-2">
                      <i className="bi bi-geo-alt me-1"></i>Mypadu, Nellore
                    </p>
                    <p className="small">Pristine beach with golden sands, perfect for a relaxing getaway.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-3">
                <div className="tourism-card">
                  <div className="tourism-card-image">
                    <img src="image yet to do" alt="Sri Ranganathaswamy Temple" />
                    <div className="tourism-card-overlay">
                      <button className="btn btn-light btn-sm">Explore</button>
                    </div>
                  </div>
                  <div className="tourism-card-body">
                    <h5>Sri Ranganathaswamy Temple</h5>
                    <p className="text-muted small mb-2">
                      <i className="bi bi-geo-alt me-1"></i>Nellore City
                    </p>
                    <p className="small">Ancient temple dedicated to Lord Vishnu with magnificent architecture.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-3">
                <div className="tourism-card">
                  <div className="tourism-card-image">
                    <img src="" alt="Udayagiri Fort" />
                    <div className="tourism-card-overlay">
                      <button className="btn btn-light btn-sm">Explore</button>
                    </div>
                  </div>
                  <div className="tourism-card-body">
                    <h5>Udayagiri Fort</h5>
                    <p className="text-muted small mb-2">
                      <i className="bi bi-geo-alt me-1"></i>Udayagiri, Nellore
                    </p>
                    <p className="small">Historic fort offering panoramic views and rich cultural heritage.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-3">
                <div className="tourism-card">
                  <div className="tourism-card-image">
                    <img src="image yet to do" alt="Penchalakona Waterfalls" />
                    <div className="tourism-card-overlay">
                      <button className="btn btn-light btn-sm">Explore</button>
                    </div>
                  </div>
                  <div className="tourism-card-body">
                    <h5>Penchalakona Waterfalls</h5>
                    <p className="text-muted small mb-2">
                      <i className="bi bi-geo-alt me-1"></i>Penchalakona, Nellore
                    </p>
                    <p className="small">Scenic waterfall surrounded by lush greenery and tranquility.</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

      {/* Travel Guides & Packages */}
      {/* <div className="row g-4 mb-5">
            <div className="col-lg-8">
              <div className="tourism-section">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="section-title">Travel Guides</h3>
                  <a href="#" className="view-all-link">View All Guides</a>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="guide-card">
                      <div className="d-flex gap-3">
                        <div className="guide-icon">
                          <i className="bi bi-map"></i>
                        </div>
                        <div>
                          <h6>Weekend Getaways</h6>
                          <p className="small text-muted mb-2">Perfect destinations for short trips from Nellore</p>
                          <a href="#" className="text-primary small">Read Guide <i className="bi bi-arrow-right"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="guide-card">
                      <div className="d-flex gap-3">
                        <div className="guide-icon">
                          <i className="bi bi-camera"></i>
                        </div>
                        <div>
                          <h6>Photography Spots</h6>
                          <p className="small text-muted mb-2">Best locations for capturing stunning memories</p>
                          <a href="#" className="text-primary small">Read Guide <i className="bi bi-arrow-right"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="guide-card">
                      <div className="d-flex gap-3">
                        <div className="guide-icon">
                          <i className="bi bi-people"></i>
                        </div>
                        <div>
                          <h6>Family Friendly</h6>
                          <p className="small text-muted mb-2">Destinations suitable for family visits</p>
                          <a href="#" className="text-primary small">Read Guide <i className="bi bi-arrow-right"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="guide-card">
                      <div className="d-flex gap-3">
                        <div className="guide-icon">
                          <i className="bi bi-calendar-event"></i>
                        </div>
                        <div>
                          <h6>Festival Calendar</h6>
                          <p className="small text-muted mb-2">Cultural festivals and events in Nellore</p>
                          <a href="#" className="text-primary small">Read Guide <i className="bi bi-arrow-right"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="tourism-section">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="section-title">Tour Packages</h3>
                  <a href="#" className="view-all-link">View All</a>
                </div>
                <div className="package-card mb-3">
                  <div className="package-badge">Popular</div>
                  <h6 className="mb-2">Nellore Heritage Tour</h6>
                  <p className="small mb-2" style={{ color: 'rgba(255,255,255,0.9)' }}>3 Days / 2 Nights</p>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold" style={{ color: 'white', fontSize: '1.25rem' }}>₹4,999</span>
                    <span className="small text-decoration-line-through" style={{ color: 'rgba(255,255,255,0.7)' }}>₹6,999</span>
                  </div>
                  <button className="btn btn-light btn-sm w-100">Book Now</button>
                </div>
                <div className="package-card">
                  <div className="package-badge">Best Value</div>
                  <h6 className="mb-2">Beach & Temple Tour</h6>
                  <p className="small mb-2" style={{ color: 'rgba(255,255,255,0.9)' }}>2 Days / 1 Night</p>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold" style={{ color: 'white', fontSize: '1.25rem' }}>₹2,499</span>
                    <span className="small text-decoration-line-through" style={{ color: 'rgba(255,255,255,0.7)' }}>₹3,499</span>
                  </div>
                  <button className="btn btn-light btn-sm w-100">Book Now</button>
                </div>
              </div>
            </div>
          </div> */}

      {/* Local Experiences */}
      {/* <div className="tourism-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="section-title">Local Experiences</h3>
              <a href="#" className="view-all-link">View All Experiences</a>
            </div>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="experience-card">
                  <i className="bi bi-cup-hot experience-icon"></i>
                  <h6>Local Cuisine Tours</h6>
                  <p className="small text-muted">Explore authentic Nellore delicacies</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="experience-card">
                  <i className="bi bi-bicycle experience-icon"></i>
                  <h6>Adventure Activities</h6>
                  <p className="small text-muted">Trekking, water sports, and more</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="experience-card">
                  <i className="bi bi-music-note-beamed experience-icon"></i>
                  <h6>Cultural Shows</h6>
                  <p className="small text-muted">Traditional dance and music performances</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Footer
        siteName="NELLOREHUB.IN"
        tagline={t('HubFooterTagline')}
      />
    </div>
  );
}

export default HubHomePage;
