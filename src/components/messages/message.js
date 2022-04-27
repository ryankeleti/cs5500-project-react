import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import "./messages.css";
import * as securityService from "../../services/security-service";
import profile from "../profile";

const Message = ({message}) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  // Simplify?
  const getDate = () => {

    const date = new Date(message.timestamp);
    const hours = date.getHours();
    const mins = date.getMinutes().toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = date.getMonth().toString().padStart(2, '0');
    const day = date.getDay().toString().padStart(2, '0');
    return `${hours}:${mins} on ${year}-${month}-${day}`;
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

  return(

          <div className={"conversation"}>
            <div className={"conversation-container"}>
              {
                profile._id === message.sender._id ? (
                    <div className="message-sent">
                      <div>
                        { message.message }
                        <br/>
                        <em> Sent by { message.sender.username } at { getDate() } </em>
                      </div>
                    </div> ) :
                    (
                    <div className="message-received">
                      <div>
                        { message.message }
                        <br/>
                        <em> Sent by { message.sender.username } at { getDate() }</em>
                      </div>
                 </div>)
              }

            </div>
          </div>


  );
}

export default Message;
