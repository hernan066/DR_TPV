import { useEffect, useState } from "react";
import styles from "./keypad.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeKeypad } from "../../redux/uiSlice";
import { updateQuantityProduct } from "../../redux/orderSlice";
import { useLocation } from "react-router-dom";
import {
  setCash,
  setDebt,
  setTransfer,
  updatePriceActiveProduct,
  updateQuantityActiveProduct,
} from "../../redux/ordersSlice";
import Swal from "sweetalert2";

export const Keypad = () => {
  const { pathname } = useLocation();
  const { keypad_mode } = useSelector((store) => store.ui);

  const { active, maxStock } = useSelector((store) => store.order);
  const { activeProduct } = useSelector((store) => store.ordersList);

  const [displayNumber, setDisplayNumber] = useState({
    acc: [],
    value: "",
  });
  const dispatch = useDispatch();

  const handleClicNumber = (num) => {
    if (num === "." && displayNumber.acc.includes(".")) {
      return;
    }

    setDisplayNumber({
      acc: [...displayNumber.acc, num],
      value: +[...displayNumber.acc, num].join(""),
    });
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    setDisplayNumber({
      acc: [e.target.value],
      value: e.target.value,
    });
  };
  const handleDelete = () => {
    setDisplayNumber({
      acc: [],
      value: "",
    });
  };
  const handleOk = () => {
    if (pathname === "/caja" && keypad_mode === "quantity") {
      dispatch(
        updateQuantityActiveProduct({
          id: activeProduct,
          value: displayNumber.value,
        })
      );
    }
    if (pathname === "/caja" && keypad_mode === "price") {
      dispatch(
        updatePriceActiveProduct({
          id: activeProduct,
          value: displayNumber.value,
        })
      );
    }
    if (keypad_mode === "quantity") {
      if (maxStock && displayNumber.value > maxStock) {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: `La cantidad es mayor el stock existente (${maxStock})`,
          showConfirmButton: true,
          confirmButtonColor: "#d33",
        });
      }
      dispatch(
        updateQuantityProduct({
          id: active,
          value: displayNumber.value,
        })
      );
    }
    if (keypad_mode === "cash") {
      dispatch(setCash(displayNumber.value));
    }
    if (keypad_mode === "transfer") {
      dispatch(setTransfer(displayNumber.value));
    }
    if (keypad_mode === "debt") {
      dispatch(setDebt(displayNumber.value));
    }

    dispatch(closeKeypad());
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      dispatch(closeKeypad());
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.keypad}>
        <input
          type="number"
          className={styles.keypad_input}
          autoFocus
          value={displayNumber.value}
          onChange={(e) => handleChange(e)}
        />
        <div className={styles.flex}>
          <div>
            <div className={styles.flex}>
              <button
                className={styles.btn_num}
                onClick={() => handleClicNumber(7)}
              >
                7
              </button>
              <button
                className={styles.btn_num}
                onClick={() => handleClicNumber(8)}
              >
                8
              </button>
              <button
                className={styles.btn_num}
                onClick={() => handleClicNumber(9)}
              >
                9
              </button>
            </div>
            <div className={styles.flex}>
              <button
                className={styles.btn_num}
                onClick={() => handleClicNumber(4)}
              >
                4
              </button>
              <button
                className={styles.btn_num}
                onClick={() => handleClicNumber(5)}
              >
                5
              </button>
              <button
                className={styles.btn_num}
                onClick={() => handleClicNumber(6)}
              >
                6
              </button>
            </div>
          </div>
          <button className={styles.btn_right} onClick={handleDelete}>
            Borrar
          </button>
        </div>
        <div className={styles.flex}>
          <div>
            <div className={styles.flex}>
              <button
                className={styles.btn_num}
                onClick={() => handleClicNumber(1)}
              >
                1
              </button>
              <button
                className={styles.btn_num}
                onClick={() => handleClicNumber(2)}
              >
                2
              </button>
              <button
                className={styles.btn_num}
                onClick={() => handleClicNumber(3)}
              >
                3
              </button>
            </div>
            <div className={styles.flex}>
              <button
                className={styles.btn_cero}
                onClick={() => handleClicNumber(0)}
              >
                0
              </button>
              <button
                className={styles.btn_num}
                onClick={() => handleClicNumber(".")}
              >
                .
              </button>
            </div>
          </div>
          <button className={styles.btn_right} onClick={handleOk}>
            OK
          </button>
        </div>
      </div>
    </section>
  );
};
