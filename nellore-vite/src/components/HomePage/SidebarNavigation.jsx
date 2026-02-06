// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { setSearchQuery, setSelectedCategory, setSearchFocused } from '../../state/slices/homepageSlice';
// import './SidebarNavigation.css';

// const SidebarNavigation = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { searchQuery, isSearchFocused } = useSelector((state) => state.homepage);

//   const handleSearchChange = (e) => {
//     dispatch(setSearchQuery(e.target.value));
//   };

//   const handleSearchFocus = () => {
//     dispatch(setSearchFocused(true));
//   };

//   const handleSearchBlur = () => {
//     dispatch(setSearchFocused(false));
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/hub/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   const handleCategoryClick = (category) => {
//     dispatch(setSelectedCategory(category));
//     const routes = {
//       events: '/hub/events',
//       foods: '/hub/foods',
//       history: '/hub/history',
//       stays: '/hub/stays',
//     };
//     if (routes[category]) {
//       navigate(routes[category]);
//     }
//   };

//   const navigationButtons = [
//     { 
//       id: 'events', 
//       label: 'Events',
//       category: 'events'
//     },
//     { 
//       id: 'foods', 
//       label: 'Famous Foods',
//       category: 'foods'
//     },
//     { 
//       id: 'history', 
//       label: 'Nellore History',
//       category: 'history'
//     },
//     { 
//       id: 'stays', 
//       label: 'Famous Stay',
//       category: 'stays'
//     },
//   ];

//   return (
//     <aside className="sidebar-navigation">

//       <div className="sidebar-search-container">
//         <form onSubmit={handleSearchSubmit}>
//           <div className="input-group">
//             <span className="input-group-text bg-white border-end-0">
//               <i className="bi bi-search"></i>
//             </span>
//             <input
//               type="text"
//               className={`form-control border-start-0 ${isSearchFocused ? 'search-focused' : ''}`}
//               placeholder="Search jobs, news, destinations..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               onFocus={handleSearchFocus}
//               onBlur={handleSearchBlur}
//             />
//           </div>
//         </form>
//       </div>


//       <div className="navigation-buttons-grid">
//         {navigationButtons.map((button) => (
//           <button
//             key={button.id}
//             className="btn btn-outline-primary rounded-pill navigation-btn"
//             onClick={() => handleCategoryClick(button.category)}
//           >
//             <i className={`bi ${button.icon} me-2`}></i>
//             {button.label}
//           </button>
//         ))}
//       </div>
//     </aside>
//   );
// };

// export default SidebarNavigation;

