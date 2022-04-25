import {Link} from "react-router-dom";

const Session = ({session}) => {
    const sessionInfo = (
        <Link to={`/session/${session._id}`}>
            Session with
            {
                 session.members && session.members.map(member => member.username).join(", ")
            }
        </Link>
    );

    return (
        <div>
            {sessionInfo}
        </div>
    );
}
export default Session;
