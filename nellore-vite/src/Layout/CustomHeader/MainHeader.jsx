import { FaGlobe } from "react-icons/fa";
import BreakingNews from "./BreakingNews";
import "./MainHeader.css";

const MainHeader = ({
  siteName = "NELLORIENS",
}) => {
  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center py-3 main-header-content">
          <div className="d-flex align-items-center logo-site-container">
            <div className="logo-circle">
              <FaGlobe className="logo-icon" />
            </div>
            <div>
              <h1 className="site-title">{siteName}</h1>
            </div>
          </div>
          <div className="ms-auto" style={{ maxWidth: '900px', width: '100%' }}>
            <BreakingNews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
