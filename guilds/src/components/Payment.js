import React, { Component, useState, useRef, useEffect } from "react";
// import Pagination from './Pagination';
import axios from "axios";
import "./styles/Payment.css";

import itemChest from "../images/item_chest.png";

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

class Payment extends Component {
  constructor() {
    super();

    // for test
    this.state = {
      id: "id",
      name: "Item Name",
      lender: "Lender Name",
      description: "Item Description",
      type: "Rent, Buy, or Loan",
      price: "100",
      return_date: "DateTime",
      greeting: ""
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

  componentDidMount() {
    let message;

    axios.get("http://localhost:4000/payment").then((res) => {
      message = res.data.greeting;
      // console.log(message);
      // this.state.greeting = message;
      this.setState({greeting: message})
      console.log(res.data);
    });
  }

  render() {
    return (
      <div className="containerParent">
        <div className="container">
          <h1 className="title">
            <br />
            Payment
            <br />
          </h1>
          <div className="payment-body">
            {/* This the payment page <br/>
            Stripe <br/> */}

            <div class="col-md-6">
              {/* <h1 class="display-3 mt-3 pt-5"> */}
              {/* <h1 class="lead">
              Item: <br/>
              by: {this.item.lender}
            </h1> */}
              <img src={itemChest} height="200" width="200"></img>
              <p class="lead">
                Name: {this.state.name}
                <br />
                Lender: {this.state.lender}
                <br />
                Description: {this.state.description}
                <br />
                Type: {this.state.type}
                <br />
                Insurance: {this.state.type}
                <br />
                Price: ${this.state.price / 100}
                <br />
                Return Date &amp; Time: {this.state.return_date}
                <br />
                {this.state.greeting}
              </p>
              {/* <form action="http://localhost:4000/payment" method="POST">
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
            </form> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
