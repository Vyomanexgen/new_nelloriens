
import { useState } from 'react';
import './TransportPage.css';
import { transportData } from './transportData';

const TransportSearchSection = ({ onSearch }) => {
  const [source, setSource] = useState('Nellore');
  const [destination, setDestination] = useState('Gudur');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default today
  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  const filterCities = (query) => {
    return transportData.cities.filter(city => 
      city.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ source, destination, date });
  };

  const swapLocations = () => {
    setSource(destination);
    setDestination(source);
  };

  return (
    <div className="transport-search-section">
      <form onSubmit={handleSearch} className="search-form-grid">
        
        {/* From Input */}
        <div className="input-group-custom">
          <label className="input-label">
            <i className="bi bi-geo-alt-fill"></i> FROM
          </label>
          <div className="input-wrapper">
            <i className="bi bi-bus-front input-icon"></i>
            <input 
              type="text" 
              className="search-input"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              onFocus={() => setShowSourceSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSourceSuggestions(false), 200)}
              placeholder="Enter source city"
            />
          </div>
          {showSourceSuggestions && (
            <ul className="suggestions-list">
              {filterCities(source).map(city => (
                <li key={city} className="suggestion-item" onClick={() => setSource(city)}>
                  <i className="bi bi-building"></i> {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* To Input */}
        <div className="input-group-custom">
          <label className="input-label">
            <i className="bi bi-geo-fill"></i> TO
          </label>
          <div className="input-wrapper">
            <i className="bi bi-flag-fill input-icon"></i>
            <input 
              type="text" 
              className="search-input"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => setShowDestSuggestions(true)}
              onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
              placeholder="Enter destination city"
            />
          </div>
          {showDestSuggestions && (
            <ul className="suggestions-list">
              {filterCities(destination).map(city => (
                <li key={city} className="suggestion-item" onClick={() => setDestination(city)}>
                  <i className="bi bi-building"></i> {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Date Input */}
        <div className="input-group-custom">
          <label className="input-label">
            <i className="bi bi-calendar-event"></i> DATE
          </label>
          <div className="input-wrapper">
             <i className="bi bi-calendar3 input-icon"></i>
            <input 
              type="date" 
              className="search-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Search Button */}
        <button type="submit" className="search-btn">
          SEARCH
        </button>
      </form>
      
       {/* Swap Button Absolute (Visual only for now or functional) */}
       {/* <div className="swap-icon" onClick={swapLocations}>
         <i className="bi bi-arrow-left-right"></i>
       </div> */}
    </div>
  );
};

export default TransportSearchSection;
