import styles from "./pagination.module.css";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";

export const Pagination = () => {
  return (
    <div className={styles.products_pagination}>
      <div className={styles.products_pagination_flex}>
        <div>Pagina 1 / 3</div>
        <div className={styles.flex}>
          <BsChevronDoubleLeft />
          <BsChevronLeft />

          <AiOutlineHome />

          <BsChevronRight />
          <BsChevronDoubleRight />
        </div>
      </div>
    </div>
  );
};
