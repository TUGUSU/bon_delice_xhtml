import React from "react";
import RestaurantList from "../components/restaurant/RestaurantList";
import { useApp } from "../context/AppContext";

function FavoritesPage() {
  const { restaurants, toggleFavorite, createReservation } = useApp();
  const favorites = restaurants.filter((item) => item.isFavorite);

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Favorites</p>
          <h2>Saved places</h2>
        </div>
      </div>
      <RestaurantList
        restaurants={favorites}
        onToggleFavorite={toggleFavorite}
        onReserve={createReservation}
      />
    </section>
  );
}

export default FavoritesPage;
