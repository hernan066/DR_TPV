import { useGetCategoriesQuery } from "../api/apiCategory";
import Loading from "../components/loading/Loading";
import { useGetOfertWithCategoryQuery } from "../api/apiOfert";
import { HomeLayout } from "../components/homeLayout/HomeLayout";
import { Categories } from "../components/categories/Categories";
import { useGetClientsQuery } from "../api/apiClient";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClients,
  getAllClientsAddresses,
  getAllDeliveries,
} from "../redux/clientsSlice";
import { getAllOferts } from "../redux/ofertsSlice";
import { Products } from "../components/products/Products";
import { useGetClientAddressesQuery } from "../api/apiClientsAddress";
import { useGetDeliveryTrucksQuery } from "../api/apiDeliveryTruck";

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
  const {
    data: allClientsAddresses,
    isLoading: l4,
    isError: e4,
  } = useGetClientAddressesQuery();
  const {
    data: allDelivery,
    isLoading: l5,
    isError: e5,
  } = useGetDeliveryTrucksQuery();
  console.log(allDelivery);

  useEffect(() => {
    if (allClients && allClientsAddresses && allDelivery) {
      dispatch(getAllClients(allClients.data.clients));
      dispatch(getAllClientsAddresses(allClientsAddresses.data.clientAddress));
      dispatch(getAllDeliveries(allDelivery.data.deliveryTrucks));
    }
  }, [allClients, allClientsAddresses, allDelivery, dispatch]);

  useEffect(() => {
    if (ofertsData) {
      const productsWithStockField = ofertsData.data.oferts
        .filter((ofert) => ofert.product.stock)
        .map((ofert) => {
          const stock = ofert.product.stock.reduce(
            (acc, curr) => curr.stock + acc,
            0
          );
          if (stock > 0) {
            return {
              ...ofert,
              existStock: true,
            };
          }
          return {
            ...ofert,
            existStock: false,
          };
        });

      const productWithStock = productsWithStockField.filter(
        (product) => product.existStock
      );

      dispatch(getAllOferts(productWithStock));
    }
  }, [ofertsData, dispatch]);

  return (
    <>
      <HomeLayout>
        {(l1 || l2 || l3 || l4 || l5) && <Loading />}
        {(e1 || e2 || e3 || e4 || e5) && <p>Ha ocurrido un error</p>}
        {!searchOfert && categoriesData && ofertsData && allDelivery && (
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
