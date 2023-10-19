import { useDispatch, useSelector } from "react-redux";
import styles from "./client.module.css";
import { useState } from "react";
import { addClient } from "../../redux/orderSlice";
import { closeLocalOrder } from "../../redux/uiSlice";

export const Local = () => {
  const dispatch = useDispatch();
  const { allClients } = useSelector((store) => store.clients);

  const [value, setValue] = useState("");
  const [selectClient, setSelectClient] = useState(null);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = ({ searchClient, client }) => {
    setValue(searchClient);
    setSelectClient(client);
  };
  const onReset = () => {
    setValue("");
    setSelectClient(null);
  };

  const handleSend = () => {
    dispatch(addClient(selectClient));
    dispatch(closeLocalOrder());
  };
  return (
    <section className={styles.container}>
      <div className={styles.client_box}>
        <button
          className={styles.bnt_close}
          onClick={() => dispatch(closeLocalOrder())}
        >
          x
        </button>
        <h2>Orden local</h2>
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

        <div className={styles.dropdown}>
          {allClients
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = `${item.user.name.toLowerCase()} ${item.user.lastName.toLowerCase()}`;
              const phone = item.user.phone.toLowerCase();

              return (
                searchTerm &&
                (fullName.includes(searchTerm) || phone.includes(searchTerm)) &&
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
        {selectClient && (
          <div className={styles.client_data}>
            <h2>Datos del cliente</h2>
            <div className={styles.field}>
              <span>Nombre</span>
              <p>{selectClient.user.name}</p>
            </div>
            <div className={styles.field}>
              <span>Apellido</span>
              <p>{selectClient.user.lastName}</p>
            </div>
            <div className={styles.field}>
              <span>Email</span>
              <p>{selectClient.user.email}</p>
            </div>
            <div className={styles.field}>
              <span>Teléfono</span>
              <p>{selectClient.user.phone}</p>
            </div>
            <button className={styles.btn_send} onClick={handleSend}>
              Enviar
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
