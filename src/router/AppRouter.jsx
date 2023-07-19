import { HashRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { CashierPage } from "../pages/CashierPage";
import { StocksPage } from "../pages/StocksPage";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/categoria/:id" element={<ProductsPage />} />
        <Route path="/oferta/:id" element={<StocksPage />} />
        <Route path="/caja" element={<CashierPage />} />
      </Routes>
    </HashRouter>
  );
};
