import React from "react";

function VenuePlaceholderPage({ title, description }) {
  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Coming soon</p>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="panel empty-state">
        <p>{description}</p>
      </div>
    </section>
  );
}

export default VenuePlaceholderPage;
