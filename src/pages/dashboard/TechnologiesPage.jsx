import { useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import MetricGrid from "../../components/ui/MetricGrid.jsx";
import FilterBar from "../../components/ui/FilterBar.jsx";
import DataTable from "../../components/ui/DataTable.jsx";
import DetailsPanel from "../../components/ui/DetailsPanel.jsx";
import Pill from "../../components/ui/Pill.jsx";
import { technologies, technologyCategories } from "../../data/technologies.js";
import { counties } from "../../data/counties.js";

const columns = [
  { key: "title", label: "Technology", width: "minmax(240px,1.8fr)" },
  { key: "category", label: "Category", width: "150px" },
  { key: "institution", label: "Institution", width: "110px" },
  { key: "county", label: "County", width: "110px" },
  { key: "validation", label: "Validation", width: "110px" },
  { key: "scaling", label: "Scaling", width: "100px" },
];

export default function TechnologiesPage({ lang, onLangChange }) {
  const [category, setCategory] = useState("");
  const [county, setCounty] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(
    () =>
      technologies.filter((t) => {
        if (category && t.category !== category) return false;
        if (county && t.county !== county) return false;
        return true;
      }),
    [category, county]
  );

  const selected = technologies.find((t) => t.id === selectedId) || null;

  const metrics = [
    { icon: "🌱", label: "Validated technologies", value: technologies.length, note: "Reported this cycle" },
    { icon: "📍", label: "Counties covered", value: new Set(technologies.map((t) => t.county)).size, note: "Active demonstration sites" },
    { icon: "👥", label: "Farmers reached", value: technologies.reduce((s, t) => s + t.reach, 0).toLocaleString(), note: "Cumulative reach" },
    { icon: "✅", label: "Verified adopters", value: technologies.reduce((s, t) => s + t.adopters, 0).toLocaleString(), note: "Adoption confirmed" },
  ];

  return (
    <DashboardLayout
      crumb="Technologies"
      lang={lang}
      onLangChange={onLangChange}
      detailsOpen={!!selected}
      detailsPanel={
        selected && (
          <DetailsPanel
            label="Technology"
            reference={selected.reference}
            initials={selected.icon}
            name={selected.title}
            subtitle={selected.category}
            pills={[selected.validation, selected.scaling]}
            properties={[
              { label: "Institution", value: selected.institution },
              { label: "County", value: selected.county },
              { label: "Reporting year", value: selected.year },
              { label: "Reach", value: selected.reach.toLocaleString() },
              { label: "Adopters", value: selected.adopters.toLocaleString() },
            ]}
            exposureCards={[
              { label: "Reach", value: selected.reach.toLocaleString() },
              { label: "Adopters", value: selected.adopters.toLocaleString() },
            ]}
            bodyLabel="Benefits"
            bodyText={selected.benefits}
            onClose={() => setSelectedId(null)}
            onEdit={() => {}}
            onOpenFull={() => {}}
          />
        )
      }
    >
      <PageHeader
        icon="🌱"
        title="Technologies"
        description="Validated resilience-enhancing technologies and practices across FSRP counties."
        actions={
          <>
            <button className="btn btn-secondary" type="button">Export</button>
            <button className="btn btn-primary" type="button">＋ Add technology</button>
          </>
        }
      />

      <div className="content">
        <MetricGrid metrics={metrics} />

        <FilterBar
          selects={[
            {
              id: "categoryFilter",
              label: "Category",
              placeholder: "All categories",
              value: category,
              onChange: setCategory,
              options: technologyCategories,
            },
            {
              id: "countyFilter",
              label: "County",
              placeholder: "All counties",
              value: county,
              onChange: setCounty,
              options: counties.slice(0, 10),
            },
          ]}
        />

        <DataTable
          title="Technology Records"
          count={filtered.length}
          columns={columns}
          rows={filtered}
          selectedId={selectedId}
          onSelectRow={setSelectedId}
          renderCell={(row, key) => {
            if (key === "title") {
              return (
                <div className="beneficiary-main">
                  <div className="beneficiary-avatar">{row.icon}</div>
                  <div className="beneficiary-name">
                    <strong>{row.title}</strong>
                    <span>{row.reference}</span>
                  </div>
                </div>
              );
            }
            if (key === "validation") return <Pill status={row.validation} />;
            return row[key];
          }}
        />
      </div>
    </DashboardLayout>
  );
}
