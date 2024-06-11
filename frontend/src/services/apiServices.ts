import store from "@/app/store";
import { selectAuthIdToken } from "@/features/auth/authSelectors";
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
    
});

api.interceptors.request.use(req => {
    const idToken = selectAuthIdToken(store.getState());
    if (idToken) req.headers.Authorization = `Bearer ${idToken}`;
    else delete req.headers.Authorization;
    return req;
});

api.interceptors.response.use(res => {
    // @todo all 400 > 50 errors
    if (res.status >= 400 && res.status < 600) {
        console.error(res.status, res.data);
    }
    return res;
});