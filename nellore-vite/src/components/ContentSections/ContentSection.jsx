import React from 'react';
import ContentCard from './ContentCard';
import './ContentSection.css';

const ContentSection = ({ 
  title, 
  subtitle, 
  items, 
  onCardClick,
  emptyMessage 
}) => {
  return (
    <div className="content-section">
      <div className="content-section-header">
        <h5 className="content-section-title">{title}</h5>
        {subtitle && (
          <span className="content-section-subtitle">{subtitle}</span>
        )}
      </div>
      <div className="content-section-body">
        {items && items.length > 0 ? (
          items.map((item) => (
            <ContentCard 
              key={item.id} 
              item={item} 
              onCardClick={onCardClick}
            />
          ))
        ) : (
          emptyMessage && (
            <div className="content-section-empty">
              <p className="text-muted">{emptyMessage}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ContentSection;

