import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import restaurantData from "../data/restaurants.json";

/** AppContext – global state store */
const AppContext = createContext(null);
const REGISTERED_USER_KEY = "bon_delice_registered_user";
const ACTIVE_USER_KEY = "bon_delice_active_user";

function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AppProvider({ children }) {
  const [restaurants, setRestaurants] = useState(restaurantData.restaurants);
  const [orders,      setOrders]      = useState([]);
  const [reviews,     setReviews]     = useState({});      // { [id]: Review[] }
  const [toasts,      setToasts]      = useState([]);
  const [registeredUser, setRegisteredUser] = useState(() => readStorage(REGISTERED_USER_KEY));
  const [currentUser, setCurrentUser] = useState(() => readStorage(ACTIVE_USER_KEY));

  /* Toast system*/
  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  }, []);

  /* Auth */
  const registerUser = useCallback((payload) => {
    const user = {
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
    };
    setRegisteredUser(user);
    localStorage.setItem(REGISTERED_USER_KEY, JSON.stringify(user));
    return user;
  }, []);

  const loginUser = useCallback(
    (email, password) => {
      if (!registeredUser) {
        return { ok: false, reason: "not_registered" };
      }
      const normalizedEmail = email.trim().toLowerCase();
      if (registeredUser.email !== normalizedEmail || registeredUser.password !== password) {
        return { ok: false, reason: "invalid_credentials" };
      }
      const active = { name: registeredUser.name, email: registeredUser.email };
      setCurrentUser(active);
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(active));
      return { ok: true, user: active };
    },
    [registeredUser]
  );

  const logoutUser = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(ACTIVE_USER_KEY);
  }, []);

  /* Favorites */
  const toggleFavorite = useCallback((id) => {
    setRestaurants((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    );
  }, []);

  /*Reservations */
  const createOrder = useCallback((data) => {
    const order = {
      id:        Date.now(),
      venueId:   data.venueId,
      venueName: data.venueName,
      venueImg:  data.venueImg,
      date:      data.date,
      time:      data.time,
      people:    data.people,
      note:      data.note || "",
      status:    "confirmed",
      createdAt: new Date().toLocaleString("mn-MN"),
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const cancelOrder = useCallback((orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o))
    );
  }, []);

  const updateOrder = useCallback((orderId, changes) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, ...changes } : o))
    );
  }, []);

  /* Reviews */
  const addReview = useCallback((venueId, review) => {
    setReviews((prev) => ({
      ...prev,
      [venueId]: [{ id: Date.now(), ...review }, ...(prev[venueId] || [])],
    }));
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === venueId
          ? { ...r, reviewCount: r.reviewCount + 1 }
          : r
      )
    );
  }, []);

  const value = useMemo(
    () => ({
      restaurants,
      orders,
      reviews,
      toasts,
      toggleFavorite,
      createOrder,
      cancelOrder,
      updateOrder,
      addReview,
      addToast,
      registeredUser,
      currentUser,
      registerUser,
      loginUser,
      logoutUser,
    }),
    [restaurants, orders, reviews, toasts,
     toggleFavorite, createOrder, cancelOrder, updateOrder, addReview, addToast,
     registeredUser, currentUser, registerUser, loginUser, logoutUser]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
