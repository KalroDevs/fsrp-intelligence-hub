// DashboardHome.jsx
import { useMemo, useState, useEffect, useRef } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import { Link } from "react-router-dom";
import "./dashboard-home.css";
import ReportGenerator from "../../components/ui/ReportGenerator.jsx";



// =========================================================
// DATA
// =========================================================

const PDO_ITEMS = [
  { label: "Food insecurity reduction", value: "20%", note: "End target", trend: "+5.2%" },
  { label: "Farmers adopting resilience technologies", value: "300K", note: "Farmers", trend: "+12.8%" },
  { label: "Sustainable landscape management", value: "250K", note: "Hectares", trend: "+8.4%" },
  { label: "Production sold", value: "+20%", note: "Domestic & regional markets", trend: "+15.3%" },
  { label: "Policies adopted", value: "5", note: "Policy products", trend: "2 pending" },
];

const STATISTICS = [
  { 
    icon: "👥", 
    label: "Total Beneficiaries", 
    value: "1,318,632", 
    change: "+8.4%", 
    note: "vs last quarter",
    color: "#0F5138",
    bgColor: "#E8F5EE"
  },
  { 
    icon: "👩", 
    label: "Women Reached", 
    value: "313,500", 
    change: "+6.2%", 
    note: "vs last quarter",
    color: "#14925E",
    bgColor: "#EDF5EC"
  },
  { 
    icon: "🧑", 
    label: "Youth Reached", 
    value: "210,800", 
    change: "+15.7%", 
    note: "vs last quarter",
    color: "#1AAE71",
    bgColor: "#F0F7EE"
  },
  { 
    icon: "🤝", 
    label: "Belong to CIG", 
    value: "128,700", 
    change: "+12.3%", 
    note: "vs last quarter",
    color: "#12704A",
    bgColor: "#EAF3EA"
  },
  { 
    icon: "🤝", 
    label: "Belong to SACCOs", 
    value: "128,700", 
    change: "+12.3%", 
    note: "vs last quarter",
    color: "#12704A",
    bgColor: "#EAF3EA"
  },
  { 
    icon: "🤝", 
    label: "Belong to FPO", 
    value: "128,700", 
    change: "+12.3%", 
    note: "vs last quarter",
    color: "#12704A",
    bgColor: "#EAF3EA"
  },
  { 
    icon: "🤝", 
    label: "Soil Samples Collected", 
    value: "128,700", 
    change: "+12.3%", 
    note: "vs last quarter",
    color: "#12704A",
    bgColor: "#EAF3EA"
  },
  { 
    icon: "🤝", 
    label: "FLID Beneficiaries", 
    value: "128,700", 
    change: "+12.3%", 
    note: "vs last quarter",
    color: "#12704A",
    bgColor: "#EAF3EA"
  },
  { 
    icon: "🤝", 
    label: "Trained on TIMPs", 
    value: "128,700", 
    change: "+12.3%", 
    note: "vs last quarter",
    color: "#12704A",
    bgColor: "#EAF3EA"
  },
  { 
    icon: "🤝", 
    label: "Linked to Agritechs", 
    value: "128,700", 
    change: "+12.3%", 
    note: "vs last quarter",
    color: "#12704A",
    bgColor: "#EAF3EA"
  },
  { 
    icon: "💉", 
    label: "Beneficiaries Whose Livestock are Vaccinated", 
    value: "420,030", 
    change: "+4.1%", 
    note: "vs last quarter",
    color: "#0F5138",
    bgColor: "#E8F5EE"
  },
  { 
    icon: "🐄", 
    label: "Total Livestock Vaccinated", 
    value: "2,560,090", 
    change: "+3.2%", 
    note: "vs last quarter",
    color: "#12704A",
    bgColor: "#EAF3EA"
  },
  { 
    icon: "💳", 
    label: "eSubsidy Beneficiaries", 
    value: "956,001", 
    change: "+3.2%", 
    note: "vs last quarter",
    color: "#12704A",
    bgColor: "#EAF3EA"
  },
  { 
    icon: "📢", 
    label: "Receiving Advisories", 
    value: "709,908", 
    change: "+3.2%", 
    note: "vs last quarter",
    color: "#12704A",
    bgColor: "#EAF3EA"
  },
];

const GENDER_DATA = {
  labels: ['Male', 'Female'],
  values: [45, 55],
  colors: ['#068db3ff', '#e80ce8ff']
};

const COUNTY_BENEFICIARY_DATA = [
  { county: 'Lamu', targeted: 33493, reached: 27565 },
  { county: 'Tana River', targeted: 132305, reached: 11887 },
  { county: 'Laikipia', targeted: 135720, reached: 50698 },
  { county: 'Garissa', targeted: 111484, reached: 51751 },
  { county: 'Elgeyo-Marakwet', targeted: 123172, reached: 71371 },
  { county: 'Baringo', targeted: 115283, reached: 44878 },
  { county: 'Isiolo', targeted: 40301, reached: 23168 },
  { county: 'Samburu', targeted: 69734, reached: 37391 },
  { county: 'West Pokot', targeted: 106534, reached: 47678 },
  { county: 'Wajir', targeted: 121854, reached: 90286 },
  { county: 'Mandera', targeted: 133893, reached: 90194 },
  { county: 'Marsabit', targeted: 82547, reached: 17936 },
  { county: 'Turkana', targeted: 112312, reached: 72433 },
];

const QUARTERLY_GROWTH = {
  labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'],
  values: [8200, 12400, 16800, 21300, 26800, 32100],
  cumulative: [8200, 20600, 37400, 58700, 85500, 117600]
};

const VALUE_CHAIN_DATA = [
  { name: 'Sorghum', value: 18500, color: '#0F5138' },
  { name: 'Millet', value: 16200, color: '#12704A' },
  { name: 'Green Grams', value: 15800, color: '#14925E' },
  { name: 'Pigeon Peas', value: 14300, color: '#1AAE71' },
  { name: 'Cowpeas', value: 13700, color: '#34D399' },
  { name: 'Apiculture', value: 12100, color: '#0F5138' },
  { name: 'Goats', value: 11800, color: '#12704A' },
  { name: 'Sheep', value: 10400, color: '#14925E' },
  { name: 'Beef Cattle', value: 9200, color: '#1AAE71' },
  { name: 'Indigenous Chicken', value: 8900, color: '#34D399' },
  { name: 'Camel', value: 7600, color: '#0F5138' },
  { name: 'Mango', value: 6800, color: '#12704A' },
];

const AGE_GROUP_PER_COUNTY = [
  { county: 'Nairobi', '0-18': 45000, '19-35': 68000, '36-50': 32000, '51+': 11780 },
  { county: 'Kakamega', '0-18': 32000, '19-35': 48000, '36-50': 22000, '51+': 7870 },
  { county: 'Nakuru', '0-18': 35000, '19-35': 54000, '36-50': 26000, '51+': 8450 },
  { county: 'Kiambu', '0-18': 28000, '19-35': 43000, '36-50': 20000, '51+': 7760 },
  { county: 'Kisumu', '0-18': 28000, '19-35': 43000, '36-50': 20000, '51+': 7760 },
];

const AGE_GROUPS = ['0-18', '19-35', '36-50', '51+'];
const AGE_COLORS = ['#0F5138', '#12704A', '#14925E', '#1AAE71'];

const FOOD_SYSTEM_NODES = [
  { icon: "🔬", name: "Research & Inputs", value: "8,400", note: "Researchers, breeders, seed enterprises" },
  { icon: "🌾", name: "Production", value: "18,200", note: "Farmers, pastoralists, fisherfolk" },
  { icon: "🤝", name: "Aggregation", value: "6,800", note: "Cooperatives, farmer groups" },
  { icon: "⚙", name: "Processing", value: "5,100", note: "Processors, packhouses, SMEs" },
  { icon: "🚚", name: "Storage & Logistics", value: "4,300", note: "Warehouse operators, transporters" },
  { icon: "🛒", name: "Markets & Trade", value: "7,200", note: "Traders, wholesalers, retailers" },
  { icon: "🍽", name: "Consumers", value: "14,200", note: "Households and communities" },
];

// =========================================================
// CHART COMPONENTS
// =========================================================

const PieChart = ({ data, colors, size = 180 }) => {
  const total = data.reduce((sum, val) => sum + val, 0);
  let startAngle = -90;
  const center = size / 2;
  const radius = size / 2 - 10;

  const getPath = (value) => {
    const percentage = value / total;
    const angle = percentage * 360;
    const endAngle = startAngle + angle;
    
    const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArc = angle > 180 ? 1 : 0;
    const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    startAngle = endAngle;
    return path;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((value, index) => (
        <path
          key={index}
          d={getPath(value)}
          fill={colors[index % colors.length]}
          stroke="#fff"
          strokeWidth="2.5"
          style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
        />
      ))}
    </svg>
  );
};

const BarChart = ({ data, width = 600, height = 280 }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.targeted, d.reached)));
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const barWidth = chartWidth / (data.length * 2.5);
  const gap = barWidth * 0.3;

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#DFE7E1" strokeWidth="1.5" />
      
      {[0, 25, 50, 75, 100].map((val) => {
        const y = height - padding.bottom - (val / 100) * chartHeight;
        return (
          <g key={val}>
            <text x={padding.left - 10} y={y + 4} fontSize="8" fill="#9AA8A1" textAnchor="end" fontFamily="Inter">
              {Math.round((val / 100) * maxValue).toLocaleString()}
            </text>
            <line x1={padding.left - 5} y1={y} x2={padding.left} y2={y} stroke="#DFE7E1" strokeWidth="1" />
          </g>
        );
      })}

      {data.map((item, index) => {
        const x = padding.left + index * (barWidth * 2.5 + gap) + barWidth / 2;
        const reachedHeight = (item.reached / maxValue) * chartHeight;
        const targetedHeight = (item.targeted / maxValue) * chartHeight;

        return (
          <g key={index}>
            <rect
              x={x - barWidth}
              y={height - padding.bottom - targetedHeight}
              width={barWidth}
              height={targetedHeight}
              fill="#D1FAE5"
              rx="3"
            />
            <rect
              x={x}
              y={height - padding.bottom - reachedHeight}
              width={barWidth}
              height={reachedHeight}
              fill="#0F5138"
              rx="3"
              style={{ transition: 'height 0.8s ease' }}
            />
            <text
              x={x + barWidth / 2}
              y={height - padding.bottom + 15}
              fontSize="7"
              fill="#6D746F"
              textAnchor="middle"
              fontFamily="Inter"
              transform={`rotate(-45, ${x + barWidth / 2}, ${height - padding.bottom + 15})`}
            >
              {item.county}
            </text>
          </g>
        );
      })}

      <g transform={`translate(${width - 140}, 10)`}>
        <rect x="0" y="0" width="12" height="12" fill="#D1FAE5" rx="2" />
        <text x="16" y="10" fontSize="8" fill="#6D746F" fontFamily="Inter">Targeted</text>
        <rect x="0" y="18" width="12" height="12" fill="#0F5138" rx="2" />
        <text x="16" y="28" fontSize="8" fill="#6D746F" fontFamily="Inter">Reached</text>
      </g>
    </svg>
  );
};

const LineChart = ({ data, width = 600, height = 250 }) => {
  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...data.cumulative);

  const getPoint = (value, index) => {
    const x = padding.left + (index / (data.labels.length - 1)) * chartWidth;
    const y = height - padding.bottom - (value / maxValue) * chartHeight;
    return { x, y };
  };

  const getPath = (values) => {
    return values.map((v, i) => {
      const point = getPoint(v, i);
      return (i === 0 ? 'M' : 'L') + `${point.x},${point.y}`;
    }).join(' ');
  };

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#DFE7E1" strokeWidth="1.5" />
      
      {[0, 25, 50, 75, 100].map((val) => {
        const y = height - padding.bottom - (val / 100) * chartHeight;
        return (
          <g key={val}>
            <text x={padding.left - 10} y={y + 4} fontSize="8" fill="#9AA8A1" textAnchor="end" fontFamily="Inter">
              {Math.round((val / 100) * maxValue).toLocaleString()}
            </text>
            <line x1={padding.left - 5} y1={y} x2={padding.left} y2={y} stroke="#DFE7E1" strokeWidth="1" />
          </g>
        );
      })}

      <path d={getPath(data.cumulative)} fill="none" stroke="#0F5138" strokeWidth="3" />
      <path d={getPath(data.values)} fill="none" stroke="#14925E" strokeWidth="2.5" strokeDasharray="6,4" />

      {data.labels.map((label, index) => {
        const x = padding.left + (index / (data.labels.length - 1)) * chartWidth;
        return (
          <text key={index} x={x} y={height - padding.bottom + 15} fontSize="7" fill="#6D746F" textAnchor="middle" fontFamily="Inter">
            {label}
          </text>
        );
      })}

      <g transform={`translate(${width - 160}, 10)`}>
        <line x1="0" y1="5" x2="12" y2="5" stroke="#0F5138" strokeWidth="3" />
        <text x="16" y="8" fontSize="8" fill="#6D746F" fontFamily="Inter">Cumulative</text>
        <line x1="0" y1="18" x2="12" y2="18" stroke="#14925E" strokeWidth="2.5" strokeDasharray="6,4" />
        <text x="16" y="22" fontSize="8" fill="#6D746F" fontFamily="Inter">Quarterly</text>
      </g>
    </svg>
  );
};

const HorizontalBarChart = ({ data, width = 400 }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const padding = { top: 10, right: 10, bottom: 10, left: 110 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = data.length * 32 + 10;
  const barHeight = 18;

  return (
    <svg width={width} height={Math.max(chartHeight, 200)} style={{ overflow: 'visible' }}>
      {data.map((item, index) => {
        const y = padding.top + index * 32;
        const barWidth = (item.value / maxValue) * chartWidth;
        const percentage = (item.value / maxValue * 100).toFixed(1);
        
        return (
          <g key={index}>
            <text x={padding.left - 8} y={y + barHeight / 2 + 3} fontSize="7.5" fill="#6D746F" textAnchor="end" fontFamily="Inter" fontWeight="600">
              {item.name}
            </text>
            <rect 
              x={padding.left} 
              y={y} 
              width={barWidth} 
              height={barHeight} 
              fill={item.color || '#0F5138'} 
              rx="4"
              style={{ transition: 'width 1s ease' }}
            />
            <text x={padding.left + barWidth + 6} y={y + barHeight / 2 + 3} fontSize="7.5" fill="#0F5138" fontFamily="Inter" fontWeight="700">
              {item.value.toLocaleString()}
            </text>
            <text x={padding.left + barWidth + 50} y={y + barHeight / 2 + 3} fontSize="7" fill="#9AA8A1" fontFamily="Inter">
              ({percentage}%)
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const StackedBarChart = ({ data, groups, colors, width = 600, height = 280 }) => {
  const maxValue = Math.max(...data.map(d => groups.reduce((sum, g) => sum + (d[g] || 0), 0)));
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const barWidth = Math.min(40, chartWidth / data.length - 8);

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#DFE7E1" strokeWidth="1.5" />
      
      {[0, 25, 50, 75, 100].map((val) => {
        const y = height - padding.bottom - (val / 100) * chartHeight;
        return (
          <g key={val}>
            <text x={padding.left - 10} y={y + 4} fontSize="8" fill="#9AA8A1" textAnchor="end" fontFamily="Inter">
              {Math.round((val / 100) * maxValue).toLocaleString()}
            </text>
            <line x1={padding.left - 5} y1={y} x2={padding.left} y2={y} stroke="#DFE7E1" strokeWidth="1" />
          </g>
        );
      })}

      {data.map((item, index) => {
        const x = padding.left + index * (barWidth + 12) + (chartWidth - data.length * (barWidth + 12)) / 2;
        let yOffset = 0;

        return (
          <g key={index}>
            {groups.map((group, groupIndex) => {
              const value = item[group] || 0;
              const height = (value / maxValue) * chartHeight;
              const y = height - padding.bottom - yOffset - height;
              yOffset += height;

              return (
                <rect
                  key={groupIndex}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={height}
                  fill={colors[groupIndex % colors.length]}
                  rx="2"
                  style={{ transition: 'all 0.3s ease' }}
                />
              );
            })}
            <text
              x={x + barWidth / 2}
              y={height - padding.bottom + 15}
              fontSize="7"
              fill="#6D746F"
              textAnchor="middle"
              fontFamily="Inter"
              transform={`rotate(-45, ${x + barWidth / 2}, ${height - padding.bottom + 15})`}
            >
              {item.county}
            </text>
          </g>
        );
      })}

      <g transform={`translate(${width - 120}, 10)`}>
        {groups.map((group, index) => (
          <g key={index} transform={`translate(0, ${index * 18})`}>
            <rect x="0" y="2" width="10" height="10" fill={colors[index % colors.length]} rx="2" />
            <text x="14" y="10" fontSize="7.5" fill="#6D746F" fontFamily="Inter">{group}</text>
          </g>
        ))}
      </g>
    </svg>
  );
};

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function DashboardHome({ lang, onLangChange }) {
  const [chartWidth, setChartWidth] = useState(600);
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const updateChartDimensions = () => {
      if (chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.offsetWidth;
        setChartWidth(Math.min(containerWidth - 40, 800));
      }
    };
    
    updateChartDimensions();
    window.addEventListener('resize', updateChartDimensions);
    
    return () => {
      window.removeEventListener('resize', updateChartDimensions);
    };
  }, []);

  // Handle Generate Report
  const handleGenerateReport = () => {
    setShowReportGenerator(true);
  };

  const handleReportGenerated = (reportData) => {
    console.log('Report generated:', reportData);
    setShowReportGenerator(false);
    // You can add additional logic here like showing a success message
  };

  return (
    <>
      <DashboardLayout
        crumb="Dashboard"
        lang={lang}
        onLangChange={onLangChange}
      >
        <div className="dashboard-home">
          {/* Welcome Section */}
          <div className="welcome-section">
            <div className="welcome-content">
              <div>
                <h1 className="welcome-title">Welcome, Dennis</h1>
                <p className="welcome-subtitle">Here's what's happening with your FSRP today.</p>
              </div>
              <div className="welcome-actions">
                <button 
                  className="btn-welcome btn-welcome-primary"
                  onClick={handleGenerateReport}
                >
                  <span>📊</span> Generate Report
                </button>
                <button className="btn-welcome btn-welcome-secondary">
                  <span>📥</span> Export Data
                </button>
              </div>
            </div>
            <div className="welcome-stats-mini">
              <div className="mini-stat">
                <span className="mini-stat-label">Last updated</span>
                <span className="mini-stat-value">Today, 14:30</span>
              </div>
              <div className="mini-stat-divider"></div>
              <div className="mini-stat">
                <span className="mini-stat-label">Data source</span>
                <span className="mini-stat-value">Live</span>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="stats-grid">
            {STATISTICS.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-icon-wrapper" style={{ background: stat.bgColor }}>
                  <span className="stat-icon">{stat.icon}</span>
                </div>
                <div className="stat-content">
                  <span className="stat-label">{stat.label}</span>
                  <div className="stat-value-wrapper">
                    <strong className="stat-value">{stat.value}</strong>
                    <span className="stat-change">{stat.change}</span>
                  </div>
                  <span className="stat-note">{stat.note}</span>
                </div>
                <div className="stat-indicator" style={{ background: stat.color }}></div>
              </div>
            ))}
          </div>

          {/* Food System Nodes */}
          <div className="nodes-section">
            <div className="nodes-header">
              <div className="nodes-header-left">
                <strong>Beneficiaries across the food system</strong>
                <span>Actors reached by food-system node</span>
              </div>
              <button className="nodes-view-all">View All →</button>
            </div>
            <div className="nodes-grid-dashboard">
              {FOOD_SYSTEM_NODES.map((n) => (
                <div className="node-card-dashboard" key={n.name}>
                  <div className="node-icon-dashboard">{n.icon}</div>
                  <strong>{n.name}</strong>
                  <div className="node-value-dashboard">{n.value}</div>
                  <span>{n.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Charts Grid */}
          <div className="charts-grid" ref={chartContainerRef}>
            {/* Gender Distribution */}
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-header-left">
                  <strong>Gender Distribution</strong>
                  <span>Beneficiary composition</span>
                </div>
                <span className="chart-badge">Demographics</span>
              </div>
              <div className="chart-body">
                <div className="pie-chart-wrapper">
                  <PieChart 
                    data={GENDER_DATA.values} 
                    colors={GENDER_DATA.colors}
                    size={Math.min(180, chartWidth * 0.3)}
                  />
                  <div className="pie-legend">
                    {GENDER_DATA.labels.map((label, index) => (
                      <div key={index} className="legend-item">
                        <span className="legend-color" style={{ background: GENDER_DATA.colors[index] }}></span>
                        <span>{label}: <strong>{GENDER_DATA.values[index]}%</strong></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Age Group Distribution */}
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-header-left">
                  <strong>Age Group Distribution</strong>
                  <span>Beneficiary age breakdown</span>
                </div>
                <span className="chart-badge">Demographics</span>
              </div>
              <div className="chart-body">
                {[
                  { group: '0-18', percentage: 32, color: '#0F5138' },
                  { group: '19-35', percentage: 38, color: '#12704A' },
                  { group: '36-50', percentage: 20, color: '#14925E' },
                  { group: '51+', percentage: 10, color: '#1AAE71' },
                ].map((item) => (
                  <div key={item.group} className="age-bar">
                    <div className="age-bar-label">
                      <span>{item.group} years</span>
                      <span><strong>{item.percentage}%</strong></span>
                    </div>
                    <div className="age-bar-track">
                      <div className="age-bar-fill" style={{ width: `${item.percentage}%`, background: item.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Targeted vs Reached Bar Chart */}
          <div className="chart-card full-width">
            <div className="chart-card-header">
              <div className="chart-card-header-left">
                <strong>Targeted vs Reached Beneficiaries by County</strong>
                <span>County performance</span>
              </div>
              <span className="chart-badge">Performance</span>
            </div>
            <div className="chart-body bar-chart-wrapper">
              <BarChart 
                data={COUNTY_BENEFICIARY_DATA} 
                width={chartWidth}
              />
              <div className="chart-stats">
                <div className="chart-stat-item">
                  <span>Total Targeted</span>
                  <strong className="stat-target">{COUNTY_BENEFICIARY_DATA.reduce((sum, d) => sum + d.targeted, 0).toLocaleString()}</strong>
                </div>
                <div className="chart-stat-item">
                  <span>Total Reached</span>
                  <strong className="stat-reached">{COUNTY_BENEFICIARY_DATA.reduce((sum, d) => sum + d.reached, 0).toLocaleString()}</strong>
                </div>
                <div className="chart-stat-item">
                  <span>Overall Achievement</span>
                  <strong className="stat-achievement">{Math.round((COUNTY_BENEFICIARY_DATA.reduce((sum, d) => sum + d.reached, 0) / 
                    COUNTY_BENEFICIARY_DATA.reduce((sum, d) => sum + d.targeted, 0)) * 100)}%</strong>
                </div>
              </div>
            </div>
          </div>
          <p>
            &nbsp;
          </p>

          {/* Beneficiary Growth Line Chart */}
          <div className="chart-card full-width">
            <div className="chart-card-header">
              <div className="chart-card-header-left">
                <strong>Beneficiary Growth Per Quarter</strong>
                <span>Cumulative and quarterly growth</span>
              </div>
              <span className="chart-badge">Growth</span>
            </div>
            <div className="chart-body">
              <LineChart 
                data={QUARTERLY_GROWTH}
                width={chartWidth}
              />
            </div>
          </div>

          <p>
            &nbsp;
          </p>


          {/* Value Chain Distribution */}
          <div className="chart-card full-width">
            <div className="chart-card-header">
              <div className="chart-card-header-left">
                <strong>Beneficiaries per Value Chain</strong>
                <span>Distribution across agricultural value chains</span>
              </div>
              <span className="chart-badge">Value Chains</span>
            </div>
            <div className="chart-body">
              <HorizontalBarChart 
                data={VALUE_CHAIN_DATA}
                width={Math.min(chartWidth, 600)}
              />
            </div>
          </div>
        </div>

        <style>{`
          /* =========================================================
             DASHBOARD HOME - ELEGANT UI
          ========================================================= */

          .dashboard-home {
            padding: 20px 24px 32px;
            overflow: visible;
            background: var(--bg);
          }

          /* =========================================================
             WELCOME SECTION
          ========================================================= */

          .welcome-section {
            background: linear-gradient(135deg, #0F5138 0%, #12704A 50%, #14925E 100%);
            border-radius: var(--r-lg);
            padding: 28px 32px;
            margin-bottom: 28px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
            box-shadow: 0 8px 32px rgba(15, 81, 56, 0.25);
            position: relative;
            overflow: hidden;
          }

          .welcome-section::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 60%;
            height: 200%;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 50%;
            pointer-events: none;
          }

          .welcome-section::after {
            content: '';
            position: absolute;
            bottom: -40%;
            left: -10%;
            width: 40%;
            height: 150%;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 50%;
            pointer-events: none;
          }

          .welcome-content {
            display: flex;
            align-items: center;
            gap: 24px;
            flex-wrap: wrap;
            z-index: 1;
            flex: 1;
          }

          .welcome-title {
            font-family: "Sora", sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: white;
            margin: 0;
            line-height: 1.2;
          }

          .welcome-subtitle {
            color: rgba(255, 255, 255, 0.8);
            font-size: 11px;
            margin: 4px 0 0 0;
            font-weight: 400;
          }

          .welcome-actions {
            display: flex;
            gap: 10px;
            z-index: 1;
          }

          .btn-welcome {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 18px;
            border-radius: 100px;
            font-size: 9.5px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .btn-welcome-primary {
            background: white;
            color: #0F5138;
          }

          .btn-welcome-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(255, 255, 255, 0.3);
          }

          .btn-welcome-secondary {
            background: rgba(255, 255, 255, 0.15);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .btn-welcome-secondary:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
          }

          .welcome-stats-mini {
            display: flex;
            align-items: center;
            gap: 16px;
            z-index: 1;
            background: rgba(255, 255, 255, 0.08);
            padding: 8px 16px;
            border-radius: 100px;
            backdrop-filter: blur(10px);
          }

          .mini-stat {
            display: flex;
            flex-direction: column;
          }

          .mini-stat-label {
            font-size: 6.5px;
            color: rgba(255, 255, 255, 0.6);
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }

          .mini-stat-value {
            font-size: 9px;
            color: white;
            font-weight: 600;
          }

          .mini-stat-divider {
            width: 1px;
            height: 24px;
            background: rgba(255, 255, 255, 0.15);
          }

          /* =========================================================
             STATISTICS GRID
          ========================================================= */

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
          }

          .stat-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--r-md);
            padding: 18px 20px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
            border-color: var(--brand-200);
          }

          .stat-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--brand-600), var(--brand-400));
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .stat-card:hover::after {
            opacity: 1;
          }

          .stat-icon-wrapper {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: grid;
            place-items: center;
            margin-bottom: 10px;
            font-size: 20px;
          }

          .stat-content {
            flex: 1;
          }

          .stat-label {
            font-size: 7.5px;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-weight: 700;
          }

          .stat-value-wrapper {
            display: flex;
            align-items: baseline;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 4px;
          }

          .stat-value {
            font-size: 22px;
            font-family: "Sora", sans-serif;
            color: var(--brand-800);
            letter-spacing: -0.02em;
          }

          .stat-change {
            font-size: 7.5px;
            color: #059669;
            background: #ECFDF5;
            padding: 1px 8px;
            border-radius: 100px;
            font-weight: 700;
          }

          .stat-note {
            font-size: 6.5px;
            color: var(--muted);
            display: block;
            margin-top: 2px;
          }

          .stat-indicator {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            border-radius: 0 0 var(--r-md) var(--r-md);
            opacity: 0.3;
          }

          /* =========================================================
             NODES SECTION
          ========================================================= */

          .nodes-section {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--r-lg);
            margin-bottom: 24px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          }

          .nodes-header {
            padding: 16px 20px;
            border-bottom: 1px solid var(--border-soft);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .nodes-header-left strong {
            display: block;
            font-family: "Sora", sans-serif;
            font-size: 11px;
            color: var(--text);
          }

          .nodes-header-left span {
            display: block;
            margin-top: 2px;
            color: var(--muted);
            font-size: 7px;
          }

          .nodes-view-all {
            background: transparent;
            border: none;
            color: var(--brand-700);
            font-size: 8px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.15s ease;
            padding: 4px 12px;
            border-radius: 100px;
          }

          .nodes-view-all:hover {
            background: var(--brand-50);
          }

          .nodes-grid-dashboard {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 10px;
            padding: 16px 20px;
          }

          .node-card-dashboard {
            padding: 14px 12px;
            border: 1px solid var(--border);
            border-radius: var(--r-sm);
            background: var(--surface-2);
            text-align: center;
            transition: all 0.2s ease;
          }

          .node-card-dashboard:hover {
            background: var(--brand-50);
            border-color: var(--brand-100);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          }

          .node-icon-dashboard {
            width: 28px;
            height: 28px;
            display: grid;
            place-items: center;
            border-radius: 8px;
            background: white;
            font-size: 13px;
            margin: 0 auto 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          }

          .node-card-dashboard strong {
            display: block;
            font-size: 7px;
            color: var(--text);
            font-weight: 700;
          }

          .node-value-dashboard {
            margin-top: 4px;
            font-family: "Sora", sans-serif;
            font-size: 16px;
            font-weight: 800;
            color: var(--brand-800);
          }

          .node-card-dashboard span {
            display: block;
            margin-top: 3px;
            color: var(--muted);
            font-size: 5.5px;
            line-height: 1.3;
          }

          /* =========================================================
             CHARTS GRID
          ========================================================= */

          .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 16px;
            margin-bottom: 16px;
          }

          .chart-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--r-lg);
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
            transition: all 0.3s ease;
          }

          .chart-card:hover {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          }

          .chart-card.full-width {
            grid-column: 1 / -1;
          }

          .chart-card-header {
            padding: 14px 20px;
            border-bottom: 1px solid var(--border-soft);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .chart-card-header-left strong {
            display: block;
            font-family: "Sora", sans-serif;
            font-size: 11px;
            color: var(--text);
          }

          .chart-card-header-left span {
            display: block;
            margin-top: 2px;
            color: var(--muted);
            font-size: 7px;
          }

          .chart-badge {
            font-size: 6.5px;
            font-weight: 700;
            color: var(--brand-700);
            background: var(--brand-50);
            padding: 2px 10px;
            border-radius: 100px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .chart-body {
            padding: 20px;
            overflow: auto;
          }

          /* =========================================================
             CHART STATS
          ========================================================= */

          .chart-stats {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-top: 20px;
            padding-top: 16px;
            border-top: 1px solid var(--border-soft);
            flex-wrap: wrap;
          }

          .chart-stat-item {
            text-align: center;
          }

          .chart-stat-item span {
            display: block;
            font-size: 7px;
            color: var(--muted);
            font-weight: 500;
          }

          .chart-stat-item strong {
            display: block;
            font-size: 16px;
            font-family: "Sora", sans-serif;
            margin-top: 2px;
          }

          .stat-target {
            color: #6D746F;
          }

          .stat-reached {
            color: var(--brand-800);
          }

          .stat-achievement {
            color: #059669;
          }

          /* =========================================================
             PIE CHART
          ========================================================= */

          .pie-chart-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 32px;
            flex-wrap: wrap;
          }

          .pie-legend {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 9px;
            color: var(--ink-soft);
          }

          .legend-item strong {
            color: var(--brand-800);
          }

          .legend-color {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 4px;
            flex-shrink: 0;
          }

          /* =========================================================
             AGE BARS
          ========================================================= */

          .age-bar {
            margin-bottom: 12px;
          }

          .age-bar:last-child {
            margin-bottom: 0;
          }

          .age-bar-label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
            font-size: 9px;
            color: var(--ink-soft);
          }

          .age-bar-label strong {
            color: var(--brand-800);
          }

          .age-bar-track {
            height: 20px;
            background: var(--surface-2);
            border-radius: 100px;
            overflow: hidden;
          }

          .age-bar-fill {
            height: 100%;
            border-radius: 100px;
            transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          }

          /* =========================================================
             RESPONSIVE
          ========================================================= */

          @media (max-width: 1200px) {
            .nodes-grid-dashboard {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          @media (max-width: 992px) {
            .welcome-section {
              padding: 20px 24px;
            }
            .welcome-title {
              font-size: 20px;
            }
            .welcome-stats-mini {
              display: none;
            }
          }

          @media (max-width: 768px) {
            .dashboard-home {
              padding: 12px 14px 20px;
            }
            .stats-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            .charts-grid {
              grid-template-columns: 1fr;
            }
            .nodes-grid-dashboard {
              grid-template-columns: repeat(3, 1fr);
            }
            .welcome-content {
              flex-direction: column;
              align-items: flex-start;
            }
            .welcome-actions {
              width: 100%;
            }
            .btn-welcome {
              flex: 1;
              justify-content: center;
            }
          }

          @media (max-width: 480px) {
            .stats-grid {
              grid-template-columns: 1fr;
            }
            .nodes-grid-dashboard {
              grid-template-columns: repeat(2, 1fr);
            }
            .pie-chart-wrapper {
              flex-direction: column;
            }
            .chart-stats {
              gap: 16px;
            }
            .welcome-title {
              font-size: 18px;
            }
            .stat-value {
              font-size: 18px;
            }
          }

          /* =========================================================
             DARK MODE
          ========================================================= */

          .dark-mode .welcome-section {
            background: linear-gradient(135deg, #06231A 0%, #0B3A2A 50%, #0F5138 100%);
          }

          .dark-mode .stat-card {
            background: var(--surface);
          }

          .dark-mode .nodes-section {
            background: var(--surface);
          }

          .dark-mode .chart-card {
            background: var(--surface);
          }

          .dark-mode .node-card-dashboard {
            background: var(--surface-2);
          }

          .dark-mode .stat-change {
            background: rgba(5, 150, 105, 0.2);
          }

          .dark-mode .stat-icon-wrapper {
            background: rgba(255, 255, 255, 0.05) !important;
          }

          .dark-mode .btn-welcome-secondary {
            background: rgba(255, 255, 255, 0.08);
          }

          .dark-mode .btn-welcome-secondary:hover {
            background: rgba(255, 255, 255, 0.15);
          }

          .dark-mode .welcome-stats-mini {
            background: rgba(0, 0, 0, 0.2);
          }

          /* =========================================================
             HIGH CONTRAST
          ========================================================= */

          .high-contrast .stat-card {
            border: 2px solid #000;
          }

          .high-contrast .nodes-section {
            border: 2px solid #000;
          }

          .high-contrast .chart-card {
            border: 2px solid #000;
          }

          .high-contrast .stat-change {
            background: #000;
            color: #fff;
          }

          .high-contrast .stat-icon-wrapper {
            border: 1px solid #000;
          }

          /* =========================================================
             LARGE TEXT
          ========================================================= */

          .large-text .stat-value {
            font-size: 26px !important;
          }

          .large-text .node-value-dashboard {
            font-size: 20px !important;
          }

          .large-text .welcome-title {
            font-size: 28px !important;
          }

          .large-text .stat-label {
            font-size: 9px !important;
          }
        `}</style>
      </DashboardLayout>

      {/* Report Generator Modal */}
      {showReportGenerator && (
        <ReportGenerator 
          onClose={() => setShowReportGenerator(false)}
          onGenerate={handleReportGenerated}
        />
      )}
    </>
  );
}