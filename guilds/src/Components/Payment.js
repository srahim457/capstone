import React, { Component, useState, useRef, useEffect } from "react";
// import Pagination from './Pagination';
import CreateListing from "./CreateListing";
import DisplayListing from "./DisplayListing";
import axios from "axios";
import "./styles/MarketPlace.css";

class Payment extends Component {
  constructor() {
    super();
  }

  render() {
    // const [paidFor, setPaidFor] = useState(false);
    // const [loaded, setLoaded] = useState(false);

    // let paypalRef = useRef();

    // const product = {
    //   price: 777.77,
    //   description: "fancy chair, like new",
    //   img: "assets/couch.jpg",
    // };

    // useEffect(() => {
    //   const script = document.createElement("script");
    //   script.src =
    //     "https://www.paypal.com/sdk/js?client-id=AV7GtRuIDCtegHEIp5SpfeBQq5nZH1zvBSmOXckYmHrIzmx2KfB3z_Y1SvXTh_c3r7ztHqVysS9rehf7";
    //   script.addEventListener("load", () => setLoaded(true));
    //   document.body.appendChild(script);

    //   if (loaded) {
    //     setTimeout(() => {
    //       window.paypal
    //         .Buttons({
    //           createOrder: (data, actions) => {
    //             return actions.order.create({
    //               purchase_units: [
    //                 {
    //                   description: product.description,
    //                   amount: {
    //                     currency_code: "USD",
    //                     value: product.price,
    //                   },
    //                 },
    //               ],
    //             });
    //           },
    //           onApprove: async (data, actions) => {
    //             const order = await actions.order.capture();
    //             setPaidFor(true);
    //             console.log(order);
    //           },
    //         })
    //         .render(paypalRef);
    //     });
    //   }
    // });

    return (
      <div className="containerParent">
        <div className="container">
          <h1 className="title">Payment</h1>
        </div>

        

      </div>
    );
  }
}

export default Payment;
