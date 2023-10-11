/* eslint-disable react/prop-types */
import styles from "./homeLayout.module.css";
import { useSelector } from "react-redux";
import { Keypad } from "../keypad/Keypad";
import { Menu } from "../menu/Menu";
import { OrderDetail } from "../orderDetail/OrderDetail";
import { NavbarOrder } from "../navbarOrder/NavbarOrder";
import { PopupProducts } from "../popupProducts/PopupProducts";
import { CashOut } from "../cashOut/CashOut";
import { Delivery } from "../selectClient/Delivery";
import { Local } from "../selectClient/Local";
import { Selector } from "../selectClient/Selector";
import { Pagination } from "../pagination/Pagination";

export const CashierLayout = ({ children }) => {
  const {
    keypad,
    popupProducts,
    cashOut,
    selector,
    selectLocalOrder,
    selectDeliveryOrder,
  } = useSelector((store) => store.ui);
  return (
    <>
      <Menu />
      {cashOut && <CashOut />}
      {popupProducts && <PopupProducts />}
      {keypad && <Keypad />}
      {selector && <Selector />}
      {selectLocalOrder && <Local />}
      {selectDeliveryOrder && <Delivery />}
      <section className={styles.container}>
        <div className={styles.products_container}>
          <NavbarOrder />
          {children}
          <Pagination />
        </div>
        <div className={styles.ticket_container}>
          <OrderDetail />
        </div>
      </section>
    </>
  );
};
