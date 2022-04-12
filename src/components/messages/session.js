import {Link, useNavigate} from "react-router-dom";

const Session = ({session}) => {
    const navigate = useNavigate();
    return (
        <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
            <div className="pe-2">
                {
                    session.users
                }
            </div>
        </li>
    );
}
export default Session;