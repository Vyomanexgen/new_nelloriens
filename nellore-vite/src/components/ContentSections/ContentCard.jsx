import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ContentCard.css';

const ContentCard = ({ item, onCardClick }) => {
  const handleClick = () => {
    if (onCardClick) {
      onCardClick(item);
    }
  };

  return (
    <div className="content-card" onClick={handleClick}>
      <div className="content-card-body">
        <div className="content-card-icon">
          <i className={`bi ${item.icon}`}></i>
        </div>
        <div className="content-card-text">
          <h6 className="content-card-title">{item.title}</h6>
          <p className="content-card-subtitle">{item.subtitle}</p>
        </div>
        <div className="content-card-badge">
          <span className={`badge badge-${item.badgeColor || 'light-blue'}`}>
            {item.badge}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;

