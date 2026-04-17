import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

function Header() {
  const { restaurants } = useApp();
  const openNow = restaurants.filter((item) => item.isOpen).length;

  return (
    <header className="header">
      <div>
        <Link to="/home" className="brand">Bon Delice</Link>
        <p className="subtitle">Restaurant, pub and karaoke reservations</p>
      </div>
      <div className="header-badge">Open now: {openNow}</div>
    </header>
  );
}

export default Header;
