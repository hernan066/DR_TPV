import styles from "./pagination.module.css";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSearchOfert } from "../../redux/ofertsSlice";

export const Pagination = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={styles.products_pagination}>
      <div className={styles.products_pagination_flex}>
        <div>Pagina 1 / 3</div>
        <div className={styles.flex}>
          <BsChevronDoubleLeft />
          <BsChevronLeft />

          <AiOutlineHome
            onClick={() => {
              navigate("/");
              dispatch(clearSearchOfert());
            }}
          />

          <BsChevronRight />
          <BsChevronDoubleRight />
        </div>
      </div>
    </div>
  );
};
