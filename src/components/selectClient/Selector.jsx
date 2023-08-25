import { useEffect } from "react";
import styles from "./client.module.css";
import { useDispatch } from "react-redux";
import {
  closeSelector,
  openDeliveryOrder,
  openLocalOrder,
} from "../../redux/uiSlice";

export const Selector = () => {
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      dispatch(closeSelector());
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.client_box_selector}>
        <button
          className={styles.bnt_close}
          onClick={() => dispatch(closeSelector())}
        >
          x
        </button>
        <div className={styles.btn_container}>
          <h2>Selecciona el tipo de orden</h2>
          <button
            className={styles.btn_select_order}
            onClick={() => dispatch(openDeliveryOrder())}
          >
            Orden de reparto
          </button>
          <button
            className={styles.btn_select_order}
            onClick={() => dispatch(openLocalOrder())}
          >
            Orden local
          </button>
        </div>
      </div>
    </section>
  );
};
