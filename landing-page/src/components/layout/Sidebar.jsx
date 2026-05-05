import React from "react";
import { NavLink } from "react-router-dom";

const venueLinks = [
  ["/restaurants", "Restaurant"],
  ["/pub", "Pub"],
  ["/karaoke", "Karaoke"],
];

function Sidebar() {
  return (
    <aside className="sidebar panel">
      <h3>Browse venues</h3>
      <div className="sidebar-links">
        {venueLinks.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? "sidebar-nav-link sidebar-nav-link-active" : "sidebar-nav-link"
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
