import { Ticket } from "../tickets/Ticket";
import styles from "./products.module.css";

export const Products = () => {
  return (
    <section className={styles.container}>
      <div className={styles.products_container}>
        <div className={styles.navbar}>
          <button className={styles.navbar_btn}>###</button>
          <button className={styles.navbar_btn}>123</button>
          <button className={styles.navbar_btn}>abc</button>
          <input
            className={styles.navbar_input}
            type="text"
            placeholder="Ingresa el producto"
          />
        </div>
        <div className={styles.main_products}>
          <div className={styles.product_card}>
            <img
              src="https://ik.imagekit.io/mrprwema7/product_nTli_VDMc.png?updatedAt=1680346537910"
              alt="producto"
            />
            <div className={styles.product_card_name}>
              <h3>Nombre Producto</h3>
            </div>
          </div>
          <div className={styles.product_card}>
            <img
              src="https://ik.imagekit.io/mrprwema7/product_nTli_VDMc.png?updatedAt=1680346537910"
              alt="producto"
            />
            <div className={styles.product_card_name}>
              <h3>Nombre Producto</h3>
            </div>
          </div>
          <div className={styles.product_card}>
            <img
              src="https://ik.imagekit.io/mrprwema7/product_nTli_VDMc.png?updatedAt=1680346537910"
              alt="producto"
            />
            <div className={styles.product_card_name}>
              <h3>Nombre Producto</h3>
            </div>
          </div>
          <div className={styles.product_card}>
            <img
              src="https://ik.imagekit.io/mrprwema7/product_nTli_VDMc.png?updatedAt=1680346537910"
              alt="producto"
            />
            <div className={styles.product_card_name}>
              <h3>Nombre Producto</h3>
            </div>
          </div>
          <div className={styles.product_card}>
            <img
              src="https://ik.imagekit.io/mrprwema7/product_nTli_VDMc.png?updatedAt=1680346537910"
              alt="producto"
            />
            <div className={styles.product_card_name}>
              <h3>Nombre Producto</h3>
            </div>
          </div>
          <div className={styles.product_card}>
            <img
              src="https://ik.imagekit.io/mrprwema7/product_nTli_VDMc.png?updatedAt=1680346537910"
              alt="producto"
            />
            <div className={styles.product_card_name}>
              <h3>Nombre Producto</h3>
            </div>
          </div>
        </div>
        <div className={styles.products_pagination}>Botones de pagination</div>
      </div>
      <div className={styles.ticket_container}>
        <Ticket />
      </div>
    </section>
  );
};
