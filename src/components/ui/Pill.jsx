const POSITIVE = new Set(["Active", "Verified", "Published", "Adopted", "Delivered"]);
const WARN = new Set(["Review", "Draft"]);

export default function Pill({ status }) {
  let cls = "pill-gray";
  if (POSITIVE.has(status)) cls = "pill-green";
  else if (WARN.has(status)) cls = "pill-orange";

  return <span className={`pill ${cls}`}>{status}</span>;
}
