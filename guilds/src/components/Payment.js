import React, { Component, useState, useRef, useEffect } from "react";
// import Pagination from './Pagination';
import axios from "axios";
import "./styles/Payment.css";
import "react-toastify/dist/ReactToastify.css"; //notification layout (default green)

import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout"; 
import { toast } from "react-toastify"; // notifaction

import itemChest from "../images/item_chest.png"; 
import PaymentSuccess from './PaymentSuccess';

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

toast.configure();

class Payment extends Component {
  constructor(props) {
    super(props);

    // for test
    this.state = {
      id: '',
      name: '',
      lender: '',
      description: '',
      listing_type: '',
      insurance: '',
      return_date: '',
      greeting: '',
      click: false,
      payment_status: '',
    };

    // for listing
    // this.state = {
    //   // image: "",
    //   item_id: "",
    //   item_name: "",
    //   lender: "",
    //   item_description: "",
    //   type: "",
    //   price: "",
    //   return_by: "",
    //   policy: ""
    // }
  }


  
  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }

  // componentDidMount() {
  //   let message;

  //   // axios.get("http://localhost:4000/payment").then((res) => {
  //   //   // message = res.data.greeting;
  //   //   // // console.log(message);
  //   //   // // this.state.greeting = message;
  //   //   // this.setState({ greeting: message })
  //   //   // console.log(res.data);
  //   // });
  // }

  // handleToken(token, addresses) {
  //   console.log({ token, addresses })
  // }

  render() {
    // this will get passed to stripe form
    // Stripe form takes care of everything else
    const product = {
      name: this.state.name,
      price: 45.50,
      description: this.state.description
    };

    // submits stripe payment for and returns 'success' or 'error' status
    async function handleToken(token) {
      // console.log({ token, addresses });
      const response = await axios.post('http://localhost:4000/payment/charge', 
        {
        token,
        product
        }
      );
      const { status }  = response.data;
      // console.log(status);
      if (status === 'success') {
        toast('Success! Check email for details',
        { type: 'success' })
      } else {
        toast('Something went wrong',
        { type: 'error' })
      }
      // will require a POST to backend and marking listing paid for + unavailable
    }

    return (
      <div className="containerParent">
        <div className="container">
          <h1 className="title">
            <br />
            Payment
            <br />
          </h1>
          <div className="payment-body">
            <img src={itemChest} height="200" width="200"></img>
            <p class="lead">
              Name: {this.state.name}
              <br />
              Lender: {this.state.lender}
              <br />
              Description: {this.state.description}
              <br />
              Type: {this.state.listing_type}
              <br />
              Insurance: {this.state.type}
              <br />
              Price: ${this.state.price}
                <br />
              Return Date &amp; Time: {this.state.return_date}
              <br />
              {/* {this.state.greeting} */}
            </p>

            <h1>{product.name}</h1>
            <h3>On Sale ${product.price}</h3>
            <h4>{product.description}</h4>
            <StripeCheckout
              stripeKey="pk_test_Ci5vDkQD1gwMM6faugOYBC0B00IddzaMye"
              token={handleToken}
              billingAddress
              amount={product.price * 100}
              name={product.name}
            />
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById;

export default Payment;
