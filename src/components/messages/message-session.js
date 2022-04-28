import React, {useEffect, useState, useRef} from "react";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as securityService from "../../services/security-service";
import * as userService from "../../services/users-service";
import * as messageService from "../../services/messages-service";
import * as messageSessionService from "../../services/message-session-service";
import Messages from "./messages.js";

const MessageSession = ({session}) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [members, setMembers] = useState([]);
  const [invited, setInvited] = useState('');

  const findMembers = () => {
    if (profile && session) {
      messageSessionService.findSessionById(session._id)
        .then(s => setMembers(s.members));
    }
  }

  const findMessages = () => {
    if (profile && session) {
      messageService.findMessagesInSession(session._id)
        .then(messages => setMessages(messages));
    }
  }

  const createMessage = () => {
    if (profile && session) {
      if (message) {
        messageService.createMessage(profile._id, session._id, {message})
            .then(findMessages)
            .then(() => document.getElementById("message-textarea").value = "");
      }
    }
  }

  const addUserToSession = () => {
    if (profile && session) {
      if (invited) {
        userService.findUserByUsername(invited)
            .then(user =>{
              if(user!=null){
                messageSessionService.addUserToSession(session._id, profile._id, user._id)
              }
             else{
               alert("No such user");
              }
            })
            .then(() => setInvited(''))
            .then(findMembers);
      }
    }
  }

  /* Sourced from:
   * https://stackoverflow.com/questions/46140764/polling-api-every-x-seconds-with-react */
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
       savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useEffect(() => {
    async function getProfile() {
      try {
        const user = await securityService.profile();
        setProfile(user);
      } catch (e) {
        navigate('/login');
      }
    }
    getProfile();
  }, []);

  useEffect(findMessages, [profile, session, messages]);
  useEffect(findMembers, [profile, session, members]);

  useInterval(() => {
    findMessages();
  }, 1000 * 2);

  useInterval(() => {
    findMembers();
  }, 1000 * 10);

  return(
    <div>

      <div className="p-2 w-100">
          <h2>Users in session: { session.members && session.members.map(member => member.username).join(", ") }</h2>
          <textarea onChange={(e) => setInvited(e.target.value)}
                    placeholder="Enter username to add to session"
                    className="w-100 border-0"></textarea>
          <a onClick={addUserToSession}
             className={`btn btn-primary rounded-pill fa-pull-right fw-bold ps-4 pe-4`}>
                Add user to session
          </a>
      </div>
      <div>

      </div>
      <div className= "page">

      </div>
      <section className = "chatbox">
        <section className = "chat-window">
          <Messages messages={messages}
                    refreshMessages={findMessages}/>

          <div className="p-2 w-100">

            <textarea onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter message."
                      className="w-100 border-0"></textarea>
            <div className="row">
              <div className="col-10 ttr-font-size-150pc text-primary">
                <i className="fas fa-portrait me-3"></i>
                <i className="far fa-gif me-3"></i>
                <i className="far fa-bar-chart me-3"></i>
                <i className="far fa-face-smile me-3"></i>
                <i className="far fa-calendar me-3"></i>
                <i className="far fa-map-location me-3"></i>
              </div>
              <div className="col-2">
                <a onClick={createMessage}
                   className={`btn btn-primary rounded-pill fa-pull-right
                               fw-bold ps-4 pe-4`}>Send</a>
              </div>
            </div>
          </div>
        </section>
      </section>



    </div>
  );
};

export default MessageSession;

