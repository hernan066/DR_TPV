/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./categories.module.css";

export const Categories = ({ categories }) => {
  return (
    <div className={styles.main_products}>
      {categories.map((category) => {
        return (
          <div className={styles.product_card} key={category._id}>
            <Link to={`/categoria/${category._id}`}>
              <img src={category.img} alt={category.name} />
              <div className={styles.product_card_name}>
                <h3>{category.name}</h3>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
