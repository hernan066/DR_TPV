/* eslint-disable react/prop-types */
import { AiOutlineClose } from "react-icons/ai";
import styles from "./navbar.module.css";
import { useDispatch } from "react-redux";
import { closePopupProducts } from "../../../../redux/uiSlice";

export const Navbar = ({ value, setValue }) => {
  const dispatch = useDispatch();
  return (
    <section className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Ingresa el nombre del producto"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button
        className={styles.btn_close}
        onClick={() => dispatch(closePopupProducts())}
      >
        <AiOutlineClose />
      </button>
    </section>
  );
};
