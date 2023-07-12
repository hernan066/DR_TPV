/* eslint-disable react-hooks/exhaustive-deps */
import Loading from "../components/loading/Loading";
import { useGetOfertWithCategoryQuery } from "../api/apiOfert";

import { HomeLayout } from "../components/homeLayout/HomeLayout";
import { Products } from "../components/products/Products";

export const ProductsPage = () => {
  const {
    data: ofertsData,
    isLoading: l2,
    isError: e2,
  } = useGetOfertWithCategoryQuery();
  console.log(ofertsData);

  return (
    <HomeLayout>
      {l2 && <Loading />}
      {e2 && <p>Ha ocurrido un error</p>}
      {ofertsData && <Products oferts={ofertsData.data.oferts} />}
    </HomeLayout>
  );
};
