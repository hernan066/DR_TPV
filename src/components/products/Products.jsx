/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import styles from "./products.module.css";
import { IoMdArrowBack } from "react-icons/io";

export const Products = ({ oferts }) => {
  const { id } = useParams();
  const filterOferts = oferts.filter((ofert) => ofert.category._id == id);
  const navigate = useNavigate();
  return (
    <div className={styles.main_products}>
      <div className={styles.product_card} onClick={() => navigate(-1)}>
        <IoMdArrowBack />
        <h3>Volver</h3>
      </div>
      {filterOferts.map((ofert) => {
        return (
          <div className={styles.product_card} key={ofert._id}>
            <img src={ofert.product.img} alt={ofert.product.name} />
            <div className={styles.product_card_name}>
              <h3>{ofert.product.name}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
