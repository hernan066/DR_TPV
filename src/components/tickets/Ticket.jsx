import { useDispatch } from "react-redux";
import styles from "./ticket.module.css";
import { openKeypad } from "../../redux/uiSlice";

export const Ticket = () => {
  const dispatch = useDispatch();

  return (
    <section className={styles.container}>
      <div className={styles.navbar}>
        <button className={styles.ticket_btn_delete}>Borrar</button>
        <button
          className={styles.ticket_btn_quantity}
          onClick={() => dispatch(openKeypad())}
        >
          Cantidad
        </button>
        <div className={styles.ticket_code}>Cod. 2315641312465132</div>
      </div>
      <div className={styles.products}>
        <div className={styles.product}>
          <div className={styles.flex}>
            <div>
              <h4 style={{ display: "flex", gap: "5px" }}>
                <span className={styles.quantity}> 3 </span>Cajon de Pollo 7
                cabezas
              </h4>
            </div>
            <h4>$1.000</h4>
          </div>
        </div>
        <div className={styles.product_active}>
          <div className={styles.flex}>
            <div>
              <h4 style={{ display: "flex", gap: "5px" }}>
                <span className={styles.quantity}> 3.75 kg </span>Pechuga de
                pollo
              </h4>
            </div>
            <h4>$1.000</h4>
          </div>
        </div>
        <div className={styles.product}>
          <div className={styles.flex}>
            <div>
              <h4 style={{ display: "flex", gap: "5px" }}>
                <span className={styles.quantity}> 3 </span>Cajon de Pollo 7
                cabezas
              </h4>
            </div>
            <h4>$1.000</h4>
          </div>
        </div>
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
            <h4>$1.000</h4>
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
            <h4>$1.000</h4>
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
