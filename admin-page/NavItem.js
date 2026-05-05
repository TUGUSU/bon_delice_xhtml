function NavItem({ icon, text, active, onClick }) {
  return (
    <div
      className={`navitem ${active ? "active" : ""}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <span style={{ fontSize: "1.1rem" }}>{icon}</span>
      <span className="navitem__tx">{text}</span>
    </div>
  );
}

export default NavItem;