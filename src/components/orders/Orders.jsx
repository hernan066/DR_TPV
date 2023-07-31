/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "./orders.module.css";
import { formatDateToHour } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import { addOrder, addOrders, addSelectOrder } from "../../redux/ordersSlice";
import { useGetCashierOrdersQuery } from "../../api/apiOrder";
import Loading from "../loading/Loading";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const { selectOrder } = useSelector((store) => store.ordersList);

  return (
    <div
      className={
        selectOrder && selectOrder._id == order._id
          ? styles.order_container_active
          : styles.order_container
      }
      onClick={() => dispatch(addSelectOrder(order))}
    >
      <h3 className={styles.col1}>{formatDateToHour(order?.createdAt)}hs</h3>
      <h3
        className={styles.col2}
      >{`${order?.shippingAddress?.name} ${order?.shippingAddress?.lastName}`}</h3>
      <h3 className={styles.col3}>
        {order?.numberOfItems}{" "}
        {order?.numberOfItems === 1 ? "producto" : "productos"}
      </h3>
      <h3 className={styles.col4}>{formatPrice(order?.total)}</h3>
    </div>
  );
};

export const Orders = () => {
  const { orders } = useSelector((store) => store.ordersList);
  const { data, isLoading, isError } = useGetCashierOrdersQuery();
  const dispatch = useDispatch();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("orderData", (data) => {
      dispatch(addOrder(data));
    });
    return () => socket.off("orderData");
  }, [socket]);

  useEffect(() => {
    if (data) {
      dispatch(addOrders(data?.data.orders));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>Ha ocurrido un error</p>;
  }

  return (
    <section className={styles.container}>
      {orders &&
        data &&
        orders.map((order) => <Order key={order?._id} order={order} />)}
    </section>
  );
};
