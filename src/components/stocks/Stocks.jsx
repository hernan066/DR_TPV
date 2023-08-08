import { useNavigate, useParams } from "react-router-dom";
import styles from "./products.module.css";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/orderSlice";
import { clearSearchOfert } from "../../redux/ofertsSlice";
import { formatQuantity } from "../../utils/formatQuantity";
import { v4 as uuidv4 } from "uuid";

export const Stocks = () => {
  const { id } = useParams();
  const { allOferts } = useSelector((store) => store.oferts);
  const ofert = allOferts.filter((ofert) => ofert._id == id);
  const stocks =
    ofert[0].product?.stock.filter((stock) => stock.stock > 0) || [];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (stock) => {
    const product = {
      uniqueId: uuidv4(), //este solo sirve para el carrito, no va a db
      productId: ofert[0].product._id,
      name: ofert[0].product.name,
      unit: ofert[0].product.unit,
      description: ofert[0].description,
      img: ofert[0].product.img,

      totalQuantity: 1,
      totalPrice: ofert[0].basePrice, //precio minorista, el mas caro
      unitPrice: ofert[0].basePrice, //precio minorista, el mas caro

      unitCost: stock.unityCost,
      stockId: stock._id,
    };
    dispatch(
      addProduct({
        product,
        maxStock: stock.stock,
      })
    );
  };
  return (
    <div className={styles.main_products}>
      <div
        className={styles.product_card}
        onClick={() => {
          navigate("/");
          dispatch(clearSearchOfert());
        }}
      >
        <IoMdArrowBack />
        <h3>Volver</h3>
      </div>
      {stocks.length === 0 && (
        <div className={styles.product_card}>
          <h3>Sin Stock</h3>
        </div>
      )}

      {stocks.map((stock) => {
        return (
          <div
            className={styles.product_card}
            key={stock._id}
            onClick={() => handleClick(stock)}
          >
            <img src={stock.img} alt={stock.name} />
            <div className={styles.product_card_name}>
              <h3>Stock: {formatQuantity(stock.stock)} unid.</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
