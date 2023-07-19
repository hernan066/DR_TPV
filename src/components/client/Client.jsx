import { useEffect, useState } from "react";
import styles from "./client.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeClient } from "../../redux/uiSlice";
import { addClient } from "../../redux/orderSlice";

export const Client = () => {
  const dispatch = useDispatch();
  const { allClients } = useSelector((store) => store.clients);
  const { client } = useSelector((store) => store.order);

  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      dispatch(closeClient());
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = ({ searchClient, client }) => {
    setValue(searchClient);
    dispatch(addClient(client));
  };
  const onReset = () => {
    setValue("");
    dispatch(addClient(null));
  };
  return (
    <section className={styles.container}>
      <div className={styles.client_box}>
        <button
          className={styles.bnt_close}
          onClick={() => dispatch(closeClient())}
        >
          x
        </button>
        <h2>Selecciona un cliente</h2>
        <div className={styles.input_container}>
          <input
            type="text"
            placeholder="Ingresa nombre completo o teléfono"
            value={value}
            onChange={onChange}
            autoFocus
          />
          <button className={styles.bnt_reset} onClick={onReset}>
            X
          </button>
        </div>
        <button onClick={() => onSearch(value)} className={styles.btn_search}>
          Buscar
        </button>
        <div className={styles.dropdown}>
          {allClients
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = `${item.user.name.toLowerCase()} ${item.user.lastName.toLowerCase()}`;
              const phone = item.user.phone.toLowerCase();

              return (
                searchTerm &&
                (fullName.startsWith(searchTerm) ||
                  phone.startsWith(searchTerm)) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 11)
            .map((item) => (
              <div
                onClick={() =>
                  onSearch({
                    searchClient: `${item.user.name} ${item.user.lastName} - Tel: ${item.user.phone}`,
                    client: item,
                  })
                }
                className={styles.dropdown_row}
                key={item._id}
              >
                {`${item.user.name} ${item.user.lastName} - Tel: ${item.user.phone}`}
              </div>
            ))}
        </div>
        {client && (
          <div className={styles.client_data}>
            <h2>Datos del cliente</h2>
            <div className={styles.field}>
              <span>Nombre</span>
              <p>{client.user.name}</p>
            </div>
            <div className={styles.field}>
              <span>Apellido</span>
              <p>{client.user.lastName}</p>
            </div>
            <div className={styles.field}>
              <span>Email</span>
              <p>{client.user.email}</p>
            </div>
            <div className={styles.field}>
              <span>Teléfono</span>
              <p>{client.user.phone}</p>
            </div>
            <button
              className={styles.btn_send}
              onClick={() => dispatch(closeClient())}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
