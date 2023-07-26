import { useEffect } from "react";
import styles from "./cashOut.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeCashOut } from "../../redux/uiSlice";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlinePrinter,
} from "react-icons/ai";
import { formatPrice } from "../../utils/formatPrice";

export const CashOut = () => {
  const { selectOrder } = useSelector((store) => store.ordersList);
  const dispatch = useDispatch();
  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      dispatch(closeCashOut());
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.window_container}>
        <div className={styles.nav}>
          <button
            className={styles.close}
            onClick={() => dispatch(closeCashOut())}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className={styles.products}>
          <div className={styles.titles}>
            <div className={styles.col1}>
              <h3>Cantidad</h3>
            </div>
            <div className={styles.col2}>
              <h3>Producto</h3>
            </div>
            <div className={styles.col3}>
              <h3>$ Unidad</h3>
            </div>
            <div className={styles.col4}>
              <h3>Total</h3>
            </div>
          </div>
          {selectOrder.orderItems.map((product) => {
            return (
              <div className={styles.product} key={product._id}>
                <div className={styles.col1}>
                  <h3>{product.totalQuantity} unid.</h3>
                </div>
                <div className={styles.col2}>
                  <h3>{product.name}</h3>
                </div>
                <div className={styles.col3}>
                  <h3>{formatPrice(product.unitPrice)}</h3>
                </div>
                <div className={styles.col4}>
                  <h3>{formatPrice(product.totalPrice)}</h3>
                </div>
              </div>
            );
          })}

          <div className={styles.data}>
            <div className={styles.totals}>
              <div className={styles.row}>
                <h3>Cliente</h3>
                <h3>{`${selectOrder.userId.name} ${selectOrder.userId.lastName}`}</h3>
              </div>
              <div className={styles.row}>
                <h3>Subtotal</h3>
                <h3>{formatPrice(selectOrder.subTotal)}</h3>
              </div>
              <div className={styles.row}>
                <h3>Envío</h3>
                <h3>{formatPrice(selectOrder.tax)}</h3>
              </div>
              <div
                className={styles.row}
                style={{ fontSize: "30px", letterSpacing: "3px" }}
              >
                <h3>Total</h3>
                <h3>{formatPrice(selectOrder.total)}</h3>
              </div>
            </div>
            <div className={styles.data_entry}>
              <div className={styles.input_container}>
                <input
                  type="number"
                  placeholder="Pago en efectivo"
                  style={{ outlineColor: "green" }}
                  autoFocus
                  defaultValue={0}
                />
                <button>$ Efectivo</button>
              </div>
              <div className={styles.input_container}>
                <input
                  type="number"
                  placeholder="Pago en transferencia"
                  style={{ outlineColor: "green" }}
                  defaultValue={0}
                />
                <button>$ Transferencia</button>
              </div>
              <div className={styles.input_container}>
                <input
                  type="number"
                  placeholder="Deuda de compra"
                  style={{ outlineColor: "red" }}
                  defaultValue={0}
                />
                <button id={styles.btn_debt}>$ Deuda</button>
              </div>
            </div>
            <div className={styles.send_order}>
              <button id={styles.btn_ticket}>
                <AiOutlinePrinter /> Imprimir Ticket
              </button>
              <button>
                <AiOutlineCheck /> Confirmar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
