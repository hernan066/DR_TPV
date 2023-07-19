import { useDispatch, useSelector } from "react-redux";
import styles from "./menu.module.css";
import { GrClose } from "react-icons/gr";
import { closeMenu } from "../../redux/uiSlice";
import { Link } from "react-router-dom";

export const Menu = () => {
  const dispatch = useDispatch();
  const { menu } = useSelector((store) => store.ui);
  return (
    <section className={menu ? styles.container_active : styles.container}>
      <button
        className={styles.btn_close}
        onClick={() => dispatch(closeMenu())}
      >
        <GrClose />
      </button>
      <h2>Menu</h2>
      <ul className={styles.menu_list}>
        <Link to={"/"} onClick={() => dispatch(closeMenu())}>
          <li>Modo Vendedor</li>
        </Link>
        <Link to={"/caja"} onClick={() => dispatch(closeMenu())}>
          <li>Modo Cajero</li>
        </Link>
        <li>Abrir Caja</li>
        <li>Cerrar Caja</li>
        <li>Cerrar Sesión</li>
      </ul>
    </section>
  );
};
