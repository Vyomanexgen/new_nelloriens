import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainContentArea } from "./components/ContentSections";
import Footer from "./components/Footer";
// import { HeroSection, SidebarNavigation } from "./components/HomePage";
import MainHeader from "./components/MainHeader";
import Navbar from "./components/Navbar";
import TopHeader from "./components/TopHeader";
import Carousel from "./Layout/CustomHeader/Carousel";
import "./styles/App.css";

const ArticlesPage = lazy(() =>
  import("./Pages/ArticlesPage/ArticlesPage.jsx")
);
const EventsPage = lazy(() => import("./Pages/EventsPage/EventsPage.jsx"));
const Famousfood = lazy(() => import("./Pages/Famousfood/Famousfood.jsx"));
const FamousstayPage = lazy(() =>
  import("./Pages/FamousstayPage/FamousstayPage.jsx")
);
const HistoryPage = lazy(() => import("./Pages/HistoryPage/HistoryPage.jsx"));
const HubHomePage = lazy(() => import("./Pages/HomePage/HubHomePage"));
const JobsPage = lazy(() => import("./Pages/JobsPage"));
const MoviesPage = lazy(() => import("./Pages/MoviesPage/MoviesPage.jsx")); // Added
const NewsPage = lazy(() => import("./Pages/NewsPage"));
const NotificationPage = lazy(() =>
  import("./Pages/NotificationPage/NotificationPage.jsx")
);
const ResultsPage = lazy(() => import("./Pages/ResultsPage/ResultsPage.jsx"));
const SportsPage = lazy(() => import("./Pages/SportsPage/SportsPage.jsx"));
const TransportPage = lazy(() =>
  import("./Pages/TransportPage/TransportPage.jsx")
); // Added
const ContactUs = lazy(() => import("./Pages/ContactUs/ContactUs.jsx"));

function HomePage() {
  return (
    <div>
      <TopHeader />
      <MainHeader siteName="NELLORIENS" />

      <Navbar />
      <Carousel />
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome To Nellorien</h1>
        <p className="welcome-subtitle">
          Discover the rich heritage, vibrant culture, and endless opportunities
          of our beautiful city.
        </p>
      </div>
      {/* <main className="main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <HeroSection />
            </div>
            <div className="col-lg-4">
              <SidebarNavigation />
            </div>
          </div>
        </div>
      </main> */}
      <MainContentArea />

      <Footer
        siteName="NELLORIENS"
        tagline="Your trusted gateway to explore Nellore - connecting you with opportunities, news, and destinations."
      />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hub" element={<HubHomePage />} />
      <Route path="/hub/jobs" element={<JobsPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/hub/news" element={<NewsPage />} />
      <Route path="/hub/news/:id" element={<NewsPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:id" element={<NewsPage />} />
      <Route path="/hub/results" element={<ResultsPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/hub/history" element={<HistoryPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/hub/notifications" element={<NotificationPage />} />
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/hub/famousstay" element={<FamousstayPage />} />
      <Route path="/famousstay" element={<FamousstayPage />} />
      <Route path="/hub/famousFood" element={<Famousfood />} />
      <Route path="/famousFood" element={<Famousfood />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/hub/Events" element={<EventsPage />} />
      <Route path="/sports" element={<SportsPage />} />
      <Route path="/hub/Sports" element={<SportsPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/hub/Articles" element={<ArticlesPage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/transport" element={<TransportPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/hub/contact" element={<ContactUs />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;