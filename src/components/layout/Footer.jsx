// components/Footer.jsx
import React from 'react';

const Footer = ({ lang }) => {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <strong>Food Systems Resilience Program – Kenya</strong>
            <p>Connecting knowledge, technologies, natural resources, producers, markets, services and institutions to build resilient food systems across Kenya.</p>
            <div className="footer-social" aria-label="FSRP on social media">
              <a href="#" aria-label="FSRP Kenya on Facebook"><span aria-hidden="true">f</span></a>
              <a href="#" aria-label="FSRP Kenya on X (formerly Twitter)"><span aria-hidden="true">𝕏</span></a>
              <a href="#" aria-label="FSRP Kenya on YouTube"><span aria-hidden="true">▶</span></a>
              <a href="#" aria-label="FSRP Kenya on LinkedIn"><span aria-hidden="true">in</span></a>
            </div>
          </div>
          <div className="footer-col"><h5>Platform</h5><ul><li><a href="/technologies/">Technologies</a></li><li><a href="/advisories/">Advisories</a></li><li><a href="/providers/">Service Providers</a></li><li><a href="/dashboard/">Results Dashboard</a></li></ul></div>
          <div className="footer-col"><h5>Program</h5><ul><li><a href="#pdo">PDO Results</a></li><li><a href="#beneficiaries">Beneficiaries</a></li><li><a href="/reports/">Reports & Publications</a></li><li><a href="/procurement/">Procurement Notices</a></li><li><a href="/careers/">Careers & Consultancies</a></li></ul></div>
          <div className="footer-col"><h5>Support</h5><ul><li><a href="/faq/">FAQs</a></li><li><a href="/help/">Help Centre</a></li><li><a href="/contact/">Contact Support</a></li><li><a href="/grievance/">Grievance Redress</a></li><li><a href="/accessibility/">Accessibility Statement</a></li></ul></div>
          <div className="footer-col"><h5>Contact</h5><address>Ministry of Agriculture and<br />Livestock Development<br />Kilimo House, Nairobi, Kenya<br /><br /><a href="mailto:info@fsrp.go.ke">info@fsrp.go.ke</a><br /><a href="tel:+254200000000">+254 20 000 0000</a></address></div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {year} FSRP Kenya · Ministry of Agriculture and Livestock Development · Implementing Agencies · County Governments · Partners</span>
          <div className="footer-legal"><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms of Use</a><a href="/accessibility/">Accessibility</a><a href="/sitemap/">Sitemap</a></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;