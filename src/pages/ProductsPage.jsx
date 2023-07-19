/* eslint-disable react-hooks/exhaustive-deps */

import { useSelector } from "react-redux";
import { HomeLayout } from "../components/homeLayout/HomeLayout";
import { Products } from "../components/products/Products";

export const ProductsPage = () => {
  const { allOferts, searchOfert } = useSelector((store) => store.oferts);
  return (
    <HomeLayout>
      {searchOfert ? (
        <Products oferts={searchOfert} />
      ) : (
        <Products oferts={allOferts} />
      )}
    </HomeLayout>
  );
};
