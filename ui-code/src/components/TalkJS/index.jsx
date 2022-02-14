import React, { Component } from "react";
import PropTypes from "prop-types";
import Talk from "talkjs";



class TalkJS extends Component {
  
    constructor(props) {
      super(props);
      Talk.ready
        .then(() => {
          const me = new Talk.User({
            id: "1234",
            name: "test1",
            email: "test1@setu.co",
            photoUrl: `https://design.setu.co/static/media/user-generic.ddb40c27.svg`,
            role: "default",
          });
          if (!window.talkSession) {
            window.talkSession = new Talk.Session({
              appId: "tCAjoGkg",
              me: me,
            });
          }
          const conversation = window.talkSession.getOrCreateConversation("999");
          conversation.setAttributes({
            subject: "Negotiation chat"
          });
          conversation.setParticipant(me);
          this.chatbox = window.talkSession.createChatbox();
          this.chatbox.select(conversation);
          this.chatbox.mount(this.container);
        })
        .catch((e) => console.error(e));
    }
  
    componentWillUnmount() {
      if (this.chatbox) {
        this.chatbox.destroy();
      }
    }
  
    render() {
      return (
           <div style={{height: "480px"}}
              className="talk-js-chatbox flex-child"
              ref={(c) => (this.container = c)}
            ></div>
      );
    }
  }
  export default TalkJS;
  