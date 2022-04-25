import React from "react";
import {useNavigate, Link} from "react-router-dom";

const Message = ({message}) => {
  const navigate = useNavigate();

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

  return(
    <div>
      { message.message }
      <br/>
      <em>Sent by { message.sender.username } at { getDate() }</em>
    </div>
  );
}

export default Message;
