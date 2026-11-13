// DashboardFooter.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard-footer.css';

export default function DashboardFooter({ compact = false }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`dashboard-footer ${compact ? 'compact' : ''}`} role="contentinfo">
      <div className="dashboard-footer-inner">
        <div className="dashboard-footer-left">
          <div className="dashboard-footer-brand">
            <span  className="footer-brand-text">© {currentYear}</span>
            <span>Food Systems Resillience Project (FSRP) - Kenya</span>
          </div>
          <p className="footer-description">
            Ministry of Agriculture and Livestock Development
          </p>
        </div>

     

        <div className="dashboard-footer-right">
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
          </div>
          
        </div>
      </div>

      <style>{`
        /* =========================================================
           DASHBOARD FOOTER STYLES
        ========================================================= */

        .dashboard-footer {
          background: #ffffff;
          border-top: 1px solid var(--border);
          padding: 20px 0;
          margin-top: auto;
          width: 100%;
        }

        .dashboard-footer.compact {
          padding: 12px 0;
        }

        .dashboard-footer-inner {
          max-width: 100%;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        /* Left Section */
        .dashboard-footer-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 200px;
        }

        .dashboard-footer-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-brand-icon {
          font-size: 16px;
        }

        .footer-brand-text {
          font-family: 'Sora', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--brand-800);
        }

        .footer-description {
          font-size: 8.5px;
          color: var(--muted);
          margin: 0;
          line-height: 1.4;
        }

        /* Center Section - Links */
        .dashboard-footer-center {
          display: flex;
          align-items: center;
        }

        .footer-links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .footer-links a {
          font-size: 9px;
          color: var(--muted);
          text-decoration: none;
          transition: all 0.15s ease;
          position: relative;
        }

        .footer-links a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--brand-600);
          transition: width 0.25s ease;
        }

        .footer-links a:hover {
          color: var(--brand-700);
        }

        .footer-links a:hover::after {
          width: 100%;
        }

        /* Right Section */
        .dashboard-footer-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .footer-legal {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .footer-legal a {
          font-size: 8.5px;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer-legal a:hover {
          color: var(--brand-700);
        }

        .footer-copyright {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 8px;
          color: var(--muted-2);
          flex-wrap: wrap;
        }

        .footer-divider {
          color: var(--border);
        }

        /* =========================================================
           DARK MODE
        ========================================================= */

        .dark-mode .dashboard-footer {
          background: var(--surface);
          border-top-color: var(--border);
        }

        .dark-mode .footer-brand-text {
          color: var(--brand-400);
        }

        .dark-mode .footer-links a {
          color: var(--muted);
        }

        .dark-mode .footer-links a:hover {
          color: var(--brand-400);
        }

        .dark-mode .footer-legal a {
          color: var(--muted);
        }

        .dark-mode .footer-legal a:hover {
          color: var(--brand-400);
        }

        .dark-mode .footer-copyright {
          color: var(--muted-2);
        }

        /* =========================================================
           HIGH CONTRAST
        ========================================================= */

        .high-contrast .dashboard-footer {
          border-top: 2px solid #000;
          background: #fff;
        }

        .high-contrast .footer-links a {
          color: #000;
          text-decoration: underline;
        }

        .high-contrast .footer-links a:hover {
          color: #0066cc;
        }

        .high-contrast .footer-legal a {
          color: #000;
          text-decoration: underline;
        }

        .high-contrast .footer-legal a:hover {
          color: #0066cc;
        }

        .high-contrast .footer-brand-text {
          color: #000;
        }

        /* =========================================================
           LARGE TEXT
        ========================================================= */

        .large-text .footer-brand-text {
          font-size: 15px !important;
        }

        .large-text .footer-description {
          font-size: 10.5px !important;
        }

        .large-text .footer-links a {
          font-size: 11px !important;
        }

        .large-text .footer-legal a {
          font-size: 10.5px !important;
        }

        .large-text .footer-copyright {
          font-size: 10px !important;
        }

        /* =========================================================
           RESPONSIVE
        ========================================================= */

        @media (max-width: 992px) {
          .dashboard-footer-inner {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .dashboard-footer-left {
            align-items: center;
            text-align: center;
          }

          .dashboard-footer-center {
            justify-content: center;
          }

          .footer-links {
            justify-content: center;
          }

          .dashboard-footer-right {
            align-items: center;
          }

          .footer-legal {
            justify-content: center;
          }

          .footer-copyright {
            justify-content: center;
          }
        }

        @media (max-width: 600px) {
          .dashboard-footer {
            padding: 14px 0;
          }

          .dashboard-footer-inner {
            padding: 0 16px;
            gap: 12px;
          }

          .footer-links {
            gap: 10px;
          }

          .footer-links a {
            font-size: 8px;
          }

          .footer-legal {
            gap: 10px;
          }

          .footer-legal a {
            font-size: 7.5px;
          }

          .footer-copyright {
            font-size: 7px;
          }

          .footer-brand-text {
            font-size: 10px;
          }

          .footer-description {
            font-size: 7.5px;
          }
        }

        @media (max-width: 400px) {
          .footer-links {
            flex-direction: column;
            align-items: center;
            gap: 6px;
          }

          .footer-legal {
            flex-direction: column;
            align-items: center;
            gap: 6px;
          }

          .footer-copyright {
            flex-direction: column;
            gap: 4px;
          }

          .footer-divider {
            display: none;
          }
        }

        /* =========================================================
           PRINT STYLES
        ========================================================= */

        @media print {
          .dashboard-footer {
            border-top: 1px solid #ccc;
            background: #fff !important;
            padding: 10px 0;
          }

          .dashboard-footer a {
            color: #000 !important;
            text-decoration: underline !important;
          }

          .dashboard-footer .footer-brand-text {
            color: #000 !important;
          }

          .dashboard-footer .footer-description {
            color: #333 !important;
          }

          .dashboard-footer .footer-copyright {
            color: #333 !important;
          }
        }
      `}</style>
    </footer>
  );
}