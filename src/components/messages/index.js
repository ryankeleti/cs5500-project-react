import React, {useEffect, useState} from "react";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as securityService from "../../services/security-service"
import * as sessionService from "../../services/message-session-service";
import Session from "./session";

const Messages = () => {
    const navigate = useNavigate();
    const [sessions, setSession] = useState([]);
    const [profile, setProfile] = useState({});

    const findSessionsByUser = () =>
        sessionService.findSessionsByUser("my")
            .then(sessions => setSession(sessions));

    const createSession = () => {
       if (profile) {
         sessionService.createSession({ members: [profile] })
            .then(findSessionsByUser)
       }
    }

    const deleteSession = (sid) =>
        sessionService.deleteSession(sid)
            .then(findSessionsByUser)

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
    useEffect(findSessionsByUser, []);

    return (
        <div>
            <div className="row">
                <div className="col">
           <a onClick={createSession}
              className={`btn btn-primary rounded-pill fa-pull-right
                                fw-bold ps-4 pe-4 mb-4`}>
              Create new session
           </a>
                </div>
            </div>
            <div className="row">
           <ul className="ttr-tuits list-group">
               {
                   sessions.map && sessions.map(session =>
                       <Session key={session._id}
                                session={session}
                       deleteSession={deleteSession}/>)
               }
           </ul>
            </div>
        </div>
    );
};
export default Messages;
