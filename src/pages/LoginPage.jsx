import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function LoginPage() {
  const navigate = useNavigate();
  const { loginUser, addToast } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setErrorText("");
    if (!email.trim() || !password.trim()) {
      setErrorText("И-мэйл болон нууц үгээ оруулна уу.");
      addToast("И-мэйл болон нууц үгээ оруулна уу.", "error");
      return;
    }
    const result = loginUser(email, password);
    if (!result.ok) {
      if (result.reason === "not_registered") {
        setErrorText("Бүртгэл олдсонгүй. Эхлээд бүртгүүлнэ үү.");
        addToast("Эхлээд бүртгүүлнэ үү.", "error");
        navigate("/register");
        return;
      }
      setErrorText("Код буруу байна.");
      addToast("И-мэйл эсвэл нууц үг буруу байна.", "error");
      return;
    }
    addToast("Амжилттай нэвтэрлээ.", "success");
    navigate("/home");
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo-mark" aria-hidden="true" />
          <h1 className="login-brand-name">BON DELICE</h1>
        </div>

        <div className="login-social">
          <button type="button" className="login-social-btn">
            Facebook
          </button>
          <button type="button" className="login-social-btn">
            Google
          </button>
        </div>

        <p className="login-separator">Цахим хаягаараа нэвтэрнэ үү!</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span className="sr-only">И-мэйл</span>
            <input type="email" placeholder="И-мэйл" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className="login-field">
            <span className="sr-only">Нууц үг</span>
            <input type="password" placeholder="Нууц үг" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          <div className="login-actions-row">
            <label className="login-remember">
              <input type="checkbox" />
              <span>Намайг сана</span>
            </label>
            <button type="button" className="login-link-btn">
              Нууц үгээ мартсан уу?
            </button>
          </div>

          <button type="submit" className="login-submit-btn">
            Нэвтрэх
          </button>
          {errorText && <p className="login-error-text">{errorText}</p>}
        </form>

        <p className="login-signup">
          Шинэ хэрэглэгч? <Link to="/register">Бүртгүүлэх</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
