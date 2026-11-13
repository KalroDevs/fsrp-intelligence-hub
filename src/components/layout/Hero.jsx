import React from 'react';
import { alertsData } from '../data';
import DynamicIcon from './DynamicIcon';

const Hero = ({ language }) => {
  const translations = {
    en: {
      title: <>Data-Driven Decisions.<br/>Resilient Food Systems.</>,
      desc: 'Connecting knowledge, technologies, and institutions to build productive, climate-resilient food systems across Kenya.',
      btnExplore: 'Explore Digital Services',
      btnResults: 'View Project Results'
    },
    sw: {
      title: <>Maamuzi Yanayoongozwa na Takwimu.<br/>Mifumo Imara ya Chakula.</>,
      desc: 'Kuunganisha maarifa, teknolojia, na taasisi ili kujenga mifumo ya chakula yenye tija na inayostahimili mabadiliko ya tabianchi kote Kenya.',
      btnExplore: 'Gundua Huduma za Kidijitali',
      btnResults: 'Tazama Matokeo ya Mradi'
    }
  };
  const t = translations[language];

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-tag"><div className="dot"></div> FOOD SYSTEMS RESILIENCE PROGRAM</div>
          <h2>{t.title}</h2>
          <p>{t.desc}</p>
          <div className="hero-buttons">
            <button className="btn btn-primary">{t.btnExplore} <DynamicIcon name="fa-arrow-right" size={18} /></button>
            <button className="btn btn-outline">{t.btnResults}</button>
          </div>
        </div>

        <div className="priority-widget">
          <h4><DynamicIcon name="fa-bell" size={18} /> Priority Actions</h4>
          {alertsData.map((alert, idx) => (
            <div className="alert-item" key={idx}>
              <div className={`alert-icon ${alert.type}`}><DynamicIcon name={alert.icon} size={16} /></div>
              <div className="alert-text">
                <strong>{alert.title}</strong>
                <span>{alert.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;