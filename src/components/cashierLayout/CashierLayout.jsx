/* eslint-disable react/prop-types */

import styles from "./homeLayout.module.css";
import { useSelector } from "react-redux";
import { Keypad } from "../keypad/Keypad";
import { Client } from "../client/Client";
import { Menu } from "../menu/Menu";
import { OrderDetail } from "../orderDetail/OrderDetail";
import { NavbarOrder } from "../navbarOrder/NavbarOrder";
import { PopupProducts } from "../popupProducts/PopupProducts";
import { CashOut } from "../cashOut/CashOut";

export const CashierLayout = ({ children }) => {
  const { keypad, client, popupProducts, cashOut } = useSelector(
    (store) => store.ui
  );
  return (
    <>
      <Menu />
      {cashOut && <CashOut />}
      {popupProducts && <PopupProducts />}
      {keypad && <Keypad />}
      {client && <Client />}
      <section className={styles.container}>
        <div className={styles.products_container}>
          <NavbarOrder />
          {children}
        </div>
        <div className={styles.ticket_container}>
          <OrderDetail />
        </div>
      </section>
    </>
  );
};
