import {Link} from "react-router-dom";

const Session = ({session}) => {
    const sessionItems = (
        <ul>
            {
            session.members.map(member => (
                <Link to={`/home`}>
                    <li>{member.firstName}</li>
                </Link>))
            }
        </ul>
    );

    return (
        <div>
            {sessionItems}
        </div>
    );
}
export default Session;