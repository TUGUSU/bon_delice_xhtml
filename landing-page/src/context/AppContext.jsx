import React, { createContext, useContext, useMemo, useState } from "react";
import restaurantData from "../data/restaurants.json";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [restaurants, setRestaurants] = useState(restaurantData.restaurants);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState({});

  function toggleFavorite(id) {
    setRestaurants((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  }

  function createReservation(restaurant) {
    const newOrder = {
      id: Date.now(),
      venueId: restaurant.id,
      venueName: restaurant.name,
      createdAt: new Date().toLocaleString(),
      status: "Confirmed",
      guests: 2,
      section: restaurant.isOpen ? "Main hall" : "Waitlist",
      arrival: `${restaurant.deliveryTime} min`,
    };

    setOrders((prev) => [newOrder, ...prev]);
  }

  function addReview(restaurantId, review) {
    setReviews((prev) => ({
      ...prev,
      [restaurantId]: [...(prev[restaurantId] || []), review],
    }));
  }

  const value = useMemo(
    () => ({
      restaurants,
      orders,
      reviews,
      toggleFavorite,
      createReservation,
      addReview,
    }),
    [restaurants, orders, reviews]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
}
