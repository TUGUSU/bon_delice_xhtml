(function () {
  var JSONBIN_BIN_ID = '69c62fd0c3097a1dd565c9a2';
  var JSONBIN_ACCESS_KEY = '$2a$10$edWrTTCXYA5YQEnUissTHOXawUJWoeRyDUqbalVSk/mgoEXR98FHK';
  var JSONBIN_COLLECTION_ID = '';
  var JSONBIN_USE_LATEST = true;

  var state = {
    data: null,
    filteredTables: [],
    selectedDate: 1,
    selectedTable: 1,
    selectedTime: '11:00 - 12:00'
  };

  var DEFAULTS = {
    restaurant: {
      name: 'Yuna',
      distance: '0.6 км',
      rating: 4.3,
      reviewsCount: 86,
      tags: ['#Солонгос ресторан', '#Ази ресторан'],
      address: 'Royal Castle Apartment, Seoul Business Center, BZD - 1 khoroo, Ulaanbaatar 13380',
      description: 'Yuna Restaurant бол Солонгос хоолны сүлжээ ресторан бөгөөд тус ресторан нь уламжлалт Солонгос амтыг орчин үеийн тав тухтай орчинтой хослуулан санал болгодог.',
      hours: '11:00 - 00:00',
      locationLabel: 'Таны одоо байгаа байршил.',
      locationValue: 'Bayuzurkh district, 26 street',
      logo: 'assets/img/logo.png'
    },
    gallery: [
      { id: 1, type: 'main', title: 'Main Hall', count: 120, image: 'assets/img/hero-main.jpg', thumb: 'assets/img/hero-main.jpg' },
      { id: 2, type: 'interior', title: 'Interior', count: 38, image: 'assets/img/interior.jpg', thumb: 'assets/img/interior.jpg' },
      { id: 3, type: 'food', title: 'Food', count: 33, image: 'assets/img/food.jpg', thumb: 'assets/img/food.jpg' },
      { id: 4, type: 'menu', title: 'Menu', count: 4, image: 'assets/img/menu-left.jpg', thumb: 'assets/img/menu-left.jpg' },
      { id: 5, type: 'menu', title: 'Menu Detail', count: 4, image: 'assets/img/menu-right.jpg', thumb: 'assets/img/menu-right.jpg' }
    ],
    tables: [
      { id: 1, name: 'ШИРЭЭ 1', capacity: 2, available: true },
      { id: 2, name: 'ШИРЭЭ 2', capacity: 4, available: true },
      { id: 3, name: 'ШИРЭЭ 3', capacity: 4, available: true },
      { id: 4, name: 'ШИРЭЭ 4', capacity: 6, available: false },
      { id: 5, name: 'ШИРЭЭ 5', capacity: 2, available: true }
    ],
    times: ['11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '18:00 - 19:00', '19:00 - 20:00'],
    days: (function () {
      var labels = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням'];
      var items = [];
      var i;
      for (i = 1; i <= 31; i += 1) {
        items.push({ date: i, dayName: labels[(i - 1) % 7] });
      }
      return items;
    }())
  };

  function getJsonBinUrl() {
    var suffix = JSONBIN_USE_LATEST ? '/latest' : '';
    return 'https://api.jsonbin.io/v3/b/' + JSONBIN_BIN_ID + suffix + '?meta=false';
  }

  function getHeaders() {
    var headers = {};
    if (JSONBIN_ACCESS_KEY && JSONBIN_ACCESS_KEY !== 'access key') {
      headers['X-Access-Key'] = JSONBIN_ACCESS_KEY;
    }
    if (JSONBIN_COLLECTION_ID) {
      headers['X-Collection-Id'] = JSONBIN_COLLECTION_ID;
    }
    return headers;
  }

  function loadData() {
    if (!JSONBIN_BIN_ID || JSONBIN_BIN_ID === 'bin_id') {
      return Promise.reject(new Error('JSONBIN_BIN_ID'));
    }

    return fetch(getJsonBinUrl(), {
      method: 'GET',
      headers: getHeaders(),
      cache: 'no-store'
    }).then(function (response) {
      if (!response.ok) {
        throw new Error('JSONBin achaalsangui: ' + response.status + ' ' + response.statusText);
      }
      return response.json();
    }).then(function (raw) {
      return normalizeData(raw && raw.record ? raw.record : raw);
    });
  }

  function basename(path) {
    return String(path || '').split('/').pop();
  }

  function mapAsset(path, fallback) {
    var value = String(path || '').trim();
    var file = basename(value);
    var map = {
      'hero-main.jpg': 'assets/img/hero-main.jpg',
      'hero-main-fixed1.jpg': 'assets/img/hero-main-fixed1.jpg',
      'interior.jpg': 'assets/img/interior.jpg',
      'food.jpg': 'assets/img/food.jpg',
      'menu-left.jpg': 'assets/img/menu-left.jpg',
      'menu-right.jpg': 'assets/img/menu-right.jpg',
      'logo.png': 'assets/img/logo.png',
      'logo-circle.png': 'assets/img/logo.png'
    };

    if (!value) return fallback;
    if (/^https?:\/\//i.test(value) || /^data:/i.test(value)) return value;
    if (map[file]) return map[file];
    if (value.indexOf('assets/img/') === 0) return value;
    if (value.indexOf('assets/') === 0) return 'assets/img/' + file;
    return fallback || value;
  }

  function normalizeRestaurant(restaurant) {
    var data = restaurant || {};
    return {
      name: data.name || DEFAULTS.restaurant.name,
      distance: data.distance || DEFAULTS.restaurant.distance,
      rating: typeof data.rating === 'number' ? data.rating : DEFAULTS.restaurant.rating,
      reviewsCount: typeof data.reviewsCount === 'number' ? data.reviewsCount : DEFAULTS.restaurant.reviewsCount,
      tags: Array.isArray(data.tags) && data.tags.length ? data.tags : DEFAULTS.restaurant.tags,
      address: data.address || DEFAULTS.restaurant.address,
      description: data.description || DEFAULTS.restaurant.description,
      hours: data.hours || DEFAULTS.restaurant.hours,
      locationLabel: data.locationLabel || DEFAULTS.restaurant.locationLabel,
      locationValue: data.locationValue || DEFAULTS.restaurant.locationValue,
      logo: mapAsset(data.logo, DEFAULTS.restaurant.logo)
    };
  }

  function normalizeGallery(gallery) {
    var items = Array.isArray(gallery) ? gallery.slice() : [];
    if (!items.length) {
      items = DEFAULTS.gallery.slice();
    }

    return items.map(function (item, index) {
      var fallback = DEFAULTS.gallery[index] || DEFAULTS.gallery[0];
      return {
        id: item.id || fallback.id || index + 1,
        type: item.type || fallback.type,
        title: item.title || fallback.title,
        count: typeof item.count === 'number' ? item.count : fallback.count,
        image: mapAsset(item.image || item.thumb, fallback.image),
        thumb: mapAsset(item.thumb || item.image, fallback.thumb)
      };
    });
  }

  function normalizeTables(tables) {
    var items = Array.isArray(tables) && tables.length ? tables : DEFAULTS.tables;
    return items.map(function (table, index) {
      var fallback = DEFAULTS.tables[index] || DEFAULTS.tables[0];
      return {
        id: typeof table.id === 'number' ? table.id : fallback.id,
        name: table.name || fallback.name,
        capacity: typeof table.capacity === 'number' ? table.capacity : fallback.capacity,
        available: typeof table.available === 'boolean' ? table.available : fallback.available
      };
    });
  }

  function normalizeDays(days) {
    var items = Array.isArray(days) && days.length ? days : DEFAULTS.days;
    return items.map(function (day, index) {
      var fallback = DEFAULTS.days[index] || DEFAULTS.days[0];
      return {
        date: typeof day.date === 'number' ? day.date : fallback.date,
        dayName: day.dayName || fallback.dayName
      };
    });
  }

  function normalizeData(data) {
    var normalized = {
      restaurant: normalizeRestaurant(data.restaurant || data),
      gallery: normalizeGallery(data.gallery),
      tables: normalizeTables(data.tables),
      times: Array.isArray(data.times) && data.times.length ? data.times : DEFAULTS.times,
      days: normalizeDays(data.days)
    };
    return normalized;
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
    var i;
    for (i = 1; i <= 5; i += 1) {
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
    document.getElementById('restaurant-address').innerHTML = restaurant.address.replace(/, /g, ',<br />');
    document.getElementById('restaurant-description').textContent = restaurant.description;
    document.getElementById('restaurant-hours').textContent = restaurant.hours;
    document.getElementById('logo-image').src = restaurant.logo;
    document.getElementById('logo-image').onerror = function () { this.src = DEFAULTS.restaurant.logo; };
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

    var images = document.querySelectorAll('#hero-main-slot img, #hero-side-slot img');
    Array.prototype.forEach.call(images, function (img) {
      img.onerror = function () {
        var file = basename(this.getAttribute('src'));
        this.setAttribute('src', mapAsset(file, DEFAULTS.gallery[0].image));
      };
    });
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

  function syncDateScroll(behavior) {
    var active = document.querySelector('.dynamic-date-chip.is-active');
    var track = document.getElementById('date-track');
    if (!active || !track) return;

    if (typeof active.scrollIntoView === 'function') {
      try {
        active.scrollIntoView({ behavior: behavior || 'smooth', inline: 'center', block: 'nearest' });
        return;
      } catch (error) {}
    }

    var activeCenter = active.offsetLeft + (active.offsetWidth / 2);
    var targetLeft = activeCenter - (track.clientWidth / 2);
    var maxLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    var nextLeft = Math.max(0, Math.min(targetLeft, maxLeft));

    if (typeof track.scrollTo === 'function') {
      track.scrollTo({ left: nextLeft, behavior: behavior || 'smooth' });
    } else {
      track.scrollLeft = nextLeft;
    }
  }

  function bindDateControls() {
    var track = document.getElementById('date-track');
    var prev = document.getElementById('dates-prev');
    var next = document.getElementById('dates-next');
    if (!track || !prev || !next) return;

    track.onclick = function (event) {
      var target = event.target;
      var button = target && typeof target.closest === 'function' ? target.closest('.dynamic-date-chip') : null;
      if (!button) return;
      state.selectedDate = Number(button.getAttribute('data-date'));
      renderDays(state.data.days, state.selectedDate);
      setTimeout(function () { syncDateScroll('smooth'); }, 0);
    };

    prev.onclick = function () {
      if (state.selectedDate > 1) {
        state.selectedDate -= 1;
        renderDays(state.data.days, state.selectedDate);
      }
      setTimeout(function () { syncDateScroll('smooth'); }, 0);
    };

    next.onclick = function () {
      if (state.selectedDate < state.data.days.length) {
        state.selectedDate += 1;
        renderDays(state.data.days, state.selectedDate);
      }
      setTimeout(function () { syncDateScroll('smooth'); }, 0);
    };
  }

  function bindTableControls() {
    var list = document.getElementById('table-list');
    if (!list) return;

    list.onclick = function (event) {
      var target = event.target;
      var button = target && typeof target.closest === 'function' ? target.closest('.dynamic-table-option') : null;
      if (!button || button.disabled) return;

      state.selectedTable = Number(button.getAttribute('data-table-id'));
      renderTables(state.filteredTables, state.selectedTable);
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
  }

  function showLoadError(error) {
    console.error(error);

    var errorBox = document.getElementById('load-error');

    if (errorBox) {
      errorBox.textContent = 'ogogdol achaallhad aldaa garlaa';
      errorBox.style.display = 'block';
      return;
    }

    console.warn('ogogdol achaallhad aldaa garlaa');
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
      setTimeout(function () { syncDateScroll('auto'); }, 30);

      var searchInput = document.getElementById('search-input');
      var bookingTime = document.getElementById('booking-time');
      var bookingForm = document.getElementById('booking-form');

      if (searchInput) {
        searchInput.addEventListener('input', applySearchFilter);
      }

      if (bookingTime) {
        bookingTime.addEventListener('change', function (event) {
          state.selectedTime = event.target.value;
        });
      }

      if (bookingForm) {
        bookingForm.addEventListener('submit', function (event) {
          event.preventDefault();
          updateSuccessMessage();
          window.location.hash = 'booking-success';
        });
      }
    }).catch(showLoadError);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());