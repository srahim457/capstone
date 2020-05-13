// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import './styles/Home.css';
// import axios from 'axios';

// class SignUp extends Component {
//   constructor() {
//     super();

//     this.state = {
//       email: '',
//       password: '',
//       firstname: '',
//       lastname: '',
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handlePasswordChange = this.handlePasswordChange.bind(this);
//     this.handleEmailChange = this.handleEmailChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e) {
//     let target = e.target;
//     let name = target.name;
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   }
//   handleEmailChange(e) {
//     this.setState({
//       email: e.target.value,
//     });
//   }
//   handlePasswordChange(e) {
//     this.setState({
//       password: e.target.value,
//     });
//   }
//   handleSubmit(e) {
//     e.preventDefault();
//     axios
//       .post('http://localhost:4000/signup', this.state)
//       .then((res) => console.log(res.data));
//     console.log('The signup  form was submitted with the following data:');
//     console.log(this.state);
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit} className='FormFields'>
//           <div className='FormField'>
//             <label className='FormField__Label' htmlFor='name'>
//               <strong>First Name</strong>
//             </label>
//             <input
//               type='text'
//               id='firstname'
//               className='FormField__Input'
//               placeholder='Enter your first name'
//               name='firstname'
//               value={this.state.name}
//               onChange={this.handleChange}
//             />
//           </div>
//           <div className='FormField'>
//             <label className='FormField__Label' htmlFor='name'>
//               <strong>Last Name</strong>
//             </label>
//             <input
//               type='text'
//               id='lastname'
//               className='FormField__Input'
//               placeholder='Enter your last name'
//               name='lastname'
//               value={this.state.name}
//               onChange={this.handleChange}
//             />
//           </div>
//           <div className='FormField'>
//             <label className='FormField__Label' htmlFor='password'>
//               <strong>Password</strong>
//             </label>
//             <input
//               type='password'
//               id='password'
//               className='FormField__Input'
//               placeholder='Enter your password'
//               name='password'
//               value={this.state.password}
//               onChange={this.handlePasswordChange}
//             />
//           </div>
//           <div className='FormField'>
//             <label className='FormField__Label' htmlFor='email'>
//               <strong>E-Mail Address</strong>
//             </label>
//             <input
//               type='email'
//               id='email'
//               className='FormField__Input'
//               placeholder='Enter your campus email'
//               name='email'
//               value={this.state.email}
//               onChange={this.handleEmailChange}
//             />
//           </div>

//           <div className='FormField'>
//             <button className='FormField__Button mr-20'>Sign Up</button>{' '}
//             <Link to='/sign-in' className='FormField__Link'>
//               I'm already a member
//             </Link>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// export default SignUp;



import React, { Component, useState } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import PropTypes from 'prop-types';

import './styles/Home.css';
import axios from 'axios';

const SignUp =({setAlert, register, isAuthenticated}) => {
 
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    });
  
    const { email ,password, firstname, lastname} =formData; 

    // this.handleChange = this.handleChange.bind(this);
    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.handleEmailChange = this.handleEmailChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  
  

  // handleChange(e) {
  //   let target = e.target;
  //   let name = target.name;
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // }
  // handleEmailChange(e) {
  //   this.setState({
  //     email: e.target.value,
  //   });
  // }
  // handlePasswordChange(e) {
  //   this.setState({
  //     password: e.target.value,
  //   });
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   axios
  //     .post('http://localhost:4000/signup', formData)
  //     .then((res) => console.log(res.data));
  //   console.log('The signup  form was submitted with the following data:');
  //   console.log(formData);
  // }
  const handleSubmit = async e => {
    e.preventDefault();
  
      await register({ firstname, lastname, email, password });
      setAlert('Registration Successful');
      alert('Registration Successful');
  };
  
  if(isAuthenticated) {
    return (<Redirect to='/profile' />,
    window.location.reload()
    )
  }
    
    return (
      <div>
        <form onSubmit={e => handleSubmit(e)} className='FormFields'>
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
              value={firstname}
              onChange={e => onChange(e)}
          />
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
              value={lastname}
              onChange={e => onChange(e)}
          />
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
              value={password}
              onChange={e => onChange(e)}
          />
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
              value={email}
              onChange={e => onChange(e)}
          />
            />
          </div>

          <div className='FormField'>
            <button className='FormField__Button mr-20'>Sign Up</button>{' '}
            <Link to='/sign-in' className='FormField__Link'>
              I'm already a member
            </Link>
          </div>
        </form>
      </div>
    );
  }




SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(SignUp);


