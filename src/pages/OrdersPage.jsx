import React from "react";
import { useApp } from "../context/AppContext";

function OrdersPage() {
  const { orders } = useApp();

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Reservations</p>
          <h2>My reservations</h2>
        </div>
      </div>

      {!orders.length ? (
        <div className="panel empty-state">Одоогоор захиалсан ширээ байхгүй байна.</div>
      ) : (
        <div className="stack-md">
          {orders.map((order) => (
            <article key={order.id} className="panel">
              <div className="page-heading compact">
                <div>
                  <h3>{order.venueName}</h3>
                  <p>{order.createdAt}</p>
                </div>
                <strong>{order.status}</strong>
              </div>
              <ul className="plain-list">
                <li>Guests: {order.guests}</li>
                <li>Section: {order.section}</li>
                <li>Estimated arrival: {order.arrival}</li>
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default OrdersPage;
