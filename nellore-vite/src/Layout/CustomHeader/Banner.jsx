import React from 'react';
import "../../styles/Banner.css";
import "bootstrap-icons/font/bootstrap-icons.css";



function Banner() {
  return (    
    <section className="banner-section">
      <span className='name-logo'>N</span>
      <h2>Your Gateway to Jobs, News, Travel & More</h2>
      <div className="banner-search-container">
        <input type="text" placeholder="Search for jobs, news, updates..." />
        <button className="search-btn">Search</button>
      </div>
      <div className="banner-categories">
        <button>Latest Jobs</button>
        <button>Exam Results</button>
        <button>Breaking News</button>
        <button>Tourism</button>
      </div>
    </section>
  );
}
export default Banner;
