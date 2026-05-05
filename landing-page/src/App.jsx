import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import RestaurantsPage from "./pages/RestaurantsPage";
import FavoritesPage from "./pages/FavoritesPage";
import OrdersPage from "./pages/OrdersPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import VenuePlaceholderPage from "./pages/VenuePlaceholderPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="restaurants" element={<RestaurantsPage />} />
        <Route path="restaurants/:id" element={<RestaurantDetailPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="pub" element={<VenuePlaceholderPage title="Pub" description="Удахгүй шилдэг pub-уудын жагсаалт энд нэмэгдэнэ." />} />
        <Route path="karaoke" element={<VenuePlaceholderPage title="Karaoke" description="Удахгүй karaoke reservation хэсэг энд нээгдэнэ." />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
