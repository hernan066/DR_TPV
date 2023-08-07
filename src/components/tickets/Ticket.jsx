/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "./ticket.module.css";
import {
  keypadModeQuantity,
  openClient,
  openKeypad,
} from "../../redux/uiSlice";
import {
  clearActiveProduct,
  clearCart,
  deleteProduct,
  setActiveProduct,
} from "../../redux/orderSlice";
import { formatPrice } from "../../utils/formatPrice";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { usePostOrderMutation } from "../../api/apiOfert";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { AiOutlineDelete } from "react-icons/ai";
import { GoNumber } from "react-icons/go";
import { usePutProductStockMutation } from "../../api/apiProducts";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const { active } = useSelector((store) => store.order);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (active == product.uniqueId) {
      dispatch(clearActiveProduct());
    } else {
      dispatch(clearActiveProduct());
      dispatch(setActiveProduct(product.uniqueId));
    }
  };

  return (
    <div
      className={
        active !== product.uniqueId ? styles.product : styles.product_active
      }
      onClick={handleClick}
    >
      <div className={styles.flex}>
        <div>
          <h4 style={{ display: "flex", gap: "5px" }}>
            <span className={styles.quantity}>{product.totalQuantity}</span>
            {product.description} / Unid.({formatPrice(product.unitPrice)})
          </h4>
        </div>
        <h4>{formatPrice(product.totalPrice)}</h4>
      </div>
    </div>
  );
};

export const Ticket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const { products, client, active, subTotal } = useSelector(
    (store) => store.order
  );
  const { user } = useSelector((store) => store.auth);

  const [sendOrder, { isLoading: l1, isError: e1 }] = usePostOrderMutation();
  const [editProductStock, { isLoading: l2, isError: e2 }] =
    usePutProductStockMutation();

  const handleDelete = () => {
    dispatch(deleteProduct(active));
  };

  const handleSendOrder = async () => {
    const order = {
      userCashier: null, // id del usuario cajero
      userSeller: user, // id del usuario vendedor
      client: client._id,
      userId: client.user._id,
      cashierMode: true, // para ser vista por el cajero al buscar en db
      receiptId: Date.now(),

      orderItems: products,

      shippingAddress: {
        addressId: null,
        name: client.user.name,
        lastName: client.user.lastName,
        phone: client.user.phone,
        address: null,
        flor: null,
        department: null,
        city: null,
        province: null,
        zip: null,
        lat: null,
        lng: null,
      },

      deliveryTruck: null,
      employee: null, //este esta de mas, borrar
      deliveryZone: null,
      numberOfItems: products.length,
      tax: 0,
      subTotal: subTotal,
      total: subTotal,

      status: "Pendiente", // Entregado
      active: false, //solo si es de reparto

      commentary: "",

      payment: {
        cash: 0,
        transfer: 0,
        debt: 0,
      },

      paid: false,
      discount: 0,

      deliveryDate: null,

      state: false, // cambiar en producción

      //datos que no va a DB
      orderId: uuidv4(),
      clientFullName: `${client.user.name} ${client.user.lastName}`,
      date: new Date(),
    };

    const productsToEdit = products.map((product) => ({
      productId: product.productId,
      stockId: product.stockId,
      totalQuantity: product.totalQuantity,
    }));

    const res1 = await sendOrder(order);

    productsToEdit.map(async (product) => {
      const updateData = {
        /*  stockId: product.stockId, */
        totalQuantity: product.totalQuantity,
      };
      const id = product.productId;
      const res2 = await editProductStock({ id, ...updateData }).unwrap();
      console.log(res2);
    });

    if (!e1 || !e2) {
      socket.emit("order", res1.data.data.order);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Orden enviada a caja",
        showConfirmButton: false,
        timer: 2500,
      });
      dispatch(clearCart());
      navigate("/");
    }
  };

  useEffect(() => {
    if (e1 || e2)
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error, orden no enviada",
        showConfirmButton: false,
        timer: 2500,
      });
  }, [e1, e2]);

  return (
    <section className={styles.container}>
      <div className={styles.navbar}>
        <button
          className={styles.ticket_btn_delete}
          onClick={handleDelete}
          disabled={!active ? true : false}
        >
          <AiOutlineDelete /> Borrar
        </button>
        <button
          className={styles.ticket_btn_quantity}
          onClick={() => {
            dispatch(openKeypad());
            dispatch(keypadModeQuantity());
          }}
          disabled={!active ? true : false}
        >
          <GoNumber /> Cantidad
        </button>
      </div>
      <div className={styles.products}>
        {products.map((product) => (
          <Product product={product} key={product.uniqueId} />
        ))}
      </div>
      <div className={styles.bottom}>
        <div className={styles.client} onClick={() => dispatch(openClient())}>
          {client ? (
            <div className={styles.flex} style={{ padding: "10px" }}>
              <h4 style={{ fontSize: "20px" }}>Cliente:</h4>
              <h4>{`${client.user.name} ${client.user.lastName}`}</h4>
            </div>
          ) : (
            <div className={styles.client_empty}>
              <p>⚠ Se debe cargar un cliente </p>
              <p className={styles.client_empty_text}>
                (click aquí para cargar)
              </p>
            </div>
          )}
        </div>
        <div className={styles.total}>
          <div className={styles.flex}>
            <h4>Subtotal</h4>
            <h4>{formatPrice(subTotal || 0)}</h4>
          </div>
          <div className={styles.flex}>
            <h4>Envío</h4>
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
          {/* <button
            className={styles.ticket_btn_send}
            onClick={handleSendOrder}
            disabled={!products || !client}
          >
            Enviar a caja
          </button> */}
          <button
            className={`btn-load ${l1 || l2 ? "button--loading" : ""}`}
            type="submit"
            onClick={handleSendOrder}
            disabled={!products || !client || l1 || l2}
            style={{ width: "50%", padding: "20px" }}
          >
            <span className="button__text">Enviar</span>
          </button>
          <button
            className={styles.ticket_btn_cancel}
            onClick={() => dispatch(clearCart())}
          >
            Cancelar
          </button>
        </div>
      </div>
    </section>
  );
};
