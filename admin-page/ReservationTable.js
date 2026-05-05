const RESERVATIONS = [
  { id: "R001", name: "Батбаяр",   time: "18:00", guests: 4, status: "confirmed"  },
  { id: "R002", name: "Сарнай",    time: "18:30", guests: 2, status: "pending"    },
  { id: "R003", name: "Энхжин",    time: "19:00", guests: 6, status: "confirmed"  },
  { id: "R004", name: "Мөнхбат",   time: "19:30", guests: 3, status: "cancelled"  },
  { id: "R005", name: "Ганчимэг",  time: "20:00", guests: 5, status: "confirmed"  },
  { id: "R006", name: "Туяа",      time: "20:30", guests: 2, status: "pending"    },
  { id: "R007", name: "Болд",      time: "21:00", guests: 8, status: "confirmed"  },
];

function getStatusClass(status) {
  if (status === "confirmed") return "ok";
  if (status === "pending")   return "warn";
  return "bad";
}

function getStatusLabel(status) {
  if (status === "confirmed") return "Баталгаажсан";
  if (status === "pending")   return "Хүлээгдэж буй";
  return "Цуцалсан";
}

// full=true shows all rows, false shows only first 4 (for dashboard preview)
function ReservationTable({ full = false }) {
  const rows = full ? RESERVATIONS : RESERVATIONS.slice(0, 4);

  return (
    <div className="tablewrap">
      <table className="table">
        <thead>
          <tr>
            <th>Код</th>
            <th>Нэр</th>
            <th>Цаг</th>
            <th>Хүн</th>
            <th>Төлөв</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>#{r.id}</td>
              <td>{r.name}</td>
              <td>{r.time}</td>
              <td>{r.guests}</td>
              <td>
                <span className={`status ${getStatusClass(r.status)}`}>
                  {getStatusLabel(r.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationTable;