// import React, { Component, Fragment } from 'react';
// import { Link, Route, Redirect } from 'react-router-dom';
// import ForgotPassword from './ForgotPassword';
// import './styles/Home.css';
// import axios from 'axios';

// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       username: '',
//       password: '',
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e) {
//     let target = e.target;
//     let name = target.name;
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault();

//     axios
//       .post('http://localhost:4000/auth', this.state)
//       .then((res) => console.log(res.data));
//     console.log('The login form was submitted with the following data:');
//     console.log(this.state);
//   }

//   // if(isAuthenticated) {
//   //   return <Redirect to='/profile' />;
//   // }

//   // passport requires username instead of email
//   render() {
//     return (
//       <Fragment>
//         <div className='FormCenter'>
//           <form onSubmit={this.handleSubmit} className='FormFields'>
//             <div className='FormField'>
//               <label className='FormField__Label' htmlFor='email'>
//                 <strong>E-Mail Address</strong>
//               </label>
//               <input
//                 type='username'
//                 id='username'
//                 className='FormField__Input'
//                 placeholder='Enter your email'
//                 name='username'
//                 value={this.state.username}
//                 onChange={this.handleChange}
//               />
//             </div>

//             <div className='FormField'>
//               <label className='FormField__Label' htmlFor='password'>
//                 <strong>Password</strong>
//               </label>
//               <input
//                 type='password'
//                 id='password'
//                 className='FormField__Input'
//                 placeholder='Enter your password'
//                 name='password'
//                 value={this.state.password}
//                 onChange={this.handleChange}
//               />
//             </div>

//             <div className='FormField'>
//               <button className='FormField__Button mr-20'>Sign In</button>{' '}
//               <Link to='/' className='FormField__Link'>
//                 <strong>Create an account</strong>
//               </Link>
//               <br />
//               <br />
//               <Route path='/forgot-password' component={ForgotPassword}></Route>
//               <Link to='/forgot-password' className='FormField__Link'>
//                 <strong>Forgot your password?</strong>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </Fragment>
//     );
//   }
// }

// export default Login;

// import React, { Component, Fragment, useState } from 'react';
// import { Link, Route, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { login } from '../actions/auth'; //FIX THIS
// import ForgotPassword from './ForgotPassword';
// import axios from 'axios';
// import './styles/Home.css';

// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       username: '',
//       password: '',
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e) {
//     let target = e.target;
//     let name = target.name;
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault();

//     axios
//       .post('http://localhost:4000/auth', this.state)
//       .then((res) => console.log(res.data));
//     console.log('The login form was submitted with the following data:');
//     console.log(this.state);
//   }

//   if(isAuthenticated) {
//     return <Redirect to='/profile' />;
//   }

//   render() {
//     return (
//       <Fragment>
//         <div className='FormCenter'>
//           <form onSubmit={this.handleSubmit} className='FormFields'>
//             <div className='FormField'>
//               <label className='FormField__Label' htmlFor='email'>
//                 <strong>E-Mail Address</strong>
//               </label>
//               <input
//                 type='username'
//                 id='username'
//                 className='FormField__Input'
//                 placeholder='Enter your email'
//                 name='username'
//                 value={this.state.username}
//                 onChange={this.handleChange}
//               />
//             </div>

//             <div className='FormField'>
//               <label className='FormField__Label' htmlFor='password'>
//                 <strong>Password</strong>
//               </label>
//               <input
//                 type='password'
//                 id='password'
//                 className='FormField__Input'
//                 placeholder='Enter your password'
//                 name='password'
//                 value={this.state.password}
//                 onChange={this.handleChange}
//               />
//             </div>

//             <div className='FormField'>
//               <button className='FormField__Button mr-20'>Sign In</button>{' '}
//               <Link to='/' className='FormField__Link'>
//                 <strong>Create an account</strong>
//               </Link>
//               <br />
//               <br />
//               <Route path='/forgot-password' component={ForgotPassword}></Route>
//               <Link to='/forgot-password' className='FormField__Link'>
//                 <strong>Forgot your password?</strong>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </Fragment>
//     );
//   }
// }

// export default Login;

import React, { Component, Fragment, useState } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth'; //FIX THIS
import ForgotPassword from './ForgotPassword';
import axios from 'axios';
import Profile from './Profile';
import './styles/Home.css';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    forceUpdate: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // axios
    //   .post('http://localhost:4000/auth', this.state)
    //   .then((res) => console.log(res.data));
    // console.log('The login form was submitted with the following data:');
    // console.log(this.state);
    login(email, password);
  };

  if (isAuthenticated) {
    return (<Redirect to='/profile' ></Redirect>), window.location.reload();
  }

  return (
    <Fragment>
      <div className='FormCenter'>
        <form onSubmit={(e) => onSubmit(e)} className='FormFields'>
          <div className='FormField'>
            <label className='FormField__Label' htmlFor='email'>
              <strong>E-Mail Address</strong>
            </label>
            <input
              type='email'
              id='email'
              className='FormField__Input'
              placeholder='Enter your email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
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
              onChange={(e) => onChange(e)}
              required
              minLength='6'
            />
          </div>

          <div className='FormField'>
            <button className='FormField__Button mr-20'>Sign In</button>{' '}
            {/*  <Link to='/' className='FormField__Link'>
              <strong>Create an account</strong>
            </Link>
            <br />
            <br />
  */}
            <Route path='/forgot-password' component={ForgotPassword}></Route>
            <Link to='/forgot-password' className='FormField__Link'>
              <strong>Forgot your password?</strong>
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
