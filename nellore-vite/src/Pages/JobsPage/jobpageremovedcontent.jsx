// after pagination
// news section
      <section className="jobs-news-section">
        <div className="container-fluid">
          <h2 className="section-heading">News</h2>
          
          {/* news tabs section */}
          <div className="news-tabs">
            <button
              className={`news-tab ${activeNewsTab === 'local' ? 'active' : ''}`}
              onClick={() => handleNewsTabChange('local')}
            >
              <i className="bi bi-house-door me-2"></i>
              Local News
            </button>
            <button
              className={`news-tab ${activeNewsTab === 'tourism' ? 'active' : ''}`}
              onClick={() => handleNewsTabChange('tourism')}
            >
              <i className="bi bi-palette me-2"></i>
              Tourism News
            </button>
            <button
              className={`news-tab ${activeNewsTab === 'international' ? 'active' : ''}`}
              onClick={() => handleNewsTabChange('international')}
            >
              <i className="bi bi-globe me-2"></i>
              International News
            </button>
          </div>

          {/* news cards section */}
          <div className="news-cards-row">
            {currentNews.map((article) => (
              <div
                key={article.id}
                className="news-card"
                onClick={() => handleArticleClick(article)}
              >
                <div className="news-card-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="news-card-content">
                  <h5 className="news-card-title">{article.title}</h5>
                  <p className="news-card-meta">
                    {article.category} - {article.time}
                  </p>
                  <button
                    className="btn btn-primary btn-sm read-article-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadFullArticle(article);
                    }}
                  >
                    Read Full Article
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* article details */}
          {selectedArticle && (
            <div className="article-details-section">
              <div className="article-details-header">
                <h6 className="article-details-title">Article Details</h6>
                <span className="article-opens-text">Opens on click</span>
              </div>
              <div className="article-details-content">
                <h4 className="article-main-title">{selectedArticle.title}</h4>
                <p className="article-published-date">
                  Published: {selectedArticle.publishedDate}
                </p>
                <div className="article-main-image">
                  <img src={selectedArticle.fullImage} alt={selectedArticle.title} />
                </div>
                <p className="article-preview-text">{selectedArticle.preview}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="jobs-featured-article">
        <div className="container-fluid">
          <div className="article-details-section featured-article-card">
            <div className="article-details-header">
              <h6 className="article-details-title">Article Details</h6>
              <span className="article-opens-text">Opens on click</span>
            </div>
            <div className="article-details-content">
              <h4 className="article-main-title">{featuredArticleHighlight.title}</h4>
              <p className="article-published-date">
                Published: {featuredArticleHighlight.publishedDate}
              </p>
              <div className="article-main-image">
                <img
                  src={featuredArticleHighlight.image}
                  alt={featuredArticleHighlight.title}
                />
              </div>
              <p className="article-preview-text">{featuredArticleHighlight.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* results and notifications section */}
      <section className="jobs-results-notifications">
        <div className="container-fluid">
          <div className="results-card jobs-info-card">
            <div className="jobs-info-header">
              <div className="jobs-info-heading">
                <i className="bi bi-card-checklist me-2"></i>
                <h2 className="section-heading">Results</h2>
              </div>
              <div className="results-search-input">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder="Search by name or ID"
                  value={resultsSearchTerm}
                  onChange={(e) => setResultsSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary">Search</button>
              </div>
            </div>
            <div className="results-list">
              {filteredResults.map((result) => (
                <div key={result.id} className="result-row">
                  <div className="result-text">
                    <h6>{result.title}</h6>
                    <p>{result.reference}</p>
                  </div>
                  <button
                    className={`result-action-btn ${
                      result.actionType === 'view'
                        ? 'result-action-btn-primary'
                        : 'result-action-btn-light'
                    }`}
                  >
                    {result.actionLabel}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="notifications-card jobs-info-card">
            <div className="jobs-info-heading">
              <i className="bi bi-megaphone me-2"></i>
              <h2 className="section-heading">Notifications</h2>
            </div>
            <div className="notifications-list">
              {notificationsData.map((notification) => (
                <div key={notification.id} className="notification-row">
                  <div className="notification-text">
                    <h6>{notification.title}</h6>
                    <p>
                      {notification.source} · {notification.status}
                    </p>
                  </div>
                  <button
                    className={`notification-toggle-btn ${
                      notification.status === 'Unread'
                        ? 'notification-toggle-btn-primary'
                        : 'notification-toggle-btn-outline'
                    }`}
                    onClick={() => handleNotificationToggle(notification.id)}
                  >
                    {notification.status === 'Unread'
                      ? 'Mark as Read'
                      : 'Mark as Unread'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="news-lines-card jobs-info-card">
            <div className="jobs-info-heading">
              <i className="bi bi-newspaper me-2"></i>
              <h2 className="section-heading">News Lines</h2>
            </div>
            <div className="news-lines-grid">
              {newsLinesData.map((item) => (
                <div key={item.id} className="news-line-item">
                  <span className="news-line-tag">{item.tag}</span>
                  <p>{item.title}</p>
                  <button className="news-line-btn">Read More</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* sponsored section */}
      <section className="jobs-sponsored-section">
        <div className="container-fluid">
          <div className="sponsored-header">
            <div className="sponsored-heading">
              <i className="bi bi-stars me-2"></i>
              <h2 className="section-heading">Sponsored</h2>
            </div>
          </div>
          <div className="sponsored-card-grid">
            {sponsoredListings.map((listing) => (
              <div key={listing.id} className="sponsored-card">
                <div className="sponsored-card-image">
                  <img src={listing.image} alt={listing.title} />
                </div>
                <div className="sponsored-card-body">
                  <div>
                    <h5>{listing.title}</h5>
                    <p>{listing.label}</p>
                  </div>
                  <button
                    className={`sponsored-card-btn ${
                      listing.ctaVariant === 'primary'
                        ? 'sponsored-card-btn-primary'
                        : 'sponsored-card-btn-secondary'
                    }`}
                  >
                    {listing.ctaLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="sponsor-form-card">
            <div className="sponsor-form-header">
              <h3>Become a Sponsor</h3>
              <span>Contact Form</span>
            </div>
            <form className="sponsor-form">
              <div className="sponsor-form-row">
                <div className="sponsor-form-field">
                  <i className="bi bi-person"></i>
                  <input type="text" placeholder="Your Name" />
                </div>
                <div className="sponsor-form-field">
                  <i className="bi bi-envelope"></i>
                  <input type="email" placeholder="Email" />
                </div>
              </div>
              <div className="sponsor-form-field">
                <i className="bi bi-building"></i>
                <input type="text" placeholder="Company / Brand" />
              </div>
              <div className="sponsor-form-field sponsor-form-textarea">
                <i className="bi bi-chat-left-text"></i>
                <textarea
                  rows="3"
                  placeholder="Message, budget, placement preference"
                ></textarea>
              </div>
              <div className="sponsor-form-actions">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button type="button" className="btn btn-outline-secondary">
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>



// line 293

  const currentNews = newsData[activeNewsTab] || [];

  const handleNewsTabChange = (tab) => {
    setActiveNewsTab(tab);
    setSelectedArticle(null);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleReadFullArticle = (article) => {
    navigate(`/hub/news/${article.id}`);
  };


//   from line 13 

const newsData = {
  local: [
    {
      id: 1,
      title: 'Coastal cleanup drive this Sunday',
      category: 'Local',
      time: '2 hrs ago',
      image: 'image yet to do',
      publishedDate: '27 Oct 2025',
      preview: 'Full article content preview. Organizers call for volunteers at 6 AM near Mypadu Beach, logistics arranged with local NGOs, and refreshments provided.',
      fullImage: 'image yet to do',
    },
    {
      id: 2,
      title: 'New flight routes to Chennai & Hyderabad',
      category: 'Travel',
      time: '4 hrs ago',
      image: 'image yet to do',
      publishedDate: '27 Oct 2025',
      preview: 'New flight routes connecting Nellore to major cities announced.',
      fullImage: 'image yet to do',
    },
    {
      id: 3,
      title: 'Markets rally after policy update',
      category: 'International',
      time: 'Today',
      image: 'image yet to do',
      publishedDate: '27 Oct 2025',
      preview: 'Global markets respond positively to new policy announcements.',
      fullImage: 'image yet to do',
    },
  ],
  tourism: [
    {
      id: 4,
      title: 'Tourism festival begins next week',
      category: 'Tourism',
      time: '1 day ago',
      image: 'image yet to do',
      publishedDate: '26 Oct 2025',
      preview: 'Annual tourism festival to showcase local culture and attractions.',
      fullImage: 'image yet to do',
    },
  ],
  international: [
    {
      id: 5,
      title: 'Global trade agreements updated',
      category: 'International',
      time: '3 hrs ago',
      image: 'image yet to do',
      publishedDate: '27 Oct 2025',
      preview: 'New trade agreements signed to boost international commerce.',
      fullImage: 'image yet to do',
    },
  ],
};


const resultsData = [
  {
    id: 1,
    title: 'APPSC Group-4 provisional list',
    reference: 'Ref: APPSC/2025/GR4',
    actionLabel: 'Download PDF',
    actionType: 'download',
  },
  {
    id: 2,
    title: 'Polytechnic semester results',
    reference: 'Check by roll number',
    actionLabel: 'View Result',
    actionType: 'view',
  },
];

const notificationsDataInitial = [
  {
    id: 1,
    title: 'Municipal recruitment notification released',
    category: 'Govt',
    status: 'Unread',
    source: 'Govt',
  },
  {
    id: 2,
    title: 'APSRTC festive special services schedule',
    category: 'Travel',
    status: 'Read',
    source: 'Travel',
  },
  {
    id: 3,
    title: 'Public holiday declared – Friday',
    category: 'Admin',
    status: 'Unread',
    source: 'Admin',
  },
];

const newsLinesData = [
  {
    id: 1,
    title: 'Traffic heavy near Magunta Layout',
    tag: 'Now',
  },
  {
    id: 2,
    title: 'Water maintenance 10 AM–2 PM',
    tag: 'Today',
  },
  {
    id: 3,
    title: 'State-level volleyball trials Sat',
    tag: 'Sports',
  },
  {
    id: 4,
    title: 'Showers expected this evening',
    tag: 'Weather',
  },
  {
    id: 5,
    title: 'Collectorate grievance day',
    tag: 'Civic',
  },
  {
    id: 6,
    title: 'Night buses extended',
    tag: 'Transit',
  },
];

const sponsoredListings = [
  {
    id: 1,
    title: 'Explore Maldives & Sri Lanka',
    label: 'Featured Package',
    ctaLabel: 'Book Now',
    ctaVariant: 'primary',
    image: 'image yet to do',
  },
  {
    id: 2,
    title: 'Nellore Meals Festival',
    label: 'Sponsored',
    ctaLabel: 'Visit',
    ctaVariant: 'secondary',
    image: 'image yet to do',
  },
];

const featuredArticleHighlight = {
  title: 'Coastal cleanup drive this Sunday',
  publishedDate: '27 Oct 2025',
  image: 'image yet to do',
  description:
    'Full article content preview. Organizers call for volunteers at 6 AM near Mypadu Beach, logistics arranged with local NGOs, and refreshments provided.',
};



// from line 30 

  const [activeNewsTab, setActiveNewsTab] = useState('local');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [resultsSearchTerm, setResultsSearchTerm] = useState('');
  const [notificationsData, setNotificationsData] = useState(notificationsDataInitial);

//   from 96th line 
  const [activeNewsTab, setActiveNewsTab] = useState('local');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [resultsSearchTerm, setResultsSearchTerm] = useState('');
  const [notificationsData, setNotificationsData] = useState(notificationsDataInitial);

//   from 86th line

const filteredResults = resultsData.filter((result) => {
    if (!resultsSearchTerm) return true;
    const term = resultsSearchTerm.toLowerCase();
    return (
      result.title.toLowerCase().includes(term) ||
      result.reference.toLowerCase().includes(term)
    );
  });