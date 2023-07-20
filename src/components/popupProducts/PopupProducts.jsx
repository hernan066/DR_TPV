import { useEffect, useState } from "react";
import { useGetOfertWithCategoryQuery } from "../../api/apiOfert";
import Loading from "../loading/Loading";
import styles from "./popupProducts.module.css";
import { useDispatch } from "react-redux";
import { getAllOferts } from "../../redux/ofertsSlice";
import { closePopupProducts } from "../../redux/uiSlice";
import { Navbar } from "./componets/Navbar/Navbar";
import { ProductsList } from "./componets/ProductsList/ProductsList";

export const PopupProducts = () => {
  const dispatch = useDispatch();

  const {
    data: ofertsData,
    isLoading: l1,
    isError: e1,
  } = useGetOfertWithCategoryQuery();

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

  const [value, setValue] = useState("");

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <Navbar value={value} setValue={setValue} />
        {l1 && <Loading />}
        {e1 && <p>Ha ocurrido un error</p>}
        {ofertsData && (
          <ProductsList oferts={ofertsData.data.oferts} value={value} />
        )}
      </div>
    </section>
  );
};
