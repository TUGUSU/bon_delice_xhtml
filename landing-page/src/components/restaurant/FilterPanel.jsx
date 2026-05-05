import React from "react";

function FilterPanel({ filters, onChange, onReset }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Шүүлтүүр</h3>
        <button type="button" className="ghost-btn" onClick={onReset}>
          reset
        </button>
      </div>

      <div className="filter-grid">
        <label>
          Хайлт
          <input
            type="text"
            value={filters.query}
            placeholder="Restaurant name..."
            onChange={(event) => onChange("query", event.target.value)}
          />
        </label>

        <label>
          Категори
          <select
            value={filters.category}
            onChange={(event) => onChange("category", event.target.value)}
          >
            <option value="">All</option>
            <option value="korean">Korean</option>
            <option value="italian">Italian</option>
            <option value="chinese">Chinese</option>
            <option value="mongolian">Mongolian</option>
            <option value="europe">Europe</option>
          </select>
        </label>

        <label>
          Min rating
          <select
            value={filters.minRating}
            onChange={(event) => onChange("minRating", Number(event.target.value))}
          >
            <option value={0}>Any</option>
            <option value={4}>4.0+</option>
            <option value={4.5}>4.5+</option>
          </select>
        </label>

        <label>
          Төлөв
          <select
            value={filters.open}
            onChange={(event) => onChange("open", event.target.value)}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default FilterPanel;
