import { HashRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/categoria/:id" element={<ProductsPage />} />
      </Routes>
    </HashRouter>
  );
};
