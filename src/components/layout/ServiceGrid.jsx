import React from 'react';
import { servicesData } from '../data';
import DynamicIcon from './DynamicIcon';

const ServiceGrid = () => {
  return (
    <section className="dashboard-section">
      <div className="section-header">
        <div>
          <h3><DynamicIcon name="fa-network-wired" size={24} style={{color: 'var(--primary-light)'}} /> Integrated Service Dashboards</h3>
          <div className="legend">
            <div className="legend-item"><div className="legend-dot green"></div> Real-time</div>
            <div className="legend-item"><div className="legend-dot amber"></div> Syncing</div>
            <div className="legend-item"><div className="legend-dot grey"></div> Registry</div>
          </div>
        </div>
        
        <div className="header-controls">
          <button className="btn-export" onClick={() => alert('Generating M&E Report for World Bank...')}>
            <DynamicIcon name="fa-file-export" size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="services-grid">
        {servicesData.map((service) => (
          <div className="service-card" key={service.id} onClick={() => alert(`Navigating to ${service.title}...`)}>
            <div className={`sync-bar ${service.status}`}></div>
            <div className="card-image-wrapper">
              <img src={service.img} alt={service.title} />
              <div className="card-image-overlay"></div>
            </div>
            <div className="card-content">
              <div className="card-header">
                <div className={`card-icon ${service.iconClass}`}><DynamicIcon name={service.icon} size={24} /></div>
                <div className="data-status">
                  <div className={`status-pill ${service.status}`}><DynamicIcon name="fa-check" size={10} /> {service.statusText}</div>
                </div>
              </div>
              <h4>{service.title}</h4>
              <div className="card-tag">{service.tag}</div>
              <p>{service.desc}</p>
              <div className="card-footer">
                <div className="stat"><DynamicIcon name={service.icon} size={16} /> {service.stat} <span>{service.statLabel}</span></div>
                <button className="cta-button">Open <DynamicIcon name="fa-arrow-right" size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceGrid;