import React, { Component } from 'react';

class Items extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: '',
      description: '',
      start: date.toLocaleDateString(),
      end: Date()
    };
  }

  render() {
    return <h1>{this.state}</h1>;
  }
}

export default Items;
