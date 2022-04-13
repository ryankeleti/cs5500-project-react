import Session from "./session";

const MessageSession = ({sessions = [], refreshSessions}) => {

    return (
        <div>
            <ul className="ttr-tuits list-group">
                {
                    sessions.map && sessions.map(session =>
                        <Session key={session._id}
                        session={session}/>)
                }
            </ul>
        </div>
    );
}

export default MessageSession;