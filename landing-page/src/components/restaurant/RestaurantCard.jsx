import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../common/FavoriteButton";

function getStarString(rating) {
  const full = Math.round(rating);
  const empty = 5 - full;
  return "★".repeat(full) + "☆".repeat(empty);
}

function RestaurantCard({ restaurant, onToggleFavorite, onReserve }) {
  return (
    <article className="item">
      <img className="thumb" src={restaurant.image} alt={restaurant.imageAlt} />
      <div className="meta">
        <div className="item-head">
          <Link to={`/restaurants/${restaurant.id}`} className="title-link">
            <h4>{restaurant.name}</h4>
          </Link>
          <FavoriteButton
            isFavorite={restaurant.isFavorite}
            onToggle={() => onToggleFavorite(restaurant.id)}
          />
        </div>

        <p className="rate">
          <span className="n">{restaurant.rating.toFixed(1)}</span>
          <span className="stars"> {getStarString(restaurant.rating)} </span>
          <span className="c">({restaurant.reviewCount})</span>
        </p>

        <p className="tag">{restaurant.tags.map((tag) => `#${tag}`).join(" ")}</p>
        <p>{restaurant.description}</p>
        <p className="tag">
          {restaurant.priceRange} · {restaurant.deliveryTime} min · {restaurant.distance} км ·
          <span className={restaurant.isOpen ? "status-open" : "status-closed"}>
            {restaurant.isOpen ? " нээлттэй" : " хаалттай"}
          </span>
        </p>

        <div className="action-row">
          <Link to={`/restaurants/${restaurant.id}`} className="ghost-btn inline-btn">Details</Link>
          <button type="button" className="primary-btn" onClick={() => onReserve(restaurant)}>
            Reserve table
          </button>
        </div>
      </div>
    </article>
  );
}

export default RestaurantCard;
