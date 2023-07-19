/* eslint-disable react/prop-types */
import { Navbar } from "../navbar/Navbar";
import { Pagination } from "../pagination/Pagination";
import styles from "./homeLayout.module.css";
import { useSelector } from "react-redux";
import { Keypad } from "../keypad/Keypad";
import { Ticket } from "../tickets/Ticket";
import { Client } from "../client/Client";
import { Menu } from "../menu/Menu";

export const HomeLayout = ({ children }) => {
  const { keypad, client } = useSelector((store) => store.ui);
  return (
    <>
      <Menu />
      {keypad && <Keypad />}
      {client && <Client />}
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
