// import "bootstrap-icons/font/bootstrap-icons.css";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import nelloirePic from "../../assets/images/nellore_pic.jpg";
// import { setSelectedCategory } from "../../state/slices/homepageSlice";
// import "./HeroSection.css";

//   const HeroSection = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleDiscoverClick = () => {
//     dispatch(setSelectedCategory("discover"));
//     navigate("/hub");
//   };

//   const handleLatestJobsClick = () => {
//     dispatch(setSelectedCategory("jobs"));
//     navigate("/hub/jobs");
//   };

//   const handleTodaysNewsClick = () => {
//     dispatch(setSelectedCategory("news"));
//     navigate("/hub/news");
//   };

//   return (
//     <div className="hero-section-container">
//       <div className="hero-image-wrapper">
//         <img
//           src={nelloirePic}
//           alt="Nellore City Aerial View"
//           className="hero-background-image"
//         />
//         <div className="hero-overlay"></div>


//         <div className="discover-nellore-button">
//           <button
//             className="btn btn-light btn-sm rounded-pill discover-btn"
//             onClick={handleDiscoverClick}
//           >
//             <i className="bi bi-geo-alt-fill me-2"></i>
//             Discover Nellore
//           </button>
//         </div>


//         <div className="hero-content-overlay">
//           <h1 className="hero-title">
//             Explore Nellore & Beyond - Jobs, News, Travel, and More.
//           </h1>
//           <p className="hero-subtitle">
//             Your trusted portal for local opportunities and global inspiration.
//           </p>
//           <div className="hero-action-buttons">
//             <button
//               className="btn btn-primary btn-lg rounded-pill hero-action-btn me-2"
//               onClick={handleLatestJobsClick}
//             >
//               <i className="bi bi-briefcase me-2"></i>
//               Latest Jobs
//             </button>
//             <button
//               className="btn btn-light btn-lg rounded-pill hero-action-btn"
//               onClick={handleTodaysNewsClick}
//             >
//               <i className="bi bi-file-earmark-text me-2"></i>
//               Today's News
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
