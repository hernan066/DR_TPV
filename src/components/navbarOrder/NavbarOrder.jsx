import { useDispatch } from "react-redux";
import styles from "./navbar.module.css";
import { openMenu } from "../../redux/uiSlice";
import { AiOutlineMenu } from "react-icons/ai";

export const NavbarOrder = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.navbar}>
      <button className={styles.btn_menu} onClick={() => dispatch(openMenu())}>
        <AiOutlineMenu />
      </button>
      <div className={styles.navbar_title}>
        <h2>Lista de ordenes</h2>
      </div>
    </div>
  );
};
