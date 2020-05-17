import React, { Component } from 'react';
import axios from 'axios';

import './styles/Home.css';

const styleTitle = {
  fontFamily: 'fantasy',
  color: 'black'
};

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

  // ChangeHandler = (e) => {
  //   this.setState({
  //     email: e.target.value,
  //   });
  // };
  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // sendEmail = async (e) => {
  //   e.preventDefault();
  //   const { email } = this.state;
  //   if (email === '') {
  //     this.setState({
  //       showError: false,
  //       messageFromServer: '',
  //       showNullError: true,
  //     });
  //   } else {
  //     try {
  //       const response = await axios.post(
  //         'http://localhost:4000/forgotpassword',

  //         this.state.email,

  //       );
  //       console.log(response.data);
  //       if (response.data === 'recovery email sent') {
  //         this.setState({
  //           showError: false,
  //           messageFromServer: 'recovery email sent',
  //           showNullError: false,
  //         });
  //       }
  //     } catch (error) {
  //       console.error(error.response.data);
  //       if (error.response.data === 'email not in db') {
  //         this.setState({
  //           showError: true,
  //           messageFromServer: '',
  //           showNullError: false,
  //         });
  //       }
  //     }
  //   }
  // };

  sendEmail = (e) => {
    e.preventDefault();
    //const { email } = this.state;
    console.log(this.state.email, '     email');
    if (this.state.email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        //showNullError: true,
      });
    } else {
      axios
        .post('http://localhost:4000/forgotpassword',
          this.state.email ,
        )
        .then(response => {
          console.log(response.data);
          if (response.data === 'email not in db') {
            this.setState({
              showError: true,
              messageFromServer: '',
            });
          } else if (response.data === 'recovery email sent') {
            this.setState({
              showError: false,
              messageFromServer: 'recovery email sent',
              //showNullError: false,
            });
          }
          // }
        });
    }
  };

  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;

    return (
      <div>
        <form onSubmit={this.sendEmail}>
          <h1 style={styleTitle}>Forgot Password</h1>
          <label className='recovery' style={styleTitle}> <strong>Enter your email </strong> :</label>
          <input
            style={styleTitle}
            type='email'
            id='email'
            label='email'
            className='recovery'
            value={email}
            onChange={this.handleChange('email')}
            placeholder='Email Address'
          ></input>
          <button className='submit-button'>Submit</button>

          {showNullError && (
            <div>
              <p style={styleTitle}>The email address cannot be empty.</p>
            </div>
          )}
          {showError && (
            <div>
              <p style={styleTitle}>
                That email address isn&apos;t recognized. Please try again or
                register for a new account.
              </p>
            </div>
          )}
          {messageFromServer === 'recovery email sent' && (
            <div>
              <h3 style={styleTitle}>Password Reset Email Successfully Sent!</h3>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
