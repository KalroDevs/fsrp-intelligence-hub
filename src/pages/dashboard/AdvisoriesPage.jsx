import { useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import MetricGrid from "../../components/ui/MetricGrid.jsx";
import FilterBar from "../../components/ui/FilterBar.jsx";
import DataTable from "../../components/ui/DataTable.jsx";
import DetailsPanel from "../../components/ui/DetailsPanel.jsx";
import Pill from "../../components/ui/Pill.jsx";
import { advisories, advisoryCategories } from "../../data/advisories.js";
import { counties } from "../../data/counties.js";

const columns = [
  { key: "title", label: "Advisory", width: "minmax(240px,1.8fr)" },
  { key: "category", label: "Category", width: "140px" },
  { key: "county", label: "County", width: "110px" },
  { key: "season", label: "Season", width: "90px" },
  { key: "status", label: "Status", width: "100px" },
  { key: "publishedDate", label: "Published", width: "100px" },
];

export default function AdvisoriesPage({ lang, onLangChange }) {
  const [category, setCategory] = useState("");
  const [county, setCounty] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(
    () =>
      advisories.filter((a) => {
        if (category && a.category !== category) return false;
        if (county && a.county !== county) return false;
        return true;
      }),
    [category, county]
  );

  const selected = advisories.find((a) => a.id === selectedId) || null;

  const metrics = [
    { icon: "☀", label: "Published advisories", value: advisories.filter((a) => a.status === "Published").length, note: "This season" },
    { icon: "📨", label: "Messages sent", value: advisories.reduce((s, a) => s + a.sent, 0).toLocaleString(), note: "Across all channels" },
    { icon: "✅", label: "Delivered", value: advisories.reduce((s, a) => s + a.delivered, 0).toLocaleString(), note: "Confirmed delivery" },
    { icon: "💬", label: "Feedback received", value: advisories.reduce((s, a) => s + a.feedback, 0).toLocaleString(), note: "Farmer responses" },
  ];

  return (
    <DashboardLayout
      crumb="Advisories"
      lang={lang}
      onLangChange={onLangChange}
      detailsOpen={!!selected}
      detailsPanel={
        selected && (
          <DetailsPanel
            label="Advisory"
            reference={selected.reference}
            initials={selected.icon}
            name={selected.title}
            subtitle={selected.category}
            pills={[selected.status, selected.season]}
            properties={[
              { label: "County", value: selected.county },
              { label: "Reporting year", value: selected.year },
              { label: "Published", value: selected.publishedDate },
              { label: "Channels", value: selected.channels.join(", ") },
            ]}
            exposureCards={[
              { label: "Reach", value: selected.reach.toLocaleString() },
              { label: "Sent", value: selected.sent.toLocaleString() },
              { label: "Delivered", value: selected.delivered.toLocaleString() },
              { label: "Feedback", value: selected.feedback.toLocaleString() },
            ]}
            bodyLabel="Summary"
            bodyText={selected.summary}
            onClose={() => setSelectedId(null)}
            onEdit={() => {}}
            onOpenFull={() => {}}
          />
        )
      }
    >
      <PageHeader
        icon="☀"
        title="Advisories"
        description="Weather, production and market advisories delivered to FSRP beneficiaries."
        actions={
          <>
            <button className="btn btn-secondary" type="button">Export</button>
            <button className="btn btn-primary" type="button">＋ New advisory</button>
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
              options: advisoryCategories,
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
          title="Advisory Records"
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
            if (key === "status") return <Pill status={row.status} />;
            return row[key];
          }}
        />
      </div>
    </DashboardLayout>
  );
}
