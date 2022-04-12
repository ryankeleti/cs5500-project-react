import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const MESSAGES_API = `${BASE_URL}/api/messages`;

const api = axios.create({
    withCredentials: true
});

export const findAllMessages = () =>
    api.get(MESSAGES_API)
        .then(response => response.data);

export const findMessageById = (mid) =>
    api.get(`${MESSAGES_API}/${mid}`)
        .then(response => response.data);

export const findAllMessagesSentByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/messages`)
        .then(response => response.data);

export const findMessagesInSession = (sid) =>
    api.get(`${MESSAGES_API}/session/${sid}`)
        .then(response => response.data);

export const createMessage = (uid, sid, message) =>
    api.post(`${USERS_API}/${uid}/messages/session/${sid}`, message)
        .then(response => response.data);

export const deleteMessage = (mid) =>
    api.delete(`${MESSAGES_API}/${mid}`)
        .then(response => response.data);