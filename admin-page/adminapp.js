const RESERVATIONS_LOCAL = [
  { id: "R001", name: "Батбаяр",  time: "18:00", guests: 4, status: "confirmed" },
  { id: "R002", name: "Сарнай",   time: "18:30", guests: 2, status: "pending"   },
  { id: "R003", name: "Энхжин",   time: "19:00", guests: 6, status: "confirmed" },
  { id: "R004", name: "Мөнхбат",  time: "19:30", guests: 3, status: "cancelled" },
  { id: "R005", name: "Ганчимэг", time: "20:00", guests: 5, status: "confirmed" },
  { id: "R006", name: "Туяа",     time: "20:30", guests: 2, status: "pending"   },
  { id: "R007", name: "Болд",     time: "21:00", guests: 8, status: "confirmed" },
];

const REVIEWS = [
  { id: 1, user: "Enkhjin",  title: "Хоол маш амттай байсан",    date: "2026/04/10", rating: 5, likes: 0, dislikes: 0, vote: null },
  { id: 2, user: "Batmunkh", title: "Үйлчилгээ маш сайн байсан", date: "2026/04/11", rating: 4, likes: 0, dislikes: 0, vote: null },
  { id: 3, user: "Sarnai",   title: "Хоол хүйтэн байсан",         date: "2026/04/12", rating: 2, likes: 0, dislikes: 0, vote: null },
  { id: 4, user: "Gantulga", title: "Орчин тохитой байсан",       date: "2026/04/13", rating: 5, likes: 0, dislikes: 0, vote: null },
  { id: 5, user: "Tuya",     title: "Хоолны чанар сайн байсан",   date: "2026/04/14", rating: 3, likes: 0, dislikes: 0, vote: null },
];

const USERS = [
  { id: "U001", name: "Enkhjin",  email: "enkhjin@mail.mn", role: "Хэрэглэгч", joined: "2026/01/05" },
  { id: "U002", name: "Batmunkh", email: "bat@mail.mn",     role: "Захиалагч", joined: "2026/01/12" },
  { id: "U003", name: "Sarnai",   email: "sarnai@mail.mn",  role: "Хэрэглэгч", joined: "2026/02/03" },
  { id: "U004", name: "Gantulga", email: "ganaa@mail.mn",   role: "Менежер",   joined: "2026/02/20" },
  { id: "U005", name: "Tuya",     email: "tuya@mail.mn",    role: "Хэрэглэгч", joined: "2026/03/08" },
];

const PAGE_ORDER  = ["dashboard", "reservations", "reviews", "users"];
const PAGE_LABELS = { dashboard: "Dashboard", reservations: "Захиалга", reviews: "Сэтгэгдэл", users: "Хэрэглэгч" };
let currentPage   = "dashboard";



function navigate(targetId, linkEl) {
  if (targetId === currentPage) return false;

  const fromIndex = PAGE_ORDER.indexOf(currentPage);
  const toIndex   = PAGE_ORDER.indexOf(targetId);
  const direction = toIndex > fromIndex ? "anim-forward" : "anim-back";


  const fromPage = document.getElementById("page-" + currentPage);
  if (fromPage) fromPage.classList.remove("is-active", "anim-forward", "anim-back");


  const toPage = document.getElementById("page-" + targetId);
  if (toPage) {
    toPage.classList.remove("anim-forward", "anim-back");
    toPage.offsetWidth; 
    toPage.classList.add("is-active", direction);
  }


  document.querySelectorAll(".navitem").forEach(el => el.classList.remove("active"));
  if (linkEl) linkEl.classList.add("active");


  const crumb = document.getElementById("crumbLabel");
  if (crumb) crumb.textContent = PAGE_LABELS[targetId] || targetId;

  currentPage = targetId;
  return false;
}


function getStatusClass(s) {
  return s === "confirmed" ? "ok" : s === "pending" ? "warn" : "bad";
}
function getStatusLabel(s) {
  return s === "confirmed" ? "Баталгаажсан" : s === "pending" ? "Хүлээгдэж буй" : "Цуцалсан";
}
function stars(n) {
  return "⭐".repeat(Math.max(1, Math.min(5, n || 4)));
}



function renderReservationRows(data, tbodyId) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  tbody.innerHTML = data.map(r =>
    `<tr>
      <td>#${r.id}</td>
      <td>${r.name}</td>
      <td>${r.time}</td>
      <td>${r.guests}</td>
      <td><span class="status ${getStatusClass(r.status)}">${getStatusLabel(r.status)}</span></td>
    </tr>`
  ).join("");
}


function reviewHTML(r) {
  const initial    = r.user ? r.user.charAt(0).toUpperCase() : "?";
  const likeClass  = r.vote === "like"    ? " liked"    : "";
  const badClass   = r.vote === "dislike" ? " disliked" : "";

  return `<div class="reviewitem" id="review-${r.id}">
    <div class="reviewitem__left">
      <div class="bubble">${initial}</div>
      <div>
        <div class="reviewitem__title">${stars(r.rating)} ${r.title}</div>
        <div class="reviewitem__meta">${r.user} &bull; ${r.date}</div>
      </div>
    </div>
    <div class="reviewitem__right">
      <button class="btn-ghost vote-btn${likeClass}"
        onclick="handleVote(${r.id},'like')" title="Таалагдсан">
        👍${r.likes > 0 ? ` <span class="vote-count">${r.likes}</span>` : ""}
      </button>
      <button class="btn-ghost vote-btn${badClass}"
        onclick="handleVote(${r.id},'dislike')" title="Таалагдаагүй">
        👎${r.dislikes > 0 ? ` <span class="vote-count">${r.dislikes}</span>` : ""}
      </button>
    </div>
  </div>`;
}

function renderReviews(data, containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = data.map(reviewHTML).join("");
}



function handleVote(reviewId, type) {
  const r = REVIEWS.find(x => x.id === reviewId);
  if (!r) return;

  if (r.vote === type) {
    r[type + "s"]--;
    r.vote = null;
  } else {
    if (r.vote) r[r.vote + "s"]--;   
    r[type + "s"]++;
    r.vote = type;
  }

  document.querySelectorAll("#review-" + reviewId).forEach(el => {
    el.outerHTML = reviewHTML(r);
  });
}


function renderUsers() {
  const tbody = document.getElementById("usersTable");
  if (!tbody) return;
  tbody.innerHTML = USERS.map(u =>
    `<tr>
      <td>#${u.id}</td>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td><span class="user-role">${u.role}</span></td>
      <td>${u.joined}</td>
    </tr>`
  ).join("");
}



function setupSearch(allData) {
  const input = document.getElementById("searchInput");
  if (!input) return;
  input.addEventListener("input", () => {
    const val = input.value.toLowerCase();
    const filtered = allData.filter(r =>
      r.name.toLowerCase().includes(val) || r.id.toLowerCase().includes(val)
    );
    renderReservationRows(filtered.slice(0, 4), "reservationTable");
    renderReservationRows(filtered, "allReservationTable");
  });
}


async function fetchRemoteData() {
  try {
    const res = await fetch("https://api.jsonbin.io/v3/b/69bd0977aa77b81da9005771", {
      headers: {
        "X-Master-Key": "$2a$10$pTJdAcCJvQ8UrpmQiKi3vOaamINmUbep7o8bM81UOnTiceB2VvkSu",
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) throw new Error("Fetch failed");
    const data = await res.json();
    return data.record.reservations;
  } catch (e) {
    console.warn("Remote fetch failed, using local data:", e);
    return null;
  }
}



async function init() {
  const remote       = await fetchRemoteData();
  const reservations = remote || RESERVATIONS_LOCAL;

  renderReservationRows(reservations.slice(0, 4), "reservationTable");   
  renderReservationRows(reservations, "allReservationTable");            

  renderReviews(REVIEWS.slice(0, 3), "dashboardReviews");  
  renderReviews(REVIEWS, "allReviews");                    
  renderUsers();
  setupSearch(reservations);
}

init();
