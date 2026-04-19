import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

function HomePage() {
  const { restaurants, orders } = useApp();
  const openCount = restaurants.filter((item) => item.isOpen).length;
  const favoriteCount = restaurants.filter((item) => item.isFavorite).length;

  return (
    <section>
      <div className="hero panel">
        <div>
          <p className="eyebrow">Bon Delice</p>
          <h2>Find the right place for your next outing</h2>
          <p>
            Browse restaurants, save your favorite places, and manage your table reservations in one place.
          </p>
          <div className="action-row">
            <Link to="/restaurants" className="primary-btn">Browse restaurants</Link>
            <Link to="/orders" className="ghost-btn inline-btn">My reservations</Link>
          </div>
        </div>
        <img src="/assets/img/banner.png" alt="Dining and venue banner" className="hero-image" />
      </div>

      <div className="stats-grid">
        <div className="panel"><h3>{restaurants.length}</h3><p>Places available</p></div>
        <div className="panel"><h3>{openCount}</h3><p>Open now</p></div>
        <div className="panel"><h3>{favoriteCount}</h3><p>Saved places</p></div>
        <div className="panel"><h3>{orders.length}</h3><p>Reservations</p></div>
      </div>
    </section>
  );
}

export default HomePage;
