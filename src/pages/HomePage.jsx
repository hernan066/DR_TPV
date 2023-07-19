import { useGetCategoriesQuery } from "../api/apiCategory";
import Loading from "../components/loading/Loading";
import { useGetOfertWithCategoryQuery } from "../api/apiOfert";
import { HomeLayout } from "../components/homeLayout/HomeLayout";
import { Categories } from "../components/categories/Categories";
import { useGetClientsQuery } from "../api/apiClient";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClients } from "../redux/clientsSlice";
import { getAllOferts } from "../redux/ofertsSlice";
import { Products } from "../components/products/Products";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { searchOfert } = useSelector((store) => store.oferts);
  const {
    data: categoriesData,
    isLoading: l1,
    isError: e1,
  } = useGetCategoriesQuery();
  const {
    data: ofertsData,
    isLoading: l2,
    isError: e2,
  } = useGetOfertWithCategoryQuery();

  const { data: allClients, isLoading: l3, isError: e3 } = useGetClientsQuery();

  useEffect(() => {
    if (allClients) {
      dispatch(getAllClients(allClients.data.clients));
    }
  }, [allClients, dispatch]);

  useEffect(() => {
    if (ofertsData) {
      dispatch(getAllOferts(ofertsData.data.oferts));
    }
  }, [ofertsData, dispatch]);

  return (
    <>
      <HomeLayout>
        {(l1 || l2 || l3) && <Loading />}
        {(e1 || e2 || e3) && <p>Ha ocurrido un error</p>}
        {!searchOfert && categoriesData && ofertsData && (
          <Categories
            categories={categoriesData.categories}
            oferts={ofertsData.data.oferts}
          />
        )}
        {searchOfert && <Products />}
      </HomeLayout>
    </>
  );
};
