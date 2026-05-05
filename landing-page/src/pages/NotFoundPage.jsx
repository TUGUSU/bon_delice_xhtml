import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="panel empty-state">
      <h2>404</h2>
      <p>This route does not exist.</p>
      <Link to="/home" className="primary-btn">Go home</Link>
    </section>
  );
}

export default NotFoundPage;
