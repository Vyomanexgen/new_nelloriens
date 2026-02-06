
import './TransportPage.css';

const TransportFilters = ({ filters, onFilterChange }) => {
  
  const handleTypeChange = (type) => {
    const updatedTypes = filters.transportTypes.includes(type)
      ? filters.transportTypes.filter(t => t !== type)
      : [...filters.transportTypes, type];
    onFilterChange('transportTypes', updatedTypes);
  };
  
 const handleDepartureChange = (timeRange) => {
    const current = filters.departureTime || [];
    const updated = current.includes(timeRange)
        ? current.filter(t => t !== timeRange)
        : [...current, timeRange];
    onFilterChange('departureTime', updated);
 };

 const handlePriceChange = (priceRange) => {
     // Allow toggling off
     const newValue = filters.priceRange === priceRange ? 'all' : priceRange;
     onFilterChange('priceRange', newValue);
 };

  return (
    <div className="filters-sidebar">
      <div className="filter-group">
        <div className="filter-title">Transport Type</div>
        
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            className="styled-checkbox"
            checked={filters.transportTypes.includes('bus')}
            onChange={() => handleTypeChange('bus')}
          />
          Bus
        </label>
        
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            className="styled-checkbox"
            checked={filters.transportTypes.includes('train')}
            onChange={() => handleTypeChange('train')}
          />
          Train
        </label>
        
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            className="styled-checkbox"
            checked={filters.transportTypes.includes('metro')}
            onChange={() => handleTypeChange('metro')}
          />
          Metro
        </label>
      </div>

      <div className="filter-group">
        <div className="filter-title">Departure Time</div>
        <label className="checkbox-label">
           <input 
             type="checkbox" 
             className="styled-checkbox" 
             checked={filters.departureTime?.includes('morning')} 
             onChange={() => handleDepartureChange('morning')}
           /> 
           Morning (6AM - 12PM)
        </label>
        <label className="checkbox-label">
           <input 
              type="checkbox" 
              className="styled-checkbox" 
              checked={filters.departureTime?.includes('afternoon')} 
              onChange={() => handleDepartureChange('afternoon')}
            /> 
            Afternoon (12PM - 6PM)
        </label>
        <label className="checkbox-label">
           <input 
              type="checkbox" 
              className="styled-checkbox" 
              checked={filters.departureTime?.includes('evening')} 
              onChange={() => handleDepartureChange('evening')}
           /> 
           Evening (6PM - 12AM)
        </label>
      </div>

       <div className="filter-group">
        <div className="filter-title">Price Range</div>
        <label className="checkbox-label">
           <input 
              type="radio" 
              name="price" 
              className="styled-checkbox" 
              checked={filters.priceRange === 'low'}
              onChange={() => handlePriceChange('low')}
           /> 
           Below ₹200
        </label>
        <label className="checkbox-label">
           <input 
              type="radio" 
              name="price" 
              className="styled-checkbox" 
              checked={filters.priceRange === 'mid'}
              onChange={() => handlePriceChange('mid')}
           /> 
           ₹200 - ₹500
        </label>
        <label className="checkbox-label">
           <input 
              type="radio" 
              name="price" 
              className="styled-checkbox" 
              checked={filters.priceRange === 'high'}
              onChange={() => handlePriceChange('high')}
           /> 
           Above ₹500
        </label>
      </div>
    </div>
  );
};

export default TransportFilters;
