import { useDispatch, useSelector } from "react-redux";
import styles from "./navbar.module.css";
import { changeMode, openMenu } from "../../redux/uiSlice";
import { setSearchOfert, setSearchTerm } from "../../redux/ofertsSlice";
import { AiOutlineMenu } from "react-icons/ai";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((store) => store.ui);
  const { allOferts, searchTerm } = useSelector((store) => store.oferts);

  const onChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const onSearch = (ofert) => {
    dispatch(setSearchTerm(ofert.description));

    dispatch(setSearchOfert([ofert]));
  };
  return (
    <div className={styles.navbar}>
      <button className={styles.btn_menu} onClick={() => dispatch(openMenu())}>
        <AiOutlineMenu />
      </button>

      {mode === "scanner" && (
        <input
          className={styles.navbar_input}
          type="text"
          placeholder="Escanea el código del producto"
        />
      )}
      {mode === "code" && (
        <input
          className={styles.navbar_input}
          type="text"
          placeholder="Ingresa código el producto"
        />
      )}
      {mode === "letter" && (
        <input
          className={styles.navbar_input}
          type="text"
          placeholder="Ingresa el nombre producto"
          value={searchTerm}
          onChange={onChange}
        />
      )}
      <button
        className={
          mode === "scanner" ? styles.navbar_btn_active : styles.navbar_btn
        }
        onClick={() => dispatch(changeMode("scanner"))}
      >
        ###
      </button>
      <button
        className={
          mode === "code" ? styles.navbar_btn_active : styles.navbar_btn
        }
        onClick={() => dispatch(changeMode("code"))}
      >
        123
      </button>
      <button
        className={
          mode === "letter" ? styles.navbar_btn_active : styles.navbar_btn
        }
        onClick={() => dispatch(changeMode("letter"))}
      >
        abc
      </button>
      <div className={styles.dropdown}>
        {allOferts
          .filter((item) => {
            const searchTermLc = searchTerm.toLowerCase();
            const ofert = item.description.toLowerCase();

            return (
              searchTermLc &&
              ofert.includes(searchTermLc) &&
              ofert !== searchTermLc
            );
          })
          .slice(0, 11)
          .map((item) => (
            <div
              onClick={() => onSearch(item)}
              className={styles.dropdown_row}
              key={item._id}
            >
              {item.description}
            </div>
          ))}
      </div>
    </div>
  );
};
