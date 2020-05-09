import React, { Component, useState, useRef, useEffect } from "react";
// import Pagination from './Pagination';
import axios from "axios";
import "./styles/Payment.css";

import itemChest from "../images/item_chest.png";

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

class PaymentSuccess extends Component {
  constructor() {
    super();
  }

  item = {
    id: "id",
    name: "Item Name",
    lender: "Lender Name",
    description: "Item Description",
    type: "Rent, Buy, or Loan",
    price: "100",
    return_date: "DateTime",
  };

  render() {
    return (
      <div className="containerParent">
        <div className="container">
          <h1 className="title"><br/>Payment Successful</h1>
          <div className="payment-body">
            {/* This the payment page <br/>
            Stripe <br/> */}
            

            <div class="col-md-6">
              {/* <h1 class="display-3 mt-3 pt-5"> */}
              <h1 class="lead">
                Thank you. <br/>Your payment has been submitted.
              </h1>
              <img src={itemChest} height="200" width="200"></img>
              <p class="lead">
                Name: {this.item.name}
                <br />
                Amount Paid: ${this.item.price /10} <br/>
                {this.item.type} until {this.item.return_date}
                <br />
              </p>
            </div>
            {/* <h1 class="display-3">Thank You</h1> */}
            <p class="lead">
              {this.item.lender} has been notified <br/>and will be in contact with you soon.
            </p>
            <a href="/market-place" class="btn btn-light btn-lg">
              Return to Marketplace
            </a>
          </div>
        </div>
      </div>
    );
  }

  // function Product({ product }) {
  //   const [paidFor, setPaidFor] = useState(false);
  //   const [error, setError] = useState(null);
  //   const paypalRef = useRef();

  //   useEffect(() => {
  //     window.paypal
  //       .Buttons({
  //         createOrder: (data, actions) => {
  //           return actions.order.create({
  //             purchase_units: [
  //               {
  //                 description: product.description,
  //                 amount: {
  //                   currency_code: "USD",
  //                   value: product.price,
  //                 },
  //               },
  //             ],
  //           });
  //         },
  //         onApprove: async (data, actions) => {
  //           const order = await actions.order.capture();
  //           setPaidFor(true);
  //           console.log(order);
  //         },
  //         onError: (err) => {
  //           setError(err);
  //           console.error(err);
  //         },
  //       })
  //       .render(paypalRef.current);
  //   }, [product.description, product.price]);

  //   if (paidFor) {
  //     return (
  //       <div>
  //         <h1>Congrats, you just bought {product.name}!</h1>
  //         <img alt={product.description} src={gif} />
  //       </div>
  //     );
  //   }

  //   return (
  //     <div>
  //       {error && <div>Uh oh, an error occurred! {error.message}</div>}
  //       <h1>
  //         {product.description} for ${product.price}
  //       </h1>
  //       <img alt={product.description} src={product.image} width="200" />
  //       <div ref={paypalRef} />
  //     </div>
  //   );
  // }

  // function Payment() {
  //   const product = {
  //     price: 777.77,
  //     name: "comfy chair",
  //     description: "fancy chair, like new",
  //     image: chair,
  //   };

  //   return (
  //     <div className="App">
  //       <Product product={product} />
  //     </div>
  //   );
  // }
}

export default PaymentSuccess;
