
import React from 'react';
import io from 'socket.io-client';
import config from '../config/socket';
import Messages from './Messages';
import Chat from './Chat';

import axios from 'axios';

require('./styles/ChatMain.css');


class ChatMain extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    console.log('main chat app received these props',props)
    this.state = { messages: [],targetID: '',loggedInUserID:'' };
    this.sendHandler = this.sendHandler.bind(this);
    
    // Connect to the server
    this.socket = io(config.api, { query: `username=${props.username}` }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      var d = new Date();
      this.addMessage(message);
      console.log('just got a message',message,d,props.targetID,props.loggedInUserID)
      const messagetosend = JSON.stringify({message,d})
      const response = axios.post('http://localhost:4000/profile/message/create',messagetosend)
    });

    this.socket.on('not connected', message => {
      var d = new Date();
      this.addMessage(message);
      console.log('user not connected',message,d,this.state)
      const messagetosend = JSON.stringify({message,d})
      const response = axios.post('http://localhost:4000/profile/message/create',messagetosend)
    });
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message,
      targetname: this.props.targetname,
      targetID: this.props.targetID,
      loggedInUserID: this.props.loggedInUserID
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    console.log('appending this message \n',message)
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    return (
      <div className="container">
        <h3>{this.props.targetname}</h3>
        <Messages messages={this.state.messages} />
        <Chat onSend={this.sendHandler} />
      </div>
    );
  }

}
ChatMain.defaultProps = {
};

export default ChatMain;