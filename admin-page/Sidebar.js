import NavItem from "./NavItem";

const NAV_ITEMS = [
  { id: "dashboard",    icon: "📊", text: "Dashboard"  },
  { id: "reservations", icon: "📅", text: "Захиалга"   },
  { id: "reviews",      icon: "⭐", text: "Сэтгэгдэл"  },
  { id: "users",        icon: "👤", text: "Хэрэглэгч"  },
  // Ресторан болон Тохиргоо цэс устгагдсан
];

function Sidebar({ currentPage, onNavigate }) {
  return (
    <div className="sidebar">
      <div>
        <div className="sidebar__title">Цэс</div>
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.id}
            icon={item.icon}
            text={item.text}
            active={currentPage === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </div>

      <div className="sidebar__footer">
        <div className="mini">
          <span className="mini__k">Захиалга</span>
          <span className="mini__v">86</span>
        </div>
        <div className="mini">
          <span className="mini__k">Орлого</span>
          <span className="mini__v">₮2.4M</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;