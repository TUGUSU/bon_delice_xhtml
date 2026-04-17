import React from "react";

function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <button
      type="button"
      className={isFavorite ? "fav-btn on" : "fav-btn"}
      onClick={onToggle}
      aria-pressed={isFavorite}
    >
      <span>{isFavorite ? "❤" : "♡"}</span>
      <span>{isFavorite ? "saved" : "save"}</span>
    </button>
  );
}

export default FavoriteButton;