/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./cashOut.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCashOut,
  keypadModeCash,
  keypadModeDebt,
  keypadModeTransfer,
  openKeypad,
} from "../../redux/uiSlice";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { formatPrice } from "../../utils/formatPrice";
import { Receipt } from "../receipt/Receipt";
import { usePutOrderMutation } from "../../api/apiOrder";
import Swal from "sweetalert2";
import {
  clearOrdersList,
  clearPayment,
  setCash,
  setDebt,
  setTransfer,
} from "../../redux/ordersSlice";
import { CgKeyboard } from "react-icons/cg";

export const CashOut = () => {
  const { selectOrder, payment } = useSelector((store) => store.ordersList);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [sendOrder, { isLoading, isError }] = usePutOrderMutation();

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

  const handlerCash = () => {
    const rest = selectOrder.subTotal - payment.transfer - payment.debt;
    dispatch(setCash(rest));
  };
  const handlerTransfer = () => {
    const rest = selectOrder.subTotal - payment.cash - payment.debt;
    dispatch(setTransfer(rest));
  };
  const handlerDebt = () => {
    const rest = selectOrder.subTotal - payment.transfer - payment.cash;

    dispatch(setDebt(rest));
  };

  const handleConfirmOrder = async () => {
    if (+payment.cash + +payment.transfer + +payment.debt > selectOrder.total) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: `La suma del total de pagos(${formatPrice(
          +payment.cash + +payment.transfer + +payment.debt
        )}) supera el total de la orden`,
        showConfirmButton: true,
        confirmButtonColor: "#d33",
      });
    }
    if (+payment.cash + +payment.transfer + +payment.debt === 0) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: `El monto total pagos no puede ser 0, si la orden no se abonara, complete el total en "DEUDA"`,
        showConfirmButton: true,
        confirmButtonColor: "#d33",
      });
    }
    if (
      +payment.cash + +payment.transfer + +payment.debt !==
      +selectOrder.total
    ) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: `La suma de monto total pagos (${formatPrice(
          +payment.cash + +payment.transfer + +payment.debt
        )}) no coincide con el total de la orden`,
        showConfirmButton: true,
        confirmButtonColor: "#d33",
      });
    }
    const order = {
      userCashier: user, // id del usuario cajero
      userSeller: selectOrder.userSeller,
      client: selectOrder.client._id,
      userId: selectOrder.userId._id,
      cashierMode: false, // cambiamos a false porque va a db definitivamente
      receiptId: selectOrder?.receiptId,

      orderItems: selectOrder.orderItems,

      shippingAddress: selectOrder.shippingAddress,

      deliveryTruck: selectOrder.deliveryTruck,
      employee: null, //este esta de mas, borrar
      deliveryZone: selectOrder.deliveryZone,
      numberOfItems: selectOrder.numberOfItems,
      tax: selectOrder.tax,
      subTotal: selectOrder.subTotal,
      total: selectOrder.total,

      status: "Entregado", // Entregado
      active: false, //solo si es de reparto

      commentary: "",

      payment: {
        cash: +payment.cash,
        transfer: +payment.transfer,
        debt: +payment.debt,
      },

      paid: +payment.cash + +payment.transfer === selectOrder.total,
      discount: 0,

      deliveryDate: new Date(),

      state: true, // cambiar en producción
    };
    const id = selectOrder._id;
    const res = await sendOrder({ id, ...order });
    if (res.data.ok) {
      //close
      dispatch(closeCashOut());
      //confirm
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Orden creada con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
      //clear state
      dispatch(clearOrdersList(id));
      dispatch(clearPayment());
    }
  };
  console.log(payment);
  return (
    <section className={styles.container}>
      <div className={styles.window_container}>
        <div className={styles.nav}>
          <button
            className={styles.close}
            onClick={() => {
              dispatch(closeCashOut());
              dispatch(clearPayment());
            }}
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
                <div className={styles.input_wrapper}>
                  <input
                    type="number"
                    placeholder="Pago en efectivo"
                    style={{ outlineColor: "green" }}
                    autoFocus
                    //defaultValue={0}
                    value={payment.cash}
                    onChange={(e) => dispatch(setCash(e.target.value))}
                  />
                  <button
                    className={styles.btn_keypad}
                    onClick={() => {
                      dispatch(openKeypad());
                      dispatch(keypadModeCash());
                    }}
                  >
                    <CgKeyboard />
                  </button>
                </div>
                <button onClick={handlerCash} className={styles.btn_cash}>
                  $ Efectivo
                </button>
              </div>
              <div className={styles.input_container}>
                <div className={styles.input_wrapper}>
                  <input
                    type="number"
                    placeholder="Pago en transferencia"
                    style={{ outlineColor: "green" }}
                    value={payment.transfer}
                    onChange={(e) => dispatch(setTransfer(e.target.value))}
                  />
                  <button
                    className={styles.btn_keypad}
                    onClick={() => {
                      dispatch(openKeypad());
                      dispatch(keypadModeTransfer());
                    }}
                  >
                    <CgKeyboard />
                  </button>
                </div>
                <button onClick={handlerTransfer} className={styles.btn_cash}>
                  $ Transferencia
                </button>
              </div>
              <div className={styles.input_container}>
                <div className={styles.input_wrapper}>
                  <input
                    type="number"
                    placeholder="Deuda de compra"
                    style={{ outlineColor: "red" }}
                    value={payment.debt}
                    onChange={(e) => dispatch(setDebt(e.target.value))}
                  />
                  <button
                    className={styles.btn_keypad}
                    onClick={() => {
                      dispatch(openKeypad());
                      dispatch(keypadModeDebt());
                    }}
                  >
                    <CgKeyboard />
                  </button>
                </div>
                <button id={styles.btn_debt} onClick={handlerDebt}>
                  $ Deuda
                </button>
              </div>
            </div>
            <div className={styles.send_order}>
              <Receipt />
              <button onClick={handleConfirmOrder}>
                <AiOutlineCheck /> Confirmar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
