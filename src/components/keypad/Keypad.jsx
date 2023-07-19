/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./keypad.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeKeypad } from "../../redux/uiSlice";
import { updateQuantityProduct } from "../../redux/orderSlice";

export const Keypad = () => {
  const { active } = useSelector((store) => store.order);
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
    dispatch(
      updateQuantityProduct({
        id: active,
        quantity: displayNumber.value,
      })
    );
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
    <section
      className={styles.container}
      /*  onClick={() => dispatch(closeKeypad())} */
    >
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
