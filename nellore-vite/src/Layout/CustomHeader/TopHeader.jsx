import { useState, useEffect } from "react";
import { FaChevronDown, FaEnvelope, FaPhone } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
import useTranslation from "../../hooks/useTranslation";
// import { setLanguage } from "../../state/slices/appSlice";
import "./TopHeader.css";

const TopHeader = () => {
  const { t } = useTranslation();
  // Local state for the dropdown to control Google Translate
  const [currentLang, setCurrentLang] = useState("English");

  useEffect(() => {
    // Check existing Google Translate cookie
    const cookies = document.cookie.split(";");
    const gtCookie = cookies.find((c) => c.trim().startsWith("googtrans="));
    if (gtCookie) {
      const code = gtCookie.split("/").pop(); // Extract code e.g., 'te' from '/en/te'
      const langMap = { en: "English", te: "Telugu", hi: "Hindi", ta: "Tamil" };
      if (langMap[code]) {
        setCurrentLang(langMap[code]);
      }
    }
  }, []);

  const handleLanguageChange = (e) => {
    const selected = e.target.value;
    setCurrentLang(selected);

    const langMap = { 'English': 'en', 'Telugu': 'te', 'Hindi': 'hi', 'Tamil': 'ta' };
    const code = langMap[selected];

    // Interact directly with the hidden Google Translate dropdown for instant switching
    const googleCombo = document.querySelector('.goog-te-combo');
    if (googleCombo) {
      googleCombo.value = code;
      googleCombo.dispatchEvent(new Event('change'));
    } else {
      // Fallback: Set cookie and reload if the widget isn't ready
      document.cookie = `googtrans=/en/${code}; path=/`;
      window.location.reload();
    }
  };

  return (
    <div className="top-header">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center py-2 top-header-content">
          <div className="d-flex align-items-center gap-3">
            <FaEnvelope className="top-header-icon" />
            <span>{t("email")}</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <FaPhone className="top-header-icon" />
            <span>8341540001</span>
            <span>•</span>
            <span>8367600045</span>
            <div className="language-selector">
              <select
                value={currentLang}
                onChange={handleLanguageChange}
                className="language-dropdown"
              >
                <option value="English">English</option>
                <option value="Telugu">Telugu</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
              </select>
              <FaChevronDown className="dropdown-arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
