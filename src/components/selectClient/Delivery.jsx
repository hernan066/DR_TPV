import { useDispatch, useSelector } from "react-redux";
import styles from "./client.module.css";
import { useState } from "react";
import {
  addClient,
  addDeliveryTruck,
  addShippingCost,
} from "../../redux/orderSlice";
import { closeDeliveryOrder } from "../../redux/uiSlice";

export const Delivery = () => {
  const dispatch = useDispatch();
  const { allClientsAddresses, allDeliveries } = useSelector(
    (store) => store.clients
  );

  const [value, setValue] = useState("");
  const [selectClient, setSelectClient] = useState(null);
  const [deliveryTruck, setDeliveryTruck] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [error, setError] = useState(null);

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onChangeShippingCost = (event) => {
    setShippingCost(event.target.value);
  };
  const onChangeDeliveryTruck = (e) => {
    setDeliveryTruck(e.target.value);

    setError(false);
  };

  const onSearch = ({ searchClient, client }) => {
    setValue(searchClient);
    setSelectClient(client);
  };
  const onReset = () => {
    setValue("");
    setDeliveryTruck("");
    dispatch(addClient(null));
    dispatch(addDeliveryTruck(null));
  };

  const handleSend = () => {
    if (!deliveryTruck) {
      setError(true);
    } else {
      dispatch(addDeliveryTruck(deliveryTruck));
      dispatch(addClient(selectClient));
      dispatch(closeDeliveryOrder());
      dispatch(addShippingCost(+shippingCost));
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.client_box}>
        <button
          className={styles.bnt_close}
          onClick={() => dispatch(closeDeliveryOrder())}
        >
          x
        </button>
        <h2>Orden de reparto</h2>
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
          {allClientsAddresses
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
                    searchClient: `${item.user.name} ${item.user.lastName} - Tel: ${item.user.phone} - ${item.address}`,
                    client: item,
                  })
                }
                className={styles.dropdown_row}
                key={item._id}
              >
                {`${item.user.name} ${item.user.lastName} - Tel: ${item.user.phone} - ${item.address}`}
              </div>
            ))}
        </div>
        {selectClient && (
          <div className={styles.client_data}>
            <h2>Selecciona un repartidor</h2>
            <div className={styles.field_input}>
              <span>Repartidor</span>
              <select
                name="delivery"
                className={styles.delivery_select}
                onChange={(e) => onChangeDeliveryTruck(e)}
                value={deliveryTruck}
              >
                <option value="">Selecciona un repartidor</option>
                {allDeliveries.map((delivery) => {
                  return (
                    <option key={delivery.truckId} value={delivery._id}>
                      {delivery.truckId}
                    </option>
                  );
                })}
              </select>
              {error && <p className={styles.error}>*Dato obligatorio</p>}
            </div>
            <div className={styles.field}>
              <span>Nombre cliente</span>
              <p>
                {selectClient.user.name} {selectClient.user.lastName}
              </p>
            </div>
            <div className={styles.field}>
              <span>Zona</span>
              <p>{selectClient.deliveryZone.name}</p>
            </div>
            <div className={styles.field}>
              <span>Dirección</span>
              <p>{selectClient.address}</p>
            </div>
            <div className={styles.field}>
              <span>Costo de envío</span>
              <input
                type="number"
                value={shippingCost}
                onChange={(e) => onChangeShippingCost(e)}
                id={styles.input__shippingCost}
              />
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
