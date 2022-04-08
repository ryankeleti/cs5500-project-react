import axios from "axios";

const api = axios.create({
    withCredentials: true
});

const BASE_URL = process.env.REACT_APP_BASE_URL;
const SESSIONS_URL = `${BASE_URL}/api/sessions`;

export const findAllSessions = () =>
    api.get(`${SESSIONS_URL}`)
        .then(response => response.data);

export const findSessionsByUser = (uid) =>
    api.get(`${BASE_URL}/api/users/${uid}/sessionss`)
        .then(response => response.data);

export const findSessionById = (sid) =>
    api.get(`${SESSIONS_URL}/${sid}`)
        .then(response => response.data);

export const createSession = (messageSession) =>
    api.post(`${SESSIONS_URL}`, messageSession)
        .then(response => response.data);

export const deleteSession = (sid) =>
    api.delete(`${SESSIONS_URL}/${sid}`)
        .then(response => response.data);