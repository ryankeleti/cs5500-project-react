import React, {useState} from "react";
import * as sessionService from "../../services/message-session-service";
import MessageSession from "./message-session"

const Messages = () => {

    const [sessions, setSession] = useState([]);

    const findAllSessions = () =>
        sessionService.findAllSessions()
            .then(sessions => setSession(sessions));

    /*return (
        <MessageSession sessions={sessions}/>
    );*/
    return (
        <MessageSession sessions={findAllSessions}/>
    );
};
export default Messages;