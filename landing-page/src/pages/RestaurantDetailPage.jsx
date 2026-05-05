import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../components/common/Modal";
import { useApp } from "../context/AppContext";

function RestaurantDetailPage() {
  const { id } = useParams();
  const { restaurants, createReservation, reviews, addReview } = useApp();
  const restaurant = restaurants.find((item) => String(item.id) === id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  if (!restaurant) {
    return <div className="panel empty-state">Restaurant not found.</div>;
  }

  const reviewList = reviews[restaurant.id] || [];

  function handleSubmit(event) {
    event.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    addReview(restaurant.id, {
      id: Date.now(),
      author: author.trim(),
      comment: comment.trim(),
    });

    setAuthor("");
    setComment("");
    setIsModalOpen(false);
  }

  return (
    <section className="stack-md">
      <div className="detail-card panel">
        <img src={restaurant.image} alt={restaurant.imageAlt} className="detail-image" />
        <div>
          <p className="eyebrow">Venue details</p>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.description}</p>
          <p>{restaurant.tags.join(", ")}</p>
          <p>{restaurant.rating.toFixed(1)} rating · {restaurant.reviewCount} reviews</p>
          <p>{restaurant.priceRange} · {restaurant.distance} км · {restaurant.deliveryTime} min away</p>
          <div className="action-row">
            <button type="button" className="primary-btn" onClick={() => createReservation(restaurant)}>Reserve table</button>
            <button type="button" className="ghost-btn inline-btn" onClick={() => setIsModalOpen(true)}>Write review</button>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="page-heading compact">
          <h3>Customer reviews</h3>
          <span>{reviewList.length}</span>
        </div>
        {!reviewList.length ? (
          <p className="empty-state">Одоогоор сэтгэгдэл байхгүй байна.</p>
        ) : (
          <div className="stack-sm">
            {reviewList.map((review) => (
              <article key={review.id} className="review-card">
                <strong>{review.author}</strong>
                <p>{review.comment}</p>
              </article>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} title="Write a review" onClose={() => setIsModalOpen(false)}>
        <form className="stack-sm" onSubmit={handleSubmit}>
          <label>
            Name
            <input value={author} onChange={(event) => setAuthor(event.target.value)} />
          </label>
          <label>
            Comment
            <textarea value={comment} onChange={(event) => setComment(event.target.value)} rows="4" />
          </label>
          <button type="submit" className="primary-btn">Save review</button>
        </form>
      </Modal>
    </section>
  );
}

export default RestaurantDetailPage;
