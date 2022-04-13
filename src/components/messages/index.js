import React, {useEffect, useState} from "react";
import * as sessionService from "../../services/message-session-service";
import MessageSession from "./message-session"

const Messages = () => {

    const [sessions, setSession] = useState([]);
    const findSessionsByUser = () =>
        sessionService.findSessionsByUser("my")
            .then(sessions => setSession(sessions));

    useEffect(findSessionsByUser, []);

    /*return (
        <MessageSession sessions={sessions}/>
    );*/
    return (
        <MessageSession sessions={sessions}/>
    );
};
export default Messages;