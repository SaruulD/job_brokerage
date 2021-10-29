import axios from "axios";
import { HOST_URL } from "../../settings";
import * as actionTypes from "./actionTypes";

const rolesLocalizer = (roles) => {
    let role;
    if (Array.isArray(roles)) {
        if (roles.length === 1) {
            switch (roles[0]) {
                case 1:
                    role = "ROLE_USER";
                    break;
                case 2:
                    role = "ROLE_MODERATOR";
                    break;
                case 3:
                    role = "ROLE_OWNER";
                    break;
                default:
                    role = null;
            }
        }
    }
    localStorage.setItem("role", role);
    return role;
};
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
        loading: true,
    };
};

export const authSuccess = (username, token, role) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username,
        role: role,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
        loading: false,
    };
};

export const authLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("username");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const authLogin = (username, password) => {
    return (dispatch) => {
        dispatch(authStart());
        axios
            .post(`${HOST_URL}/auth/signin/`, {
                usernameOrEmail: username,
                password: password,
            })
            .then((res) => {
                const token = res.data.accessToken;
                let role = res.data.roles;
                role = rolesLocalizer(role);

                localStorage.setItem("ACCESS_TOKEN", token);
                localStorage.setItem("username", username);

                dispatch(authSuccess(username, token, role));
            })
            .catch((err) => {
                dispatch(authFail(err));
            });
    };
};

export const authSignup = (
    username,
    email,
    password,
    surname,
    givenname,
    phoneNumber,
    owner
) => {
    return (dispatch) => {
        dispatch(authStart());
        axios
            .post(`${HOST_URL}/auth/signup/`, {
                username: username,
                email: email,
                password: password,
                givenname: givenname,
                surname: surname,
                phoneNumber: phoneNumber,
                is_owner: owner,
            })
            .then((res) => {
                const token = res.data.key;
                let role = res.data.roles;
                role = rolesLocalizer(role);

                localStorage.setItem("ACCESS_TOKEN", token);
                localStorage.setItem("username", username);
                dispatch(authSuccess(username, token, role));
            })
            .catch((err) => {
                if (err.response.data.message !== "Access Denied") {
                    alert(err.response.data.message);
                }
                dispatch(authFail(err));
            });
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        const username = localStorage.getItem("username");
        if (token === undefined) {
            dispatch(authLogout());
        } else {
            const role = localStorage.getItem("role");
            dispatch(authSuccess(username, token, role));
        }
    };
};
