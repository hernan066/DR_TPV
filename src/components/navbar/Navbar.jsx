import styles from "./navbar.module.css";

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <button className={styles.navbar_btn}>###</button>
      <button className={styles.navbar_btn}>123</button>
      <button className={styles.navbar_btn}>abc</button>
      <input
        className={styles.navbar_input}
        type="text"
        placeholder="Ingresa el producto"
      />
    </div>
  );
};
