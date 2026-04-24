function Topbar({ currentLabel }) {
  return (
    <div className="topbar">
      <div className="topbar__left">
        <div className="brandmark">
          <div className="brandmark__dot"></div>
          AdminPanel
        </div>
        <div className="crumb">
          <span>Нүүр</span>
          <span className="crumb__sep">/</span>
          <span className="crumb__strong">{currentLabel}</span>
        </div>
      </div>

      <div className="topbar__center">
        <div className="search">
          <input className="search__input" placeholder="Хайх..." />
          <button className="search__btn">🔍</button>
        </div>
      </div>

      <div className="topbar__right">
        <div className="icon-btn">🔔</div>
        <div className="avatar">
          <span className="avatar__txt">А</span>
        </div>
      </div>
    </div>
  );
}

export default Topbar;