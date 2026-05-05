import { useState } from "react";

function ReviewItem({ title, user, date, rating = 4 }) {
  const [likes,    setLikes]    = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [vote,     setVote]     = useState(null); // "like" | "dislike" | null

  const handleLike = () => {
    if (vote === "like") {  
      setLikes(l => l - 1);
      setVote(null);
    } else {
      if (vote === "dislike") setDislikes(d => d - 1); // undo previous dislike
      setLikes(l => l + 1);
      setVote("like");
    }
  };

  const handleDislike = () => {
    if (vote === "dislike") {
      // Already disliked → undo
      setDislikes(d => d - 1);
      setVote(null);
    } else {
      if (vote === "like") setLikes(l => l - 1); // undo previous like
      setDislikes(d => d + 1);
      setVote("dislike");
    }
  };

  const stars = "⭐".repeat(Math.max(1, Math.min(rating, 5)));

  return (
    <div className="reviewitem">
      <div className="reviewitem__left">
        <div className="bubble">
          {user?.charAt(0)?.toUpperCase() ?? "?"}
        </div>
        <div>
          <div className="reviewitem__title">{stars} {title}</div>
          <div className="reviewitem__meta">{user} • {date}</div>
        </div>
      </div>

      <div className="reviewitem__right">
        <button
          className={`btn-ghost vote-btn ${vote === "like" ? "vote-active" : ""}`}
          onClick={handleLike}
          title="Таалагдсан"
        >
          👍 {likes > 0 && <span className="vote-count">{likes}</span>}
        </button>
        <button
          className={`btn-ghost vote-btn ${vote === "dislike" ? "vote-active-bad" : ""}`}
          onClick={handleDislike}
          title="Таалагдаагүй"
        >
          👎 {dislikes > 0 && <span className="vote-count">{dislikes}</span>}
        </button>
      </div>
    </div>
  );
}

export default ReviewItem;