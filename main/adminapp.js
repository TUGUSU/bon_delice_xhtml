//baiguulagch function
function ReservationApp(data) {
  this.data = data;
}

// status
ReservationApp.prototype.getStatusClass = function(status) {
  if (status === "confirmed") return "ok";
  if (status === "pending") return "warn";
  return "bad";
};

// Table render
ReservationApp.prototype.renderTable = function(data) {
  const table = document.getElementById("reservationTable");

  table.innerHTML = data.map(r => `
    <tr>
      <td>#${r.id}</td>
      <td>${r.name}</td>
      <td>${r.time}</td>
      <td>${r.guests}</td>
      <td>
        <span class="status ${this.getStatusClass(r.status)}">
          ${r.status}
        </span>
      </td>
    </tr>
  `).join("");
};

//search filter
ReservationApp.prototype.setupSearch = function() {
  const input = document.getElementById("searchInput");

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();

    const filtered = this.data.filter(r =>
      r.name.toLowerCase().includes(value) ||
      r.id.toLowerCase().includes(value)
    );

    this.renderTable(filtered);
  });
};

// Fetch data
function fetchData() {
  return fetch("./data.json")
    .then(res => res.json())
    .then(data => data.reservations);
}

function init() {
  fetchData().then(reservations => {
    const app = new ReservationApp(reservations);

    app.renderTable(app.data);
    app.setupSearch();
  });
}

init();