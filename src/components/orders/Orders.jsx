/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "./orders.module.css";
import { formatDateToHour } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import { addSelectOrder } from "../../redux/ordersSlice";

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const { selectOrder } = useSelector((store) => store.ordersList);

  return (
    <div
      className={
        selectOrder && selectOrder.orderId == order.orderId
          ? styles.order_container_active
          : styles.order_container
      }
      onClick={() => dispatch(addSelectOrder(order))}
    >
      <h3 className={styles.col1}>{formatDateToHour(order.date)}hs</h3>
      <h3 className={styles.col2}>{order.clientFullName}</h3>
      <h3 className={styles.col3}>
        {order.numberOfItems}{" "}
        {order.numberOfItems === 1 ? "producto" : "productos"}
      </h3>
      <h3 className={styles.col4}>{formatPrice(order.total)}</h3>
    </div>
  );
};

export const Orders = () => {
  const { orders } = useSelector((store) => store.ordersList);
  console.log(orders);
  return (
    <section className={styles.container}>
      {orders &&
        orders.map((order) => <Order key={order.orderId} order={order} />)}
    </section>
  );
};
