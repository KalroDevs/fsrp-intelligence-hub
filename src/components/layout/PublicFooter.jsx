// PublicFooter.jsx

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="public-footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand / About */}
          <div className="footer-brand">
            <strong>Food Systems Resilience Program – Kenya</strong>
            <p>
              Connecting knowledge, technologies, natural resources, producers, 
              markets, services and institutions to build resilient food systems 
              across Kenya.
            </p>
            <div className="footer-social" aria-label="FSRP on social media">
              <a href="#" aria-label="FSRP Kenya on Facebook">
                <span aria-hidden="true">f</span>
              </a>
              <a href="#" aria-label="FSRP Kenya on X (formerly Twitter)">
                <span aria-hidden="true">𝕏</span>
              </a>
              <a href="#" aria-label="FSRP Kenya on YouTube">
                <span aria-hidden="true">▶</span>
              </a>
              <a href="#" aria-label="FSRP Kenya on LinkedIn">
                <span aria-hidden="true">in</span>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="footer-col">
            <h5>Platform</h5>
            <ul>
              <li><a href="/technologies/">Technologies</a></li>
              <li><a href="/advisories/">Advisories</a></li>
              <li><a href="/providers/">Service Providers</a></li>
              <li><a href="/dashboard/">Results Dashboard</a></li>
            </ul>
          </div>

          {/* Program Links */}
          <div className="footer-col">
            <h5>Program</h5>
            <ul>
              <li><a href="#pdo">PDO Results</a></li>
              <li><a href="#beneficiaries">Beneficiaries</a></li>
              <li><a href="/reports/">Reports &amp; Publications</a></li>
              <li><a href="/procurement/">Procurement Notices</a></li>
              <li><a href="/careers/">Careers &amp; Consultancies</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-col">
            <h5>Support</h5>
            <ul>
              <li><a href="/faq/">FAQs</a></li>
              <li><a href="/help/">Help Centre</a></li>
              <li><a href="/contact/">Contact Support</a></li>
              <li><a href="/grievance/">Grievance Redress</a></li>
              <li><a href="/accessibility/">Accessibility Statement</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h5>Contact</h5>
            <address>
              Ministry of Agriculture and<br />
              Livestock Development<br />
              Kilimo House, Nairobi, Kenya
              <br /><br />
              <a href="mailto:info@fsrp.go.ke">info@fsrp.go.ke</a><br />
              <a href="tel:+254200000000">+254 20 000 0000</a>
            </address>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>
            © {currentYear} FSRP Kenya · Ministry of Agriculture and Livestock 
            Development · Implementing Agencies · County Governments · Partners
          </span>
          <div className="footer-legal">
            <a href="/privacy/">Privacy Policy</a>
            <a href="/terms/">Terms of Use</a>
            <a href="/accessibility/">Accessibility</a>
            <a href="/sitemap/">Sitemap</a>
          </div>
        </div>
      </div>

      <style>{`
        /* =========================================================
           PUBLIC FOOTER STYLES
        ========================================================= */

        .public-footer {
          background: #2c1810; /* Rich brown background */
          color: rgba(255, 255, 255, 0.75);
          font-size: 10px;
          margin-top: auto;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        .public-footer a {
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          transition: color 0.15s ease, transform 0.15s ease;
        }

        .public-footer a:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        /* =========================================================
           FOOTER TOP
        ========================================================= */

        .footer-top {
          padding: 44px 0 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }

        .footer-top::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, 
            #0F5138 0%, 
            #12704A 25%, 
            #14925E 50%, 
            #1AAE71 75%, 
            #34D399 100%
          );
          opacity: 0.6;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr 0.8fr 0.8fr 1fr;
          gap: 30px;
          width: min(1220px, calc(100% - 40px));
          margin: 0 auto;
        }

        /* =========================================================
           BRAND COLUMN
        ========================================================= */

        .footer-brand strong {
          display: block;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          color: #ffffff;
          margin-bottom: 8px;
          letter-spacing: 0.02em;
        }

        .footer-brand p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 10.5px;
          line-height: 1.7;
          max-width: 320px;
          margin: 0 0 16px 0;
        }

        /* =========================================================
           SOCIAL MEDIA
        ========================================================= */

        .footer-social {
          display: flex;
          gap: 8px;
        }

        .footer-social a {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          font-weight: 600;
          transition: all 0.25s ease;
          text-decoration: none !important;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-social a:hover {
          background: rgba(255, 255, 255, 0.18);
          color: #ffffff;
          transform: translateY(-3px) scale(1.05);
          text-decoration: none !important;
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .footer-social a:active {
          transform: translateY(0) scale(0.95);
        }

        .footer-social a:focus-visible {
          outline: 2px solid #14925E;
          outline-offset: 2px;
        }

        /* =========================================================
           FOOTER COLUMNS
        ========================================================= */

        .footer-col h5 {
          font-family: 'Sora', sans-serif;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0 0 12px 0;
          position: relative;
          padding-bottom: 8px;
        }

        .footer-col h5::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 24px;
          height: 2px;
          background: #14925E;
          border-radius: 2px;
          opacity: 0.6;
        }

        .footer-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-col ul li {
          margin-bottom: 8px;
          transition: transform 0.15s ease;
        }

        .footer-col ul li:hover {
          transform: translateX(4px);
        }

        .footer-col ul li:last-child {
          margin-bottom: 0;
        }

        .footer-col ul li a {
          font-size: 9.5px;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.15s ease;
          display: inline-block;
          position: relative;
        }

        .footer-col ul li a::before {
          content: '›';
          margin-right: 4px;
          opacity: 0;
          transition: opacity 0.15s ease, transform 0.15s ease;
          display: inline-block;
          transform: translateX(-4px);
        }

        .footer-col ul li a:hover {
          color: #ffffff;
          text-decoration: none;
        }

        .footer-col ul li a:hover::before {
          opacity: 1;
          transform: translateX(0);
        }

        .footer-col ul li a:focus-visible {
          outline: 2px solid #14925E;
          outline-offset: 2px;
          border-radius: 2px;
        }

        /* =========================================================
           CONTACT / ADDRESS
        ========================================================= */

        .footer-col address {
          font-style: normal;
          color: rgba(255, 255, 255, 0.6);
          font-size: 9.5px;
          line-height: 1.8;
        }

        .footer-col address a {
          color: rgba(255, 255, 255, 0.6);
          display: inline-block;
          transition: color 0.15s ease;
        }

        .footer-col address a:hover {
          color: #ffffff;
          text-decoration: none;
        }

        .footer-col address a:focus-visible {
          outline: 2px solid #14925E;
          outline-offset: 2px;
          border-radius: 2px;
        }

        /* =========================================================
           FOOTER BOTTOM
        ========================================================= */

        .footer-bottom {
          padding: 16px 0;
          background: rgba(0, 0, 0, 0.15);
        }

        .footer-bottom-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          width: min(1220px, calc(100% - 40px));
          margin: 0 auto;
          font-size: 9px;
          color: rgba(255, 255, 255, 0.45);
        }

        .footer-bottom-inner span {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        /* =========================================================
           LEGAL LINKS
        ========================================================= */

        .footer-legal {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .footer-legal a {
          color: rgba(255, 255, 255, 0.45);
          font-size: 9px;
          transition: color 0.15s ease;
          position: relative;
        }

        .footer-legal a:hover {
          color: #ffffff;
          text-decoration: none;
        }

        .footer-legal a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #14925E;
          transition: width 0.25s ease;
        }

        .footer-legal a:hover::after {
          width: 100%;
        }

        .footer-legal a:focus-visible {
          outline: 2px solid #14925E;
          outline-offset: 2px;
          border-radius: 2px;
        }

        .footer-legal a:not(:last-child)::before {
          content: '·';
          margin-right: 16px;
          color: rgba(255, 255, 255, 0.2);
        }

        .footer-legal a:first-child::before {
          display: none;
        }

        /* =========================================================
           ACCESSIBILITY MODES
        ========================================================= */

        /* High Contrast Mode */
        .high-contrast .public-footer {
          background: #1a0e0a !important;
          border-top: 3px solid #ffffff;
        }

        .high-contrast .public-footer a {
          color: #ffffff !important;
          text-decoration: underline !important;
        }

        .high-contrast .public-footer a:hover {
          color: #ffff00 !important;
        }

        .high-contrast .footer-top {
          border-bottom-color: #ffffff;
        }

        .high-contrast .footer-top::before {
          background: #ffffff !important;
          opacity: 1 !important;
        }

        .high-contrast .footer-social a {
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid #ffffff;
        }

        .high-contrast .footer-social a:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .high-contrast .footer-col h5::after {
          background: #ffffff !important;
          opacity: 1 !important;
        }

        .high-contrast .footer-bottom {
          background: rgba(0, 0, 0, 0.3);
        }

        /* Dark Mode */
        .dark-mode .public-footer {
          background: #0a0604 !important;
        }

        .dark-mode .public-footer a {
          color: rgba(255, 255, 255, 0.85);
        }

        .dark-mode .public-footer a:hover {
          color: #ffffff;
        }

        .dark-mode .footer-social a {
          background: rgba(255, 255, 255, 0.1);
        }

        .dark-mode .footer-social a:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .dark-mode .footer-bottom {
          background: rgba(0, 0, 0, 0.25);
        }

        /* Large Text Mode */
        .large-text .public-footer {
          font-size: 12px !important;
        }

        .large-text .public-footer .footer-brand strong {
          font-size: 17px !important;
        }

        .large-text .public-footer .footer-brand p {
          font-size: 12px !important;
        }

        .large-text .public-footer .footer-col ul li a {
          font-size: 11px !important;
        }

        .large-text .public-footer .footer-col address {
          font-size: 11px !important;
        }

        .large-text .public-footer .footer-bottom-inner {
          font-size: 11px !important;
        }

        .large-text .public-footer .footer-legal a {
          font-size: 11px !important;
        }

        .large-text .public-footer .footer-col h5 {
          font-size: 11px !important;
        }

        /* Grayscale Mode */
        .grayscale .public-footer {
          filter: grayscale(100%);
        }

        .grayscale .public-footer .footer-social a {
          filter: grayscale(100%);
        }

        .grayscale .public-footer .footer-social a:hover {
          filter: grayscale(100%) brightness(1.2);
        }

        .grayscale .footer-top::before {
          filter: grayscale(100%);
        }

        /* =========================================================
           RESPONSIVE
        ========================================================= */

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
          .footer-brand p {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
          .footer-top {
            padding: 32px 0 24px;
          }
          .footer-brand strong {
            font-size: 13px;
          }
          .footer-brand p {
            font-size: 10px;
          }
        }

        @media (max-width: 680px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
          .footer-bottom-inner {
            flex-direction: column;
            text-align: center;
          }
          .footer-legal {
            justify-content: center;
          }
          .footer-social {
            justify-content: center;
          }
          .footer-bottom-inner span {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .footer-top {
            padding: 24px 0 16px;
          }
          .footer-brand strong {
            font-size: 12px;
          }
          .footer-brand p {
            font-size: 9.5px;
          }
          .footer-col h5 {
            font-size: 8px;
          }
          .footer-col ul li a {
            font-size: 8.5px;
          }
          .footer-col address {
            font-size: 8.5px;
          }
          .footer-bottom {
            padding: 12px 0;
          }
          .footer-bottom-inner {
            font-size: 8px;
            gap: 12px;
          }
          .footer-legal {
            gap: 10px;
          }
          .footer-legal a {
            font-size: 8px;
          }
          .footer-social a {
            width: 28px;
            height: 28px;
            font-size: 11px;
          }
          .footer-legal a:not(:last-child)::before {
            margin-right: 10px;
          }
        }

        @media (max-width: 360px) {
          .footer-legal {
            flex-direction: column;
            align-items: center;
            gap: 6px;
          }
          .footer-legal a:not(:last-child)::before {
            display: none;
          }
          .footer-social {
            gap: 6px;
          }
          .footer-social a {
            width: 24px;
            height: 24px;
            font-size: 9px;
          }
        }

        /* =========================================================
           ANIMATIONS
        ========================================================= */

        @keyframes footerSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .public-footer {
          animation: footerSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes footerPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .footer-top::before {
          animation: footerPulse 3s ease-in-out infinite;
        }

        /* =========================================================
           PRINT STYLES
        ========================================================= */

        @media print {
          .public-footer {
            background: #ffffff !important;
            color: #000000 !important;
            border-top: 1px solid #cccccc;
            animation: none !important;
          }
          
          .public-footer a {
            color: #000000 !important;
          }
          
          .public-footer a:hover {
            text-decoration: underline !important;
          }
          
          .footer-top {
            border-bottom-color: #cccccc;
          }
          
          .footer-top::before {
            display: none;
          }
          
          .footer-brand strong {
            color: #000000 !important;
          }
          
          .footer-brand p {
            color: #333333 !important;
          }
          
          .footer-col h5 {
            color: #000000 !important;
          }
          
          .footer-col h5::after {
            background: #000000 !important;
            opacity: 1 !important;
          }
          
          .footer-col ul li a {
            color: #333333 !important;
          }
          
          .footer-col address {
            color: #333333 !important;
          }
          
          .footer-col address a {
            color: #333333 !important;
          }
          
          .footer-bottom {
            background: #f5f5f5 !important;
          }
          
          .footer-bottom-inner {
            color: #333333 !important;
          }
          
          .footer-legal a {
            color: #333333 !important;
          }
          
          .footer-legal a::after {
            display: none;
          }
          
          .footer-legal a:not(:last-child)::before {
            color: #999999 !important;
          }
          
          .footer-social a {
            background: #f0f0f0 !important;
            color: #333333 !important;
            border: 1px solid #cccccc;
          }
          
          .footer-social a:hover {
            background: #e0e0e0 !important;
          }

          .footer-col ul li:hover {
            transform: none !important;
          }

          .footer-col ul li a::before {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
}