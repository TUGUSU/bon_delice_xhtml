
(function () {
  var state = {
    data: null,
    filteredTables: [],
    selectedDate: 1,
    selectedTable: 1,
    selectedTime: '11:00 - 12:00'
  };

  function loadData() {
    return fetch('./reservation.json', { cache: 'no-store' }).then(function (response) {
      if (!response.ok) {
        throw new Error('reservation.json файл ачаалагдсангүй');
      }
      return response.json();
    });
  }

  function getQueryFilters() {
    var params = new URLSearchParams(window.location.search);
    return {
      gallery: params.get('gallery'),
      available: params.get('available') === 'true',
      capacity: params.get('capacity') ? Number(params.get('capacity')) : null,
      table: params.get('table') ? Number(params.get('table')) : null,
      date: params.get('date') ? Number(params.get('date')) : null,
      time: params.get('time') || null
    };
  }

  function filterTables(tables, filters) {
    return tables.filter(function (table) {
      if (filters.available && !table.available) return false;
      if (filters.capacity && table.capacity !== filters.capacity) return false;
      if (filters.table && table.id !== filters.table) return false;
      return true;
    });
  }

  function starMarkup(rating) {
    var rounded = Math.round(rating);
    var html = '';
    for (var i = 1; i <= 5; i += 1) {
      html += '<span class="' + (i <= rounded ? 'filled' : 'empty') + '">&#9733;</span>';
    }
    return html;
  }

  function renderRestaurant(data) {
    var restaurant = data.restaurant;
    document.getElementById('location-label').textContent = restaurant.locationLabel;
    document.getElementById('location-value').textContent = restaurant.locationValue;
    document.getElementById('restaurant-name').textContent = restaurant.name;
    document.getElementById('restaurant-distance').textContent = restaurant.distance;
    document.getElementById('restaurant-rating').textContent = restaurant.rating.toFixed(1);
    document.getElementById('restaurant-stars').innerHTML = starMarkup(restaurant.rating);
    document.getElementById('restaurant-reviews').textContent = '(' + restaurant.reviewsCount + ' сэтгэгдэл)';
    document.getElementById('restaurant-address').innerHTML = restaurant.address.replace(', ', ',<br />');
    document.getElementById('restaurant-description').textContent = restaurant.description;
    document.getElementById('restaurant-hours').textContent = restaurant.hours;
    document.getElementById('logo-image').src = restaurant.logo;
    document.getElementById('restaurant-tags').innerHTML = restaurant.tags.map(function (tag) {
      return '<span>' + tag + '</span>';
    }).join('');
  }

  function renderHero(gallery) {
    var heroMain = gallery.filter(function (item) { return item.type === 'main'; })[0] || gallery[0];
    var interior = gallery.filter(function (item) { return item.type === 'interior'; })[0];
    var food = gallery.filter(function (item) { return item.type === 'food'; })[0];
    var menuItems = gallery.filter(function (item) { return item.type === 'menu'; });

    document.getElementById('hero-main-slot').innerHTML =
      '<a class="hero-main gallery-trigger" href="#gallery-' + heroMain.id + '">' +
      '<img src="' + heroMain.thumb + '" alt="' + heroMain.title + '" />' +
      '<span class="photo-badge"><span class="camera-icon">&#128247;</span>' + heroMain.count + '</span>' +
      '</a>';

    document.getElementById('hero-side-slot').innerHTML =
      (interior ? '<a class="gallery-card gallery-trigger" href="#gallery-' + interior.id + '"><img src="' + interior.thumb + '" alt="' + interior.title + '" /><span class="gallery-overlay"><span class="gallery-title">' + interior.title + '</span><span class="gallery-count">' + interior.count + '</span></span></a>' : '') +
      (food ? '<a class="gallery-card gallery-trigger" href="#gallery-' + food.id + '"><img src="' + food.thumb + '" alt="' + food.title + '" /><span class="gallery-overlay"><span class="gallery-title">' + food.title + '</span><span class="gallery-count">' + food.count + '</span></span></a>' : '') +
      (menuItems.length ? '<a class="gallery-card menu-gallery gallery-trigger" href="#gallery-' + menuItems[0].id + '"><span class="menu-grid"><img src="' + menuItems[0].thumb + '" alt="' + menuItems[0].title + '" /><img src="' + ((menuItems[1] || menuItems[0]).thumb) + '" alt="' + ((menuItems[1] || menuItems[0]).title) + '" /></span><span class="gallery-overlay"><span class="gallery-title">Menu</span><span class="gallery-count">' + menuItems[0].count + '</span></span></a>' : '');
  }

  function renderLightboxes(gallery) {
    var slot = document.getElementById('lightboxes-slot');
    slot.innerHTML = gallery.map(function (item, index) {
      var prev = gallery[(index - 1 + gallery.length) % gallery.length];
      var next = gallery[(index + 1) % gallery.length];
      return '<div id="gallery-' + item.id + '" class="gallery-lightbox">' +
        '<a class="gallery-backdrop" href="#page"><span class="visually-hidden">Close gallery</span></a>' +
        '<div class="gallery-dialog">' +
        '<a class="gallery-close" href="#page" title="Close">&#215;</a>' +
        '<a class="gallery-arrow gallery-arrow-left" href="#gallery-' + prev.id + '" title="Previous">&#8249;</a>' +
        '<div class="gallery-stage"><img src="' + item.image + '" alt="' + item.title + '" /></div>' +
        '<a class="gallery-arrow gallery-arrow-right" href="#gallery-' + next.id + '" title="Next">&#8250;</a>' +
        '<div class="gallery-caption">' + item.title + '</div>' +
        '</div></div>';
    }).join('');
  }

  function renderTimes(times, selected) {
    var select = document.getElementById('booking-time');
    select.innerHTML = times.map(function (time) {
      return '<option value="' + time + '"' + (time === selected ? ' selected="selected"' : '') + '>' + time + '</option>';
    }).join('');
  }

  function renderDays(days, activeDate) {
    var track = document.getElementById('date-track');
    track.innerHTML = days.map(function (day) {
      return '<button class="date-chip dynamic-date-chip ' + (day.date === activeDate ? 'is-active' : '') + '" data-date="' + day.date + '" type="button">' +
        '<span class="date-number">' + day.date + '</span>' +
        '<span class="date-day">' + day.dayName + '</span>' +
        '</button>';
    }).join('');
  }

  function renderTables(tables, activeTableId) {
    var list = document.getElementById('table-list');
    list.innerHTML = tables.map(function (table) {
      return '<button class="table-option dynamic-table-option ' + (table.id === activeTableId ? 'is-active' : '') + ' ' + (!table.available ? 'is-unavailable' : '') + '" data-table-id="' + table.id + '" type="button" ' + (!table.available ? 'disabled="disabled"' : '') + '>' +
        '<span class="table-name">' + table.name + '</span>' +
        '<span class="table-meta"><img src="assets/img/guest-gray.svg" alt="Guests" /><span>' + table.capacity + ' хүний</span></span>' +
        '<span class="table-status">' + (table.available ? 'Нээлттэй' : 'Дүүрсэн') + '</span>' +
        '</button>';
    }).join('');
  }

  function updateSuccessMessage() {
    var table = state.filteredTables.filter(function (item) { return item.id === state.selectedTable; })[0] ||
      state.data.tables.filter(function (item) { return item.id === state.selectedTable; })[0];
    var restaurantName = state.data.restaurant.name;
    document.getElementById('success-copy-detail').innerHTML =
      'Таны цаг ' + state.selectedDate + '-ны өдрийн <strong>' + state.selectedTime + '</strong> цагийн хооронд ' +
      restaurantName + ' restaurant-д <strong>' + (table ? table.name.toLowerCase() : 'ширээ') + '</strong> захиалагдлаа.';
  }

  function syncDateScroll() {
    var active = document.querySelector('.dynamic-date-chip.is-active');
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  function bindDateControls() {
    document.getElementById('date-track').onclick = function (event) {
      var button = event.target.closest('.dynamic-date-chip');
      if (!button) return;
      state.selectedDate = Number(button.getAttribute('data-date'));
      renderDays(state.data.days, state.selectedDate);
      bindDateControls();
      syncDateScroll();
    };

    document.getElementById('dates-prev').onclick = function () {
      document.getElementById('date-track').scrollBy({ left: -420, behavior: 'smooth' });
    };
    document.getElementById('dates-next').onclick = function () {
      document.getElementById('date-track').scrollBy({ left: 420, behavior: 'smooth' });
    };
  }

  function bindTableControls() {
    document.getElementById('table-list').onclick = function (event) {
      var button = event.target.closest('.dynamic-table-option');
      if (!button || button.disabled) return;
      state.selectedTable = Number(button.getAttribute('data-table-id'));
      renderTables(state.filteredTables, state.selectedTable);
      bindTableControls();
    };
  }

  function applySearchFilter() {
    var text = document.getElementById('search-input').value.trim().toLowerCase();
    var queryFilters = getQueryFilters();
    var tables = filterTables(state.data.tables, queryFilters);
    if (text) {
      tables = tables.filter(function (table) {
        return table.name.toLowerCase().indexOf(text) !== -1 || String(table.capacity).indexOf(text) !== -1;
      });
    }
    state.filteredTables = tables;
    if (!tables.some(function (t) { return t.id === state.selectedTable; })) {
      state.selectedTable = (tables.filter(function (t) { return t.available; })[0] || tables[0] || {}).id || null;
    }
    renderTables(tables, state.selectedTable);
    bindTableControls();
  }

  function init() {
    loadData().then(function (data) {
      state.data = data;
      var queryFilters = getQueryFilters();

      renderRestaurant(data);
      renderHero(data.gallery);
      renderLightboxes(data.gallery);

      state.filteredTables = filterTables(data.tables, queryFilters);
      state.selectedDate = queryFilters.date || data.days[0].date;
      state.selectedTable = queryFilters.table || ((state.filteredTables.filter(function (t) { return t.available; })[0] || state.filteredTables[0] || {}).id) || 1;
      state.selectedTime = queryFilters.time || data.times[0];

      renderDays(data.days, state.selectedDate);
      renderTables(state.filteredTables, state.selectedTable);
      renderTimes(data.times, state.selectedTime);
      bindDateControls();
      bindTableControls();
      syncDateScroll();

      document.getElementById('search-input').addEventListener('input', applySearchFilter);
      document.getElementById('booking-time').addEventListener('change', function (event) {
        state.selectedTime = event.target.value;
      });

      document.getElementById('booking-form').addEventListener('submit', function (event) {
        event.preventDefault();
        updateSuccessMessage();
        window.location.hash = 'booking-success';
      });
    }).catch(function (error) {
      console.error(error);
      alert('reservation.json шалгана уу.');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
