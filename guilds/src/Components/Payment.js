import React, { Component, useState, useRef, useEffect } from "react";
// import Pagination from './Pagination';
import CreateListing from "./CreateListing";
import DisplayListing from "./DisplayListing";
import axios from "axios";
import "./styles/Payment.css";

import chair from "../images/chair.jpg";
import gif from "../images/giphy.gif";
import itemChest from "../images/item_chest.png";

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

class Payment extends Component {
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
    return_date: "DateTime"
  };

  render() {
    return (
      <div className='containerParent'>
        <div className='container'>
          <h1 className='title'><br/>Payment<br/></h1>
          <div className='payment-body'>
            {/* This the payment page <br/>
            Stripe <br/> */}
            {/* Bootstrap code */}
            <link 
              rel="stylesheet" 
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
              integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" 
              crossorigin="anonymous"
            />
            <script 
              src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
              integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
              crossorigin="anonymous">
            </script>
            {/* Bootstrap code end */}

            <div class="col-md-6">
            {/* <h1 class="display-3 mt-3 pt-5"> */}
            {/* <h1 class="lead">
              Item: <br/>
              by: {this.item.lender}
            </h1> */}
            <img src={itemChest} height="200" width="200"></img>
            <p class="lead">
              Name: {this.item.name}<br/>
              Lender: {this.item.lender}<br/>
              Description: {this.item.description}<br/>
              Type: {this.item.type}<br/>
              Insurance: {this.item.type}<br/>
              Price: ${this.item.price / 100}<br/>
              Return Date &amp; Time: {this.item.return_date}<br/>
            </p>
            <form action="/charge" method="POST">
                <script 
                    src="https://checkout.stripe.com/checkout.js" 
                    class="stripe-button"
                    data-key="pk_test_Ci5vDkQD1gwMM6faugOYBC0B00IddzaMye" 
                    data-amount="2500" 
                    data-name="Web Development Ebook"
                    data-description="Ebook written by Brad Traversy" 
                    data-image="/img/marketplace.png" data-locale="auto">
                </script>
                <script>
                    document.getElementsByClassName('stripe-button-el')[0].style.display = 'none';
                </script>
                <button type="submit" class="btn btn-outline-dark text-white btn-lg">Confirm Payment</button>
            </form>
        </div>
            
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

export default Payment;
