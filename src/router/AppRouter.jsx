import { HashRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { CashierPage } from "../pages/CashierPage";
import { StocksPage } from "../pages/StocksPage";
import PersistLogin from "./PersitRouter";
import RequireAuth from "./RequiereAuth";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/categoria/:id" element={<ProductsPage />} />
            <Route path="/oferta/:id" element={<StocksPage />} />
            <Route path="/caja" element={<CashierPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
