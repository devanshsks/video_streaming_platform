import axios from "axios";
import { loginFailure,loginSuccess,loginStart } from "./AuthActions";

export const login = async (user, dispatch) => {
    
    dispatch(loginStart());
    try {
        const res = await axios.post("auth/login", user);
        dispatch(loginSuccess(res.data));
        window.location.replace("/");
    } catch (error) {
        dispatch(loginFailure());
        alert(error.response.data);
    }
};