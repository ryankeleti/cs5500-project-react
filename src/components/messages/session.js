import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as service from "../../services/security-service";

const Session = ({session, deleteSession}) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    useEffect(async () => {
        try {
            const user = await service.profile();
            setProfile(user);
        } catch (e) {
            navigate('/login');
        }
    }, []);
    const sessionInfo = (
        <Link className="list-group-item" to={`/session/${session._id}`}>
            <span className="fs-3">
                {
                    session.members.length > 2 &&
                    <img className=" ttr-z-index-1 ttr-top-40px ttr-width-70px margin-right-10"
                         src="../images/group-modified.png"></img>
                }
                {
                    session.members.length <=2 &&
                    <img className=" ttr-z-index-1 ttr-top-40px ttr-width-70px margin-right-10"
                         src="../images/single-modified.png"></img>
                }

            {
                 session.members && session.members.filter(member => member.username!=profile.username).map(
                     member => member.username
                ).join(", ")
            }
            </span>
            <button onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                deleteSession(session._id)
            }} className="btn btn-link fa-pull-right shadow-none">
                <i className="fas fa-trash" style = { {color: "red"}}></i>
            </button>
        </Link>
    );

    return (
        <div>
            {sessionInfo}
        </div>
    );
}
export default Session;
