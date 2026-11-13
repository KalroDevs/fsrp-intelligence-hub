import React from 'react';
import DynamicIcon from './DynamicIcon';

const Marquee = () => {
  const items = [
    <><span className="tag urgent">URGENT</span> <DynamicIcon name="fa-exclamation-triangle" size={14} /> Fall Armyworm alert issued for Trans Nzoia and Bungoma counties.</>,
    <><DynamicIcon name="fa-cloud-sun-rain" size={14} /> Short rains expected to begin early in the Eastern region. View advisory.</>,
    <><span className="tag">NEW</span> <DynamicIcon name="fa-star" size={14} /> One Million Farmer Platform API v2.0 is now live for all Agtechs.</>,
    <><DynamicIcon name="fa-syringe" size={14} /> Livestock vaccination drive starts next Monday in Garissa.</>
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-label"><DynamicIcon name="fa-bullhorn" size={16} style={{marginRight: '8px'}} /> Official Updates</div>
      <div className="marquee-content">
        {items.map((item, idx) => <div className="marquee-item" key={idx}>{item}</div>)}
        {items.map((item, idx) => <div className="marquee-item" key={`dup-${idx}`}>{item}</div>)}
      </div>
    </div>
  );
};

export default Marquee;