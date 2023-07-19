import { useEffect } from "react";
import { useGetCategoriesQuery } from "../../api/apiCategory";
import { useGetClientsQuery } from "../../api/apiClient";
import { useGetOfertWithCategoryQuery } from "../../api/apiOfert";
import { Categories } from "../categories/Categories";
import Loading from "../loading/Loading";
import styles from "./popupProducts.module.css";
import { useDispatch } from "react-redux";
import { getAllClients } from "../../redux/clientsSlice";
import { getAllOferts } from "../../redux/ofertsSlice";
import { Pagination } from "../pagination/Pagination";
import { Navbar } from "../navbar/Navbar";
import { closePopupProducts } from "../../redux/uiSlice";

export const PopupProducts = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        dispatch(closePopupProducts());
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <Navbar />
        {(l1 || l2 || l3) && <Loading />}
        {(e1 || e2 || e3) && <p>Ha ocurrido un error</p>}
        {categoriesData && ofertsData && (
          <Categories
            categories={categoriesData.categories}
            oferts={ofertsData.data.oferts}
          />
        )}
        <Pagination />
      </div>
    </section>
  );
};
