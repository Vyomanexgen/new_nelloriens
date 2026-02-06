import { useState } from "react";
import { FaList } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useTranslation from "../../hooks/useTranslation";
import "./Navigation.css";

const Navigation = ({ includeSearch = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { label: t("Home"), path: "/" },
    { label: t("News"), path: "/news" },
    { label: t("Jobs"), path: "/jobs" },
    { label: t("Notifications"), path: "/notifications" },
    { label: t("Results"), path: "/results" },
    { label: t("Sports"), path: "/sports" },
    { label: t("Foods"), path: "/famousfood" },
    { label: t("NelloreHistory"), path: "/history" },
    { label: t("FamousStay"), path: "/famousstay" },
    { label: t("Events"), path: "/events" },
    { label: t("Movies"), path: "/movies" },
    { label: t("Transport"), path: "/transport" },
    { label: t("ContactUs"), path: "/contact" },
  ];

  const hubNavItems = [
    { label: t("Home"), path: "/HomePage" },
    { label: t("Jobs"), path: "/hub/jobs" },
    { label: t("News"), path: "/hub/news" },
    { label: t("Events"), path: "/hub/events" },
    { label: t("Sports"), path: "/hub/sports" },
    { label: t("ContactUs"), path: "/hub/contact" },
  ];

  const isHubPage = location.pathname.startsWith("/hub");
  let items = isHubPage ? hubNavItems : navItems;

  return (
    <nav className="main-navigation">
        <div className="d-flex justify-content-center align-items-center navigation-wrapper">
          <div className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaList />
          </div>
          <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            {items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
          {includeSearch && (
            <div className="nav-search">
              <input
                type="text"
                placeholder={t("SearchPlaceholder")}
                className="search-input"
              />
            </div>
          )}
        </div>
    </nav>
  );
};

export default Navigation;
