import React, { Component } from 'react';
import axios from 'axios';

import './styles/Home.css';

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      showError: false,
      messsageFromServer: '',
      showNullError: false,
    };
  }

  ChangeHandler = (e) => {
    this.setState({
      emailn: e.currentTarget.value,
    });
  };

  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
      });
    } else {
      try {
        const response = await axios.post(
          'http://localhost:4000/forgotPassword',
          {
            email,
          }
        );
        console.log(response.data);
        if (response.data === 'recovery email sent') {
          this.setState({
            showError: false,
            messageFromServer: 'recovery email sent',
            showNullError: false,
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'email not in db') {
          this.setState({
            showError: true,
            messageFromServer: '',
            showNullError: false,
          });
        }
      }
    }
  };

  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;

    return (
      <div>
        <form onSubmit={this.sendEmail}>
          <label className='recovery'>Enter your email :</label>
          <input
            type='email'
            id='email'
            label='email'
            className='recovery'
            value={email}
            onChange={this.ChangeHandler}
            placeholder='Email Address'
          ></input>
          <button onClick={this.sendEmail}>Submit</button>

          {showNullError && (
            <div>
              <p>The email address cannot be null.</p>
            </div>
          )}
          {showError && (
            <div>
              <p>
                That email address isn&apos;t recognized. Please try again or
                register for a new account.
              </p>
            </div>
          )}
          {messageFromServer === 'recovery email sent' && (
            <div>
              <h3>Password Reset Email Successfully Sent!</h3>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
