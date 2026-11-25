import { useState } from "react";

const features = [
  { icon: "🩺", title: "Health Records", category: "care", description: "Access vaccination and health information before making an adoption decision." },
  { icon: "✓", title: "Verified Listings", category: "trust", description: "Verified shelters and owners help create a safer adoption environment." },
  { icon: "💬", title: "Real-Time Chat", category: "connections", description: "Communicate directly with shelters and owners during the adoption process." },
  { icon: "⭐", title: "Smart Matching", category: "connections", description: "Get pet recommendations based on your preferences and lifestyle." },
];
const filters = [["all", "All features"], ["care", "Care"], ["trust", "Trust & safety"], ["connections", "Connections"]];

export default function FeatureCards() {
  const [active, setActive] = useState("all");
  const shown = active === "all" ? features : features.filter((feature) => feature.category === active);
  return (
    <>
      <div className="feature-filters" role="group" aria-label="Filter features">
        {filters.map(([id, label]) => <button key={id} type="button" className={`feature-filter${active === id ? " active" : ""}`} aria-pressed={active === id} onClick={() => setActive(id)}>{label}</button>)}
      </div>
      <div className="features-grid" aria-live="polite">
        {shown.map((feature) => <article className="feature reveal visible" key={feature.title}><div aria-hidden="true">{feature.icon}</div><h3>{feature.title}</h3><p>{feature.description}</p></article>)}
      </div>
    </>
  );
}
