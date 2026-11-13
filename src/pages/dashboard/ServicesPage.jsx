import { useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import MetricGrid from "../../components/ui/MetricGrid.jsx";
import FilterBar from "../../components/ui/FilterBar.jsx";
import DataTable from "../../components/ui/DataTable.jsx";
import DetailsPanel from "../../components/ui/DetailsPanel.jsx";
import Pill from "../../components/ui/Pill.jsx";
import { services, serviceCategories } from "../../data/services.js";
import { counties } from "../../data/counties.js";

const columns = [
  { key: "title", label: "Service", width: "minmax(240px,1.8fr)" },
  { key: "category", label: "Category", width: "150px" },
  { key: "provider", label: "Provider", width: "120px" },
  { key: "county", label: "County", width: "110px" },
  { key: "delivery", label: "Delivery", width: "100px" },
  { key: "status", label: "Status", width: "100px" },
];

export default function ServicesPage({ lang, onLangChange }) {
  const [category, setCategory] = useState("");
  const [county, setCounty] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(
    () =>
      services.filter((s) => {
        if (category && s.category !== category) return false;
        if (county && s.county !== county) return false;
        return true;
      }),
    [category, county]
  );

  const selected = services.find((s) => s.id === selectedId) || null;

  const metrics = [
    { icon: "🤝", label: "Active services", value: services.length, note: "Currently in delivery" },
    { icon: "📩", label: "Requests fulfilled", value: services.reduce((s, x) => s + x.fulfilled, 0).toLocaleString(), note: "This reporting period" },
    { icon: "👥", label: "Beneficiaries served", value: services.reduce((s, x) => s + x.beneficiaries, 0).toLocaleString(), note: "Cumulative" },
    { icon: "⭐", label: "Average rating", value: (services.reduce((s, x) => s + x.rating, 0) / services.length).toFixed(1), note: "Out of 5" },
  ];

  return (
    <DashboardLayout
      crumb="Services"
      lang={lang}
      onLangChange={onLangChange}
      detailsOpen={!!selected}
      detailsPanel={
        selected && (
          <DetailsPanel
            label="Service"
            reference={selected.reference}
            initials={selected.icon}
            name={selected.title}
            subtitle={selected.category}
            pills={[selected.status, selected.delivery]}
            properties={[
              { label: "Provider", value: selected.provider },
              { label: "County", value: selected.county },
              { label: "Cost", value: selected.cost },
              { label: "Rating", value: `${selected.rating} / 5` },
            ]}
            exposureCards={[
              { label: "Requests", value: selected.requests.toLocaleString() },
              { label: "Fulfilled", value: selected.fulfilled.toLocaleString() },
              { label: "Beneficiaries", value: selected.beneficiaries.toLocaleString() },
            ]}
            bodyLabel="Description"
            bodyText={selected.description}
            onClose={() => setSelectedId(null)}
            onEdit={() => {}}
            onOpenFull={() => {}}
          />
        )
      }
    >
      <PageHeader
        icon="🤝"
        title="Services & Providers"
        description="Public and private food-system services available to FSRP beneficiaries."
        actions={
          <>
            <button className="btn btn-secondary" type="button">Export</button>
            <button className="btn btn-primary" type="button">＋ Add service</button>
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
              options: serviceCategories,
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
          title="Service Records"
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
