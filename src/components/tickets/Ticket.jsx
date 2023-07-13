/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "./ticket.module.css";
import { openKeypad } from "../../redux/uiSlice";
import {
  clearActiveProduct,
  deleteProduct,
  setActiveProduct,
} from "../../redux/orderSlice";
import { formatPrice } from "../../utils/formatPrice";

const Product = ({ ofert }) => {
  const { active } = useSelector((store) => store.order);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (active == ofert._id) {
      dispatch(clearActiveProduct());
    } else {
      dispatch(clearActiveProduct());
      dispatch(setActiveProduct(ofert._id));
    }
  };

  return (
    <div
      className={active !== ofert._id ? styles.product : styles.product_active}
      onClick={handleClick}
    >
      <div className={styles.flex}>
        <div>
          <h4 style={{ display: "flex", gap: "5px" }}>
            <span className={styles.quantity}>{ofert.quantity}</span>
            {ofert.description} / Unid.({formatPrice(ofert.retailPrice)})
          </h4>
        </div>
        <h4>${ofert.totalPrice}</h4>
      </div>
    </div>
  );
};

export const Ticket = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.order);
  const { active, subTotal } = useSelector((store) => store.order);
  const handleDelete = () => {
    dispatch(deleteProduct(active));
  };

  return (
    <section className={styles.container}>
      <div className={styles.navbar}>
        <button
          className={styles.ticket_btn_delete}
          onClick={handleDelete}
          disabled={!active ? true : false}
        >
          Borrar
        </button>
        <button
          className={styles.ticket_btn_quantity}
          onClick={() => dispatch(openKeypad())}
          disabled={!active ? true : false}
        >
          Cantidad
        </button>
        <div className={styles.ticket_code}>Cod. 2315641312465132</div>
      </div>
      <div className={styles.products}>
        {products.map((ofert) => (
          <Product ofert={ofert} key={ofert._id} />
        ))}
      </div>
      <div className={styles.bottom}>
        <div className={styles.client}>
          <div className={styles.flex}>
            <h4 style={{ fontSize: "20px" }}>Cliente:</h4>
            <h4>Juan Carlos Moreno</h4>
          </div>
        </div>
        <div className={styles.total}>
          <div className={styles.flex}>
            <h4>Subtotal</h4>
            <h4>{formatPrice(subTotal || 0)}</h4>
          </div>
          <div className={styles.flex}>
            <h4>Impuestos</h4>
            <h4>$0</h4>
          </div>
          <div className={styles.divider}></div>
          <div
            className={styles.flex}
            style={{ fontSize: "30px", fontWeight: 800, letterSpacing: "2px" }}
          >
            <h4>Total</h4>
            <h4>{formatPrice(subTotal || 0)}</h4>
          </div>
        </div>
        <div className={styles.footer}>
          <button className={styles.ticket_btn_send}>Enviar a caja</button>
          <button className={styles.ticket_btn_cancel}>Cancelar orden</button>
        </div>
      </div>
    </section>
  );
};
