// ReportGenerator.jsx - with PDF Export
import { useState, useRef, useEffect } from "react";
import "./report-generator.css";

// =========================================================
// REPORT DATA
// =========================================================

const REPORT_DATA = {
  title: "FSRP Kenya Quarterly Performance Report",
  period: "Q2 2026 (April - June 2026)",
  generatedDate: new Date().toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }),
  summary: {
    totalBeneficiaries: "1,318,632",
    womenReached: "31,500",
    youthReached: "21,800",
    organizations: "528,700",
    vaccinated: "420",
    livestockVaccinated: "156",
    eSubsidy: "156",
    advisories: "156"
  },
  pdoIndicators: [
    { 
      name: "Reduction of food-insecure people", 
      target: "20%", 
      current: "12.4%", 
      status: "On Track",
      progress: 62
    },
    { 
      name: "Farmers adopting resilience technologies", 
      target: "300,000", 
      current: "187,000", 
      status: "On Track",
      progress: 62
    },
    { 
      name: "Sustainable landscape management", 
      target: "250,000 ha", 
      current: "156,000 ha", 
      status: "On Track",
      progress: 62
    },
    { 
      name: "Production sold in markets", 
      target: "+20%", 
      current: "+12.8%", 
      status: "On Track",
      progress: 64
    },
    { 
      name: "Policy products adopted", 
      target: "5", 
      current: "3", 
      status: "In Progress",
      progress: 60
    }
  ],
  countyPerformance: [
    { county: "Lamu", targeted: 33493, reached: 27565, achievement: "82%" },
    { county: "Tana River", targeted: 132305, reached: 11887, achievement: "9%" },
    { county: "Laikipia", targeted: 135720, reached: 50698, achievement: "37%" },
    { county: "Garissa", targeted: 111484, reached: 51751, achievement: "46%" },
    { county: "Elgeyo-Marakwet", targeted: 123172, reached: 71371, achievement: "58%" },
    { county: "Baringo", targeted: 115283, reached: 44878, achievement: "39%" },
    { county: "Isiolo", targeted: 40301, reached: 23168, achievement: "57%" },
    { county: "Samburu", targeted: 69734, reached: 37391, achievement: "54%" },
    { county: "West Pokot", targeted: 106534, reached: 47678, achievement: "45%" },
    { county: "Wajir", targeted: 121854, reached: 90286, achievement: "74%" },
    { county: "Mandera", targeted: 133893, reached: 90194, achievement: "67%" },
    { county: "Marsabit", targeted: 82547, reached: 17936, achievement: "22%" },
    { county: "Turkana", targeted: 112312, reached: 72433, achievement: "64%" },
  ],
  genderDistribution: [
    { group: "Male", percentage: 45 },
    { group: "Female", percentage: 55 }
  ],
  ageDistribution: [
    { group: "0-18", percentage: 32 },
    { group: "19-35", percentage: 38 },
    { group: "36-50", percentage: 20 },
    { group: "51+", percentage: 10 }
  ],
  valueChainData: [
    { name: "Crop Production", value: 28500 },
    { name: "Horticulture", value: 21200 },
    { name: "Livestock", value: 18200 },
    { name: "Dairy", value: 15400 },
    { name: "Trade & Marketing", value: 12300 },
    { name: "Agro-processing", value: 9800 },
    { name: "Fisheries", value: 8900 },
  ],
  quarterlyGrowth: {
    labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'],
    values: [8200, 12400, 16800, 21300, 26800, 32100],
    cumulative: [8200, 20600, 37400, 58700, 85500, 117600]
  }
};

// =========================================================
// LOGO COMPONENT
// =========================================================

const FSRPLogo = ({ size = "medium" }) => {
  const sizes = {
    small: { width: 40, height: 40, fontSize: 14 },
    medium: { width: 56, height: 56, fontSize: 18 },
    large: { width: 72, height: 72, fontSize: 22 }
  };

  const config = sizes[size] || sizes.medium;

  return (
    <div className="fsrp-logo" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div className="fsrp-logo-mark" style={{
        width: config.width,
        height: config.height,
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #0F5138, #14925E)',
        display: 'grid',
        placeItems: 'center',
        color: 'white',
        fontFamily: '"Sora", sans-serif',
        fontWeight: 800,
        fontSize: config.fontSize,
        letterSpacing: '-0.5px',
        boxShadow: '0 4px 12px rgba(15, 81, 56, 0.3)',
        flexShrink: 0
      }}>
        F
      </div>
      <div>
        <div className="fsrp-logo-text" style={{
          fontFamily: '"Sora", sans-serif',
          fontWeight: 700,
          fontSize: size === 'small' ? '14px' : size === 'large' ? '22px' : '18px',
          color: '#0F5138',
          lineHeight: 1.2
        }}>
          FSRP Kenya
        </div>
        <div className="fsrp-logo-sub" style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 500,
          fontSize: size === 'small' ? '8px' : size === 'large' ? '12px' : '10px',
          color: '#6D746F',
          letterSpacing: '0.02em'
        }}>
          Food Systems Resilience Program
        </div>
      </div>
    </div>
  );
};

// =========================================================
// REPORT GENERATOR COMPONENT
// =========================================================

export default function ReportGenerator({ onClose, onGenerate }) {
  const [reportType, setReportType] = useState('quarterly');
  const [period, setPeriod] = useState('Q2 2026');
  const [format, setFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeTables, setIncludeTables] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const reportRef = useRef(null);

  const periods = ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'];
  const reportTypes = [
    { value: 'quarterly', label: 'Quarterly Performance' },
    { value: 'annual', label: 'Annual Report' },
    { value: 'pdo', label: 'PDO Status Report' },
    { value: 'county', label: 'County Performance' },
    { value: 'demographic', label: 'Demographic Analysis' }
  ];

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setShowPreview(true);
    
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      if (onGenerate) {
        onGenerate({
          type: reportType,
          period: period,
          format: format,
          data: REPORT_DATA
        });
      }
    }, 1500);
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;

    try {
      setIsGenerating(true);
      setDownloadProgress(10);

      // Dynamically import html2pdf
      const html2pdf = await import('html2pdf.js');

      const element = reportRef.current;
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `FSRP_Report_${REPORT_DATA.period.replace(/\s/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          scrollY: 0,
          windowHeight: element.scrollHeight
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      setDownloadProgress(30);

      // Generate PDF
      await html2pdf.default()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          setDownloadProgress(100);
          setTimeout(() => {
            setIsGenerating(false);
            setDownloadProgress(0);
          }, 500);
        });

    } catch (error) {
      console.error('PDF generation failed:', error);
      setIsGenerating(false);
      setDownloadProgress(0);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="report-modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="report-modal" role="dialog" aria-label="Generate Report">
        {/* Modal Header */}
        <div className="report-modal-header">
          <div className="report-modal-header-left">
            <FSRPLogo size="small" />
            <div>
              <h2>Generate Report</h2>
              <p>Create a comprehensive performance report</p>
            </div>
          </div>
          <button className="report-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="report-modal-body">
          {!showPreview ? (
            /* Configuration Form */
            <div className="report-config">
              <div className="report-config-grid">
                <div className="form-group">
                  <label className="form-label">Report Type</label>
                  <select 
                    className="form-control" 
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    {reportTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Reporting Period</label>
                  <select 
                    className="form-control" 
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                  >
                    {periods.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Output Format</label>
                  <div className="format-options">
                    <button 
                      className={`format-btn ${format === 'pdf' ? 'active' : ''}`}
                      onClick={() => setFormat('pdf')}
                    >
                      <span>📄</span> PDF
                    </button>
                    <button 
                      className={`format-btn ${format === 'word' ? 'active' : ''}`}
                      onClick={() => setFormat('word')}
                    >
                      <span>📝</span> Word
                    </button>
                    <button 
                      className={`format-btn ${format === 'excel' ? 'active' : ''}`}
                      onClick={() => setFormat('excel')}
                    >
                      <span>📊</span> Excel
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Include Sections</label>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={includeCharts}
                        onChange={(e) => setIncludeCharts(e.target.checked)}
                      />
                      Charts & Visualizations
                    </label>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={includeTables}
                        onChange={(e) => setIncludeTables(e.target.checked)}
                      />
                      Data Tables
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Report Preview */
            <div className="report-preview">
              <div className="report-preview-header">
                <button className="preview-back-btn" onClick={() => setShowPreview(false)}>
                  ← Back
                </button>
                <div className="preview-actions">
                  <button className="preview-btn preview-btn-secondary" onClick={handlePrint}>
                    🖨️ Print
                  </button>
                  <button 
                    className="preview-btn preview-btn-primary" 
                    onClick={handleExportPDF}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <span className="spinner"></span>
                        {downloadProgress > 0 ? `${downloadProgress}%` : 'Generating...'}
                      </>
                    ) : (
                      '📥 Download PDF'
                    )}
                  </button>
                </div>
              </div>

              {/* =========================================================
                  REPORT LETTERHEAD
              ========================================================= */}
              <div className="report-content-wrapper" ref={reportRef}>
                <div className="report-letterhead">
                  <div className="report-letterhead-top">
                    <FSRPLogo size="large" />
                    <div className="report-letterhead-meta">
                      <div className="report-number">Report No: FSRP/Q2/2026-001</div>
                      <div className="report-date">Date Generated: {REPORT_DATA.generatedDate}</div>
                    </div>
                  </div>
                  
                  <div className="report-letterhead-title">
                    <h1>{REPORT_DATA.title}</h1>
                    <p>Period: {REPORT_DATA.period}</p>
                  </div>

                  <div className="report-letterhead-divider">
                    <span></span>
                    <span>●</span>
                    <span></span>
                  </div>
                </div>

                {/* =========================================================
                    REPORT CONTENT
                ========================================================= */}
                <div className="report-content">
                  {/* Executive Summary */}
                  <div className="report-section">
                    <h3>Executive Summary</h3>
                    <p>
                      This report provides a comprehensive overview of the Food Systems Resilience Program 
                      (FSRP) Kenya performance for the period ending {REPORT_DATA.period}. 
                      The program continues to make significant progress towards its Project Development 
                      Objectives (PDOs), with key indicators showing positive trends across all intervention areas.
                    </p>
                  </div>

                  {/* Key Statistics */}
                  <div className="report-section">
                    <h3>Key Performance Indicators</h3>
                    <div className="report-stats-grid">
                      <div className="report-stat">
                        <span className="report-stat-label">Total Beneficiaries</span>
                        <strong className="report-stat-value">{REPORT_DATA.summary.totalBeneficiaries}</strong>
                      </div>
                      <div className="report-stat">
                        <span className="report-stat-label">Women Reached</span>
                        <strong className="report-stat-value">{REPORT_DATA.summary.womenReached}</strong>
                      </div>
                      <div className="report-stat">
                        <span className="report-stat-label">Youth Reached</span>
                        <strong className="report-stat-value">{REPORT_DATA.summary.youthReached}</strong>
                      </div>
                      <div className="report-stat">
                        <span className="report-stat-label">CIG/SACCOs/FPOs</span>
                        <strong className="report-stat-value">{REPORT_DATA.summary.organizations}</strong>
                      </div>
                      <div className="report-stat">
                        <span className="report-stat-label">Livestock Vaccinated</span>
                        <strong className="report-stat-value">{REPORT_DATA.summary.livestockVaccinated}</strong>
                      </div>
                      <div className="report-stat">
                        <span className="report-stat-label">eSubsidy Beneficiaries</span>
                        <strong className="report-stat-value">{REPORT_DATA.summary.eSubsidy}</strong>
                      </div>
                    </div>
                  </div>

                  {/* PDO Indicators */}
                  <div className="report-section">
                    <h3>PDO Indicators Progress</h3>
                    <div className="report-table-wrap">
                      <table className="report-table">
                        <thead>
                          <tr>
                            <th>Indicator</th>
                            <th>Target</th>
                            <th>Current</th>
                            <th>Status</th>
                            <th>Progress</th>
                          </tr>
                        </thead>
                        <tbody>
                          {REPORT_DATA.pdoIndicators.map((indicator, index) => (
                            <tr key={index}>
                              <td>{indicator.name}</td>
                              <td>{indicator.target}</td>
                              <td>{indicator.current}</td>
                              <td>
                                <span className={`status-badge status-${indicator.status.toLowerCase().replace(' ', '-')}`}>
                                  {indicator.status}
                                </span>
                              </td>
                              <td>
                                <div className="progress-bar-small">
                                  <div className="progress-bar-fill" style={{ width: `${indicator.progress}%` }}></div>
                                  <span className="progress-text">{indicator.progress}%</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Gender Distribution */}
                  {includeCharts && (
                    <div className="report-section">
                      <h3>Gender Distribution</h3>
                      <div className="report-chart-grid">
                        <div className="chart-placeholder">
                          <div className="mini-pie-chart">
                            {REPORT_DATA.genderDistribution.map((item, index) => {
                              const colors = ['#068DB3', '#E80CE8'];
                              return (
                                <div 
                                  key={index}
                                  className="pie-segment"
                                  style={{
                                    width: `${item.percentage}%`,
                                    background: colors[index],
                                    height: '20px',
                                    borderRadius: '4px'
                                  }}
                                >
                                  <span className="segment-label">{item.group}: {item.percentage}%</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* County Performance */}
                  {includeTables && (
                    <div className="report-section">
                      <h3>County Performance</h3>
                      <div className="report-table-wrap">
                        <table className="report-table">
                          <thead>
                            <tr>
                              <th>County</th>
                              <th>Targeted</th>
                              <th>Reached</th>
                              <th>Achievement</th>
                            </tr>
                          </thead>
                          <tbody>
                            {REPORT_DATA.countyPerformance.map((county, index) => (
                              <tr key={index}>
                                <td><strong>{county.county}</strong></td>
                                <td>{county.targeted.toLocaleString()}</td>
                                <td>{county.reached.toLocaleString()}</td>
                                <td>
                                  <span className="achievement-badge">{county.achievement}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Value Chain Data */}
                  {includeTables && (
                    <div className="report-section">
                      <h3>Value Chain Distribution</h3>
                      <div className="report-table-wrap">
                        <table className="report-table">
                          <thead>
                            <tr>
                              <th>Value Chain</th>
                              <th>Beneficiaries</th>
                              <th>Percentage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {REPORT_DATA.valueChainData.map((item, index) => {
                              const total = REPORT_DATA.valueChainData.reduce((sum, i) => sum + i.value, 0);
                              const percentage = ((item.value / total) * 100).toFixed(1);
                              return (
                                <tr key={index}>
                                  <td>{item.name}</td>
                                  <td>{item.value.toLocaleString()}</td>
                                  <td>{percentage}%</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="report-footer">
                    <div className="report-footer-content">
                      <div className="report-footer-left">
                        <FSRPLogo size="small" />
                        <div>
                          <strong>Food Systems Resilience Program - Kenya</strong>
                          <p>Ministry of Agriculture and Livestock Development</p>
                        </div>
                      </div>
                      <div className="report-footer-right">
                        <p>Generated by: FSRP MIS</p>
                        <p>Confidential - For internal use only</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {!showPreview && (
          <div className="report-modal-footer">
            <button className="modal-btn-secondary" onClick={onClose}>Cancel</button>
            <button 
              className="modal-btn-primary" 
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="spinner"></span>
                  Generating...
                </>
              ) : (
                'Generate Report'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}