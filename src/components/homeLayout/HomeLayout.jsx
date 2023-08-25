/* eslint-disable react/prop-types */
import { Navbar } from "../navbar/Navbar";
import { Pagination } from "../pagination/Pagination";
import styles from "./homeLayout.module.css";
import { useSelector } from "react-redux";
import { Keypad } from "../keypad/Keypad";
import { Ticket } from "../tickets/Ticket";
import { Menu } from "../menu/Menu";
import { Local } from "../selectClient/Local";
import { Delivery } from "../selectClient/Delivery";
import { Selector } from "../selectClient/Selector";

export const HomeLayout = ({ children }) => {
  const { keypad, selector, selectLocalOrder, selectDeliveryOrder } =
    useSelector((store) => store.ui);
  return (
    <>
      <Menu />
      {keypad && <Keypad />}
      {selector && <Selector />}
      {selectLocalOrder && <Local />}
      {selectDeliveryOrder && <Delivery />}
      <section className={styles.container}>
        <div className={styles.products_container}>
          <Navbar />
          {children}
          <Pagination />
        </div>
        <div className={styles.ticket_container}>
          <Ticket />
        </div>
      </section>
    </>
  );
};
