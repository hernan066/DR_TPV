import styles from "./pagination.module.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchOfert } from "../../redux/ofertsSlice";

export const Pagination = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  return (
    <div className={styles.products_pagination}>
      <div className={styles.products_pagination_flex}>
        <div>
          Vendedor {user?.name} {user?.lastName}
        </div>
        <div className={styles.flex}>
          {/*   <BsChevronDoubleLeft />
           */}
          <BsChevronLeft
            onClick={() => {
              navigate(-1);
              dispatch(clearSearchOfert());
            }}
          />

          <AiOutlineHome
            onClick={() => {
              navigate("/");
              dispatch(clearSearchOfert());
            }}
          />
          <BsChevronRight
            onClick={() => {
              navigate(+1);
              dispatch(clearSearchOfert());
            }}
          />

          {/*     <BsChevronRight />
          <BsChevronDoubleRight /> */}
        </div>
      </div>
    </div>
  );
};
