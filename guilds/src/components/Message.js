import React from 'react';

class Message extends React.Component {
  render() {
    // Emulates the left right of most messages
    // If its from-me than swap sides
    const fromMe = this.props.fromMe ? 'from-me' : '';

    return (
      <div className={`message ${fromMe}`}>
        <div className='username'>
          { this.props.username }
        </div>
        <div className='message-body'>
          { this.props.message }
        </div>
      </div>
    );
  }
}

Message.defaultProps = {
  message: '',
  username: '',
  fromMe: false
};

export default Message;