/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import styles from "./products.module.css";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchOfert } from "../../redux/ofertsSlice";

export const Products = () => {
  const { id } = useParams();
  const { searchOfert, allOferts } = useSelector((store) => store.oferts);
  const filterOferts = allOferts
    .filter((ofert) => ofert.category._id == id)
    .sort((a, b) => {
      if (a.description < b.description) {
        return -1;
      }
      if (a.description > b.description) {
        return 1;
      }
      return 0;
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={styles.scroll}>
      <div className={styles.main_products}>
        <div
          className={styles.product_card}
          onClick={() => {
            navigate("/");
            dispatch(clearSearchOfert());
          }}
        >
          <IoMdArrowBack />
          <h3>Volver</h3>
        </div>
        {searchOfert &&
          searchOfert.map((ofert) => {
            return (
              <div
                className={styles.product_card}
                key={ofert._id}
                onClick={() => navigate(`/oferta/${ofert._id}`)}
              >
                <img src={ofert.product.img} alt={ofert.product.name} />
                <div className={styles.product_card_name}>
                  <h3>{ofert.description}</h3>
                </div>
              </div>
            );
          })}
        {!searchOfert &&
          filterOferts.map((ofert) => {
            return (
              <div
                className={styles.product_card}
                key={ofert._id}
                onClick={() => navigate(`/oferta/${ofert._id}`)}
              >
                <img src={ofert.product.img} alt={ofert.product.name} />
                <div className={styles.product_card_name}>
                  <h3>{ofert.description}</h3>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
