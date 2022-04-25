import {useEffect, useState} from "react";
import * as sessionService from "../../services/message-session-service";
import {useParams} from "react-router-dom";
import MessageSession from "./message-session";

const MessageSessionScreen = () => {
    const [session, setSession] = useState({});
    const {sid} = useParams();
    console.log("session id:" + sid);
    const findSessionById = () => {
        sessionService.findSessionById(sid)
            .then(session => setSession(session));
    }

    useEffect(findSessionById, []);

    return(
        <div>
            <MessageSession session={session}/>
        </div>
    );
};
export default MessageSessionScreen;
