import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  ["/home", "Home"],
  ["/restaurants", "Restaurants"],
  ["/favorites", "Favorites"],
  ["/orders", "Orders"],
];

function Navbar() {
  return (
    <nav className="navbar">
      {links.map(([to, label]) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
