import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, logoutUser, addToast } = useApp();

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  function handleLogout() {
    logoutUser();
    addToast("Системээс гарлаа.", "info");
    navigate("/login");
  }

  return (
    <section className="profile-page">
      <div className="profile-card">
        <div className="profile-top-actions">
          <Link to="/home" className="profile-icon-btn" aria-label="Буцах">
            &#10094;
          </Link>
          <button type="button" className="profile-icon-btn" aria-label="Тохиргоо">
            &#9881;
          </button>
        </div>

        <div className="profile-user-row">
          <div className="profile-avatar" aria-hidden="true">
            <span>&#128247;</span>
          </div>
          <div>
            <h2 className="profile-name">{currentUser.name}</h2>
            <p className="profile-email">{currentUser.email}</p>
            <p className="profile-subtext">Хувийн мэдээллээ шинэчилнэ үү</p>
          </div>
        </div>

        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          <label className="profile-field-label">Овог, нэр</label>
          <div className="profile-field-wrap">
            <span className="profile-field-icon">&#128100;</span>
            <input type="text" defaultValue={currentUser.name} />
          </div>

          <label className="profile-field-label">И-мэйл</label>
          <div className="profile-field-wrap">
            <span className="profile-field-icon">&#9993;</span>
            <input type="email" defaultValue={currentUser.email} />
          </div>

          <div className="profile-actions">
            <button type="submit" className="profile-save-btn">
              Хадгалах
            </button>
            <button type="button" className="profile-logout-btn" onClick={handleLogout}>
              Гарах
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProfilePage;
