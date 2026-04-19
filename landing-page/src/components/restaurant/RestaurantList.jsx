import React from "react";
import RestaurantCard from "./RestaurantCard";

function RestaurantList({ restaurants, onToggleFavorite, onReserve }) {
  if (!restaurants.length) {
    return <div className="panel empty-state">Илэрц олдсонгүй.</div>;
  }

  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onToggleFavorite={onToggleFavorite}
          onReserve={onReserve}
        />
      ))}
    </div>
  );
}

export default RestaurantList;
