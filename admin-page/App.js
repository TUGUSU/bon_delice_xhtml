import { useState } from "react";
import "./admin.css";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import ReservationTable from "./components/ReservationTable";
import ReviewItem from "./components/ReviewItem";


function KPICard({ title, value, label, hint, icon }) {
  return (
    <div className="card">
      <div className="card__top">
        <span className="chip">{icon} {title}</span>
      </div>
      <div className="card__num">{value}</div>
      <div className="card__label">{label}</div>
      <div className="card__hint">{hint}</div>
    </div>
  );
}

function Panel({ title, sub, children }) {
  return (
    <div className="panel">
      <div className="panel__head">
        <div>
          <div className="panel__title">{title}</div>
          {sub && <div className="panel__sub">{sub}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}


function QuickForm() {
  const [form, setForm] = useState({ name: "", time: "", guests: "2" });
  const [saved, setSaved] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.time) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
    setForm({ name: "", time: "", guests: "2" });
  };

  return (
    <div className="form">
      <div className="field">
        <label>Захиалагчийн нэр</label>
        <input
          className="input"
          placeholder="Нэр оруулах..."
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="form__row">
        <div className="field">
          <label>Цаг</label>
          <input
            className="input"
            type="time"
            value={form.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Хүний тоо</label>
          <select
            className="select"
            value={form.guests}
            onChange={e => setForm({ ...form, guests: e.target.value })}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <option key={n} value={n}>{n} хүн</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form__actions">
        <button className="btn-primary" onClick={handleSubmit}>
          {saved ? "✓ Хадгалагдлаа!" : "Захиалга нэмэх"}
        </button>
      </div>
    </div>
  );
}


const REVIEWS = [
  { id: 1, title: "Хоол маш амттай байсан", user: "Enkhjin", date: "2026/04/10", rating: 5 },
  { id: 2, title: "Үйлчилгээ маш сайн байсан", user: "Batmunkh", date: "2026/04/11", rating: 4 },
  { id: 3, title: "Хоол хүйтэн байсан", user: "Sarnai", date: "2026/04/12", rating: 2 },
  { id: 4, title: "Орчин тохитой байсан", user: "Gantulga", date: "2026/04/13", rating: 5 },
  { id: 5, title: "Хоосон хүлээлгэсэн", user: "Tuya", date: "2026/04/14", rating: 3 },
];


function DashboardPage() {
  return (
    <>
      <div className="kpi">
        <KPICard title="Өнөөдөр"   value="86"     label="Захиалга"      hint="+12% өчигдрөөс" icon="📈" />
        <KPICard title="Realtime"  value="1,240"  label="Хэрэглэгч"     hint="Peak: 1,410"    icon="👥" />
        <KPICard title="Орлого"    value="₮2.4M"  label="Өнөөдрийн"     hint="+8%"            icon="💰" />
        <KPICard title="Сэтгэгдэл" value="4.8★"   label="Дундаж оноо"   hint="128 сэтгэгдэл"  icon="⭐" />
      </div>

      <div className="grid2">
        <Panel title="Сүүлийн захиалгууд" sub="Өнөөдрийн захиалгуудын жагсаалт">
          <ReservationTable />
        </Panel>
        <Panel title="Түргэн тохиргоо" sub="Шинэ захиалга нэмэх">
          <QuickForm />
        </Panel>
      </div>

      <Panel title="Сэтгэгдэл" sub="Хэрэглэгчдийн сүүлийн сэтгэгдэлүүд">
        <div className="reviewlist">
          {REVIEWS.slice(0, 3).map(r => <ReviewItem key={r.id} {...r} />)}
        </div>
      </Panel>
    </>
  );
}

function ReservationPage() {
  return (
    <Panel title="Бүх захиалгууд" sub="Захиалгуудын бүрэн жагсаалт">
      <ReservationTable full />
    </Panel>
  );
}

function ReviewsPage() {
  return (
    <Panel title="Бүх сэтгэгдэлүүд" sub="Хэрэглэгчдийн үлдээсэн бүх сэтгэгдэл">
      <div className="reviewlist">
        {REVIEWS.map(r => <ReviewItem key={r.id} {...r} />)}
      </div>
    </Panel>
  );
}

function UsersPage() {
  const users = [
    { id: "U001", name: "Enkhjin",  email: "enkhjin@mail.mn",  role: "Хэрэглэгч",   joined: "2026/01/05" },
    { id: "U002", name: "Batmunkh", email: "bat@mail.mn",       role: "Захиалагч",    joined: "2026/01/12" },
    { id: "U003", name: "Sarnai",   email: "sarnai@mail.mn",    role: "Хэрэглэгч",   joined: "2026/02/03" },
    { id: "U004", name: "Gantulga", email: "ganaa@mail.mn",     role: "Менежер",      joined: "2026/02/20" },
    { id: "U005", name: "Tuya",     email: "tuya@mail.mn",      role: "Хэрэглэгч",   joined: "2026/03/08" },
  ];

  return (
    <Panel title="Хэрэглэгчид" sub="Бүртгэлтэй хэрэглэгчдийн жагсаалт">
      <div className="tablewrap">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Нэр</th>
              <th>И-мэйл</th>
              <th>Роль</th>
              <th>Бүртгүүлсэн</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>#{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span className="status ok">{u.role}</span></td>
                <td>{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}


const PAGES = {
  dashboard:    { component: DashboardPage,   label: "Dashboard"  },
  reservations: { component: ReservationPage, label: "Захиалга"   },
  reviews:      { component: ReviewsPage,     label: "Сэтгэгдэл"  },
  users:        { component: UsersPage,       label: "Хэрэглэгч"  },
};


function App() {
  const [page, setPage] = useState("dashboard");
  const PageComponent = PAGES[page].component;

  return (
    <div className="app">
      <Topbar currentLabel={PAGES[page].label} />

      <div className="shell">
        <Sidebar currentPage={page} onNavigate={setPage} />

        <div className="main">
          {/* key forces re-mount → CSS slide animation re-triggers on every page change */}
          <div key={page} className="page-enter">
            <PageComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
