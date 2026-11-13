import { useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import MetricGrid from "../../components/ui/MetricGrid.jsx";
import FilterBar from "../../components/ui/FilterBar.jsx";
import DataTable from "../../components/ui/DataTable.jsx";
import DetailsPanel from "../../components/ui/DetailsPanel.jsx";
import Modal from "../../components/ui/Modal.jsx";
import Pill from "../../components/ui/Pill.jsx";
import {
  beneficiaries as initialBeneficiaries,
  foodSystemNodes,
  beneficiaryComposition,
  reachTrend,
  beneficiaryActivity,
  actorTypeOptions,
  foodNodeOptions,
  genderOptions,
  ageOptions,
  statusOptions,
} from "../../data/beneficiaries.js";
import { counties } from "../../data/counties.js";
import LineChart from "../../components/ui/LineChart.jsx";

const VIEW_TABS = [
  "▤ Overview",
  "☷ All Beneficiaries",
  "👤 Individuals",
  "👥 Organizations",
  "🌱 Adoption",
  "📍 Geography",
  "📊 Analytics",
];

const ACTOR_FILTERS = [
  { label: "All actors", value: "" },
  { label: "Producers", value: "Producer" },
  { label: "Organizations", value: "Cooperative" },
  { label: "Service providers", value: "Service Provider" },
  { label: "Market actors", value: "Market Actor" },
];

const columns = [
  { key: "name", label: "Beneficiary", width: "minmax(220px,1.8fr)" },
  { key: "actor", label: "Actor Type", width: "140px" },
  { key: "node", label: "Food Node", width: "130px" },
  { key: "county", label: "County", width: "110px" },
  { key: "intervention", label: "Intervention", width: "minmax(160px,1.4fr)" },
  { key: "status", label: "Status", width: "100px" },
  { key: "updated", label: "Updated", width: "80px" },
];

export default function BeneficiariesPage({ lang, onLangChange }) {
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);
  const [activeTab, setActiveTab] = useState(VIEW_TABS[0]);
  const [actorFilter, setActorFilter] = useState("");
  const [countyFilter, setCountyFilter] = useState("");
  const [nodeFilter, setNodeFilter] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("profile");
  const [editDraft, setEditDraft] = useState(null);

  const filtered = useMemo(() => {
    return beneficiaries.filter((b) => {
      if (actorFilter && !b.actor.includes(actorFilter.split(" ")[0]) && b.actor !== actorFilter) {
        // loose match against actor label keywords (Producer, Cooperative, etc.)
        if (!b.actor.toLowerCase().includes(actorFilter.toLowerCase().split(" ")[0])) {
          return false;
        }
      }
      if (countyFilter && b.county !== countyFilter) return false;
      if (nodeFilter && b.node !== nodeFilter) return false;
      return true;
    });
  }, [beneficiaries, actorFilter, countyFilter, nodeFilter]);

  const selected = beneficiaries.find((b) => b.id === selectedId) || null;

  function openBeneficiary(id) {
    setSelectedId(id);
  }

  function closeDetails() {
    setSelectedId(null);
    setModalOpen(false);
  }

  function openFullProfile() {
    setModalTab("profile");
    setModalOpen(true);
  }

  function startEdit() {
    setEditDraft({ ...selected });
    setModalTab("edit");
    setModalOpen(true);
  }

  function saveEdit() {
    setBeneficiaries((prev) =>
      prev.map((b) => (b.id === editDraft.id ? { ...editDraft } : b))
    );
    setModalOpen(false);
  }

  const metrics = [
    { icon: "👥", label: "Food-system actors reached", value: "64.2K", positive: "+8.4%", note: "reporting period" },
    { icon: "🌱", label: "Technology adopters", value: "18.7K", note: "Verified adoption records" },
    { icon: "♀", label: "Women reached", value: "31.5K", note: "Across project interventions" },
    { icon: "◉", label: "Youth reached", value: "21.8K", note: "Youth beneficiaries" },
  ];

  return (
    <DashboardLayout
      crumb="Beneficiaries"
      lang={lang}
      onLangChange={onLangChange}
      detailsOpen={!!selected}
      detailsPanel={
        selected && (
          <DetailsPanel
            label="Beneficiary"
            reference={selected.reference}
            initials={selected.initials}
            name={selected.name}
            subtitle={selected.actor}
            pills={[selected.status, selected.node]}
            properties={[
              { label: "County", value: selected.county },
              { label: "Sub-county", value: selected.subcounty },
              { label: "Gender", value: selected.gender },
              { label: "Age category", value: selected.age },
              { label: "Organization", value: selected.organization },
              { label: "Value chain", value: selected.valueChain },
            ]}
            exposureCards={[
              { label: "Technologies accessed", value: selected.technologies },
              { label: "Technologies adopted", value: selected.adopted },
              { label: "Advisories received", value: selected.advisories },
              { label: "Services accessed", value: selected.services },
            ]}
            bodyLabel="Current intervention"
            bodyText={selected.intervention}
            activity={beneficiaryActivity}
            onClose={closeDetails}
            onEdit={startEdit}
            onOpenFull={openFullProfile}
          />
        )
      }
    >
      <PageHeader
        icon="👥"
        title="Beneficiaries"
        description="Track all actors reached across the FSRP food-system value chain."
        actions={
          <>
            <button className="btn btn-secondary" type="button">Import</button>
            <button className="btn btn-secondary" type="button">Export</button>
            <button className="btn btn-primary" type="button">＋ Add beneficiary</button>
          </>
        }
        tabs={VIEW_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="content">
        <MetricGrid metrics={metrics} />

        <section className="nodes-card">
          <div className="card-header">
            <div className="card-title">
              <strong>Beneficiaries across the food system</strong>
              <span>Actors reached by food-system node</span>
            </div>
          </div>

          <div className="nodes-grid">
            {foodSystemNodes.map((n) => (
              <div className="node-card" key={n.name}>
                <div className="node-icon">{n.icon}</div>
                <strong>{n.name}</strong>
                <div className="node-value">{n.value}</div>
                <span>{n.note}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="dashboard-grid">
          <section className="card">
            <div className="card-header">
              <div className="card-title">
                <strong>Beneficiary reach trend</strong>
                <span>Cumulative food-system actors reached</span>
              </div>
            </div>
            <div className="card-body">
              <div className="chart-holder">
                <LineChart data={reachTrend} />
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <div className="card-title">
                <strong>Beneficiary composition</strong>
                <span>Key demographic categories</span>
              </div>
            </div>
            <div className="card-body">
              <div className="breakdown-list">
                {beneficiaryComposition.map((row) => (
                  <div className="breakdown-row" key={row.label}>
                    <div className="breakdown-icon">{row.icon}</div>
                    <div className="breakdown-meta">
                      <strong>{row.label}</strong>
                      <span>{row.note}</span>
                    </div>
                    <div className="breakdown-value">{row.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <FilterBar
          buttons={ACTOR_FILTERS}
          activeButton={actorFilter}
          onButtonChange={setActorFilter}
          selects={[
            {
              id: "countyFilter",
              label: "County",
              placeholder: "All counties",
              value: countyFilter,
              onChange: setCountyFilter,
              options: counties.slice(0, 10),
            },
            {
              id: "nodeFilter",
              label: "Food node",
              placeholder: "All nodes",
              value: nodeFilter,
              onChange: setNodeFilter,
              options: foodNodeOptions,
            },
          ]}
        />

        <DataTable
          title="Beneficiary Records"
          count={filtered.length}
          columns={columns}
          rows={filtered}
          selectedId={selectedId}
          onSelectRow={openBeneficiary}
          renderCell={(row, key) => {
            if (key === "name") {
              return (
                <div className="beneficiary-main">
                  <div className="beneficiary-avatar">{row.initials}</div>
                  <div className="beneficiary-name">
                    <strong>{row.name}</strong>
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

      {selected && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          initials={selected.initials}
          title={selected.name}
          subtitle={selected.reference}
          tabs={[
            { id: "profile", label: "Profile" },
            { id: "participation", label: "Participation" },
            { id: "edit", label: "Edit" },
          ]}
          activeTab={modalTab}
          onTabChange={(id) => {
            setModalTab(id);
            if (id === "edit") setEditDraft({ ...selected });
          }}
          footerNote="Changes should be verified before contributing to FSRP reporting."
          showSave={modalTab === "edit"}
          onSave={saveEdit}
        >
          {modalTab === "profile" && (
            <div className="modal-panel active">
              <div className="modal-section">
                <div className="modal-section-title">
                  <strong>Profile</strong>
                  <span>Beneficiary information</span>
                </div>
                <div className="properties">
                  {[
                    ["County", selected.county],
                    ["Sub-county", selected.subcounty],
                    ["Gender", selected.gender],
                    ["Age category", selected.age],
                    ["Organization", selected.organization],
                    ["Value chain", selected.valueChain],
                  ].map(([label, value]) => (
                    <div className="property" key={label}>
                      <div className="property-label">{label}</div>
                      <div className="property-value">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {modalTab === "participation" && (
            <div className="modal-panel active">
              <div className="modal-section">
                <div className="modal-section-title">
                  <strong>Technologies and services</strong>
                  <span>FSRP participation history</span>
                </div>
                <table className="participation-table">
                  <thead>
                    <tr>
                      <th>Intervention</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selected.intervention}</td>
                      <td>Technology</td>
                      <td><span className="pill pill-green">Adopted</span></td>
                      <td>Aug 2026</td>
                    </tr>
                    <tr>
                      <td>Seasonal rainfall advisory</td>
                      <td>Advisory</td>
                      <td><span className="pill pill-green">Delivered</span></td>
                      <td>Aug 2026</td>
                    </tr>
                    <tr>
                      <td>Mechanization support</td>
                      <td>Service</td>
                      <td><span className="pill pill-gray">Accessed</span></td>
                      <td>Jul 2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {modalTab === "edit" && editDraft && (
            <div className="modal-panel active">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="modal-section">
                  <div className="modal-section-title">
                    <strong>Edit beneficiary profile</strong>
                    <span>Update profile information</span>
                  </div>

                  <div className="edit-form-grid">
                    <div className="form-group">
                      <label className="form-label">Name / Organization</label>
                      <input
                        className="form-control"
                        value={editDraft.name}
                        onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Actor type</label>
                      <select
                        className="form-control"
                        value={editDraft.actor}
                        onChange={(e) => setEditDraft({ ...editDraft, actor: e.target.value })}
                      >
                        {actorTypeOptions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Food-system node</label>
                      <select
                        className="form-control"
                        value={editDraft.node}
                        onChange={(e) => setEditDraft({ ...editDraft, node: e.target.value })}
                      >
                        {foodNodeOptions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">County</label>
                      <select
                        className="form-control"
                        value={editDraft.county}
                        onChange={(e) => setEditDraft({ ...editDraft, county: e.target.value })}
                      >
                        {counties.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Sub-county</label>
                      <input
                        className="form-control"
                        value={editDraft.subcounty}
                        onChange={(e) => setEditDraft({ ...editDraft, subcounty: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-control"
                        value={editDraft.gender}
                        onChange={(e) => setEditDraft({ ...editDraft, gender: e.target.value })}
                      >
                        {genderOptions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Age category</label>
                      <select
                        className="form-control"
                        value={editDraft.age}
                        onChange={(e) => setEditDraft({ ...editDraft, age: e.target.value })}
                      >
                        {ageOptions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Organization</label>
                      <input
                        className="form-control"
                        value={editDraft.organization}
                        onChange={(e) => setEditDraft({ ...editDraft, organization: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Value chain</label>
                      <input
                        className="form-control"
                        value={editDraft.valueChain}
                        onChange={(e) => setEditDraft({ ...editDraft, valueChain: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <select
                        className="form-control"
                        value={editDraft.status}
                        onChange={(e) => setEditDraft({ ...editDraft, status: e.target.value })}
                      >
                        {statusOptions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group full">
                      <label className="form-label">Current intervention</label>
                      <textarea
                        className="form-control"
                        value={editDraft.intervention}
                        onChange={(e) => setEditDraft({ ...editDraft, intervention: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </Modal>
      )}
    </DashboardLayout>
  );
}
