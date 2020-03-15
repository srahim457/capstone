import React, { Component } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

function Nombre(props) {
  return <h1>This is the {props.name} page</h1>;
}

const element = <Nombre name='Profile' />;

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>
          <Nombre name='Profile' />
        </h1>
        <p>Check it out</p>
      </div>
    );
  }
}

export default Profile;
