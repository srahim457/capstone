import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import axios from 'axios';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let target = e.target;
    let name = target.name;
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleChange(e) {
    let target = e.target;
    let name = target.name;
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    axios
      .post('http://localhost:4000/signup', this.state)
      .then(res => console.log(res.data));
    console.log('The signup  form was submitted with the following data:');
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='FormFields'>
          <div className='FormField'>
            <label className='FormField__Label' htmlFor='name'>
              <strong>First Name</strong>
            </label>
            <input
              type='text'
              id='firstname'
              className='FormField__Input'
              placeholder='Enter your first name'
              name='firstname'
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className='FormField'>
            <label className='FormField__Label' htmlFor='name'>
              <strong>Last Name</strong>
            </label>
            <input
              type='text'
              id='lastname'
              className='FormField__Input'
              placeholder='Enter your last name'
              name='lastname'
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className='FormField'>
            <label className='FormField__Label' htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              id='password'
              className='FormField__Input'
              placeholder='Enter your password'
              name='password'
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div className='FormField'>
            <label className='FormField__Label' htmlFor='email'>
              <strong>E-Mail Address</strong>
            </label>
            <input
              type='email'
              id='email'
              className='FormField__Input'
              placeholder='Enter your campus email'
              name='email'
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>

          <div className='FormField'>
            <button className='FormField__Button mr-20'>Sign Up</button>{' '}
            <Link exact to='sign-in' className='FormField__Link'>
              I'm already a member
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
