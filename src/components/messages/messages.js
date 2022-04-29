import React from "react";
import * as messagesService from "../../services/messages-service";
import Message from "./message";

const Messages = ({messages = [], refreshMessages}) => {
    const deleteMessage = (mid) =>
        messagesService.deleteMessage(mid)
            .then(refreshMessages);

    return (
        <div>
          <ul className="ttr-tuits list-group">
            {
              messages.map && messages.map(message =>
                  <Message key={message._id}
                           message={message}
                           deleteMessage={deleteMessage}/>)
            }
          </ul>
        </div>
      );
}

export default Messages;
