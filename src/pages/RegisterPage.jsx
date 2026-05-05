import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser, addToast } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      addToast("Бүх талбарыг бөглөнө үү.", "error");
      return;
    }
    if (password !== confirmPassword) {
      addToast("Нууц үг давтах талбар таарахгүй байна.", "error");
      return;
    }
    registerUser({ name, email, password });
    addToast("Бүртгэл амжилттай. Нэвтэрч орно уу.", "success");
    navigate("/login");
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo-mark" aria-hidden="true" />
          <h1 className="login-brand-name">BON DELICE</h1>
        </div>

        <form className="login-form register-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span className="sr-only">Овог, Нэр</span>
            <input type="text" placeholder="Овог, Нэр" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label className="login-field">
            <span className="sr-only">И-мэйл хаяг</span>
            <input type="email" placeholder="И-мэйл хаяг" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className="login-field">
            <span className="sr-only">Нууц үг</span>
            <input type="password" placeholder="Нууц үг" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          <label className="login-field">
            <span className="sr-only">Нууц үг давтах</span>
            <input type="password" placeholder="Нууц үг давтах" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>

          <button type="submit" className="login-submit-btn">
            Бүртгүүлэх
          </button>
        </form>

        <p className="login-signup">
          Бүртгэлтэй хэрэглэгч? <Link to="/login">Нэвтрэх</Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
