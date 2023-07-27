/* eslint-disable react/prop-types */
import "./receipt.css";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useSelector } from "react-redux";
import Barcode from "react-barcode";
import { dateToLocalDate } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import { AiOutlinePrinter } from "react-icons/ai";

export const Receipt = () => {
  let componentRef = useRef();
  const { selectOrder } = useSelector((store) => store.ordersList);
  return (
    <div style={{ width: "50%" }}>
      {/* button to trigger printing of target component */}
      <ReactToPrint
        trigger={() => (
          <button id="receipt__btn">
            <AiOutlinePrinter />
            Imprimir ticket
          </button>
        )}
        content={() => componentRef}
      />

      {/* component to be printed */}
      <div style={{ display: "none" }}>
        <Ticket ref={(el) => (componentRef = el)} selectOrder={selectOrder} />
      </div>
    </div>
  );
};

class Ticket extends React.Component {
  render() {
    return (
      <div className="container-ticket">
        <div className="ticket">
          <div className="head-ticket">
            <p className="x-bold">Avícola Martina</p>
            <p className="bold">San Miguel</p>
            <p className="bold">Av.Balbin 4872</p>

            <br />
            <p className="bold">Ticket interno</p>
            <p>Fecha: {dateToLocalDate(new Date())}hs</p>
            <p>
              Cliente:{" "}
              {`${this.props.selectOrder.userId.name} ${this.props.selectOrder.userId.lastName}`}
            </p>
          </div>
          <div className="ticket-barcode">
            <Barcode
              value={this.props.selectOrder?.receiptId || Date.now()}
              height={80}
              fontSize={20}
              width={3}
            />
          </div>

          <div className="body-ticket">
            <div className="products">
              {this.props.selectOrder.orderItems.map((product) => (
                <div className="products__item" key={product._id}>
                  <div>
                    <p>
                      {`${product.description}. (${
                        product.totalQuantity
                      } unid. x ${formatPrice(product.unitPrice)})`}
                    </p>
                  </div>
                  <p className="prix">{formatPrice(product.totalPrice)}</p>
                </div>
              ))}
            </div>
            <div className="hr-lg" />
            <div className="products__item">
              <p className="ticket__total">Total</p>
              <p className="ticket__total">
                {formatPrice(this.props.selectOrder.subTotal)}
              </p>
            </div>
            <div className="hr-lg" />
          </div>
          <div className="footer-ticket">
            <p className="title-footer">
              Muchas gracias
              <br />
              por su compra
            </p>
          </div>
        </div>
      </div>
    );
  }
}
