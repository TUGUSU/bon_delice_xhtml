import React, { useMemo, useState } from "react";
import FilterPanel from "../components/restaurant/FilterPanel";
import RestaurantList from "../components/restaurant/RestaurantList";
import { useApp } from "../context/AppContext";

const initialFilters = {
  query: "",
  category: "",
  minRating: 0,
  open: "all",
};

function RestaurantsPage() {
  const { restaurants, toggleFavorite, createReservation } = useApp();
  const [filters, setFilters] = useState(initialFilters);

  function handleChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((item) => {
      const matchesQuery = !filters.query || item.name.toLowerCase().includes(filters.query.toLowerCase());
      const matchesCategory = !filters.category || item.category === filters.category;
      const matchesRating = item.rating >= filters.minRating;
      const matchesOpen =
        filters.open === "all" ||
        (filters.open === "open" && item.isOpen) ||
        (filters.open === "closed" && !item.isOpen);

      return matchesQuery && matchesCategory && matchesRating && matchesOpen;
    });
  }, [restaurants, filters]);

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Restaurants</p>
          <h2>Choose a place to reserve</h2>
        </div>
        <p>{filteredRestaurants.length} results</p>
      </div>

      <FilterPanel
        filters={filters}
        onChange={handleChange}
        onReset={() => setFilters(initialFilters)}
      />

      <RestaurantList
        restaurants={filteredRestaurants}
        onToggleFavorite={toggleFavorite}
        onReserve={createReservation}
      />
    </section>
  );
}

export default RestaurantsPage;
