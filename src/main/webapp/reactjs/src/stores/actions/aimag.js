import axios from "axios";
import { HOST_URL } from "../../settings";

export const getAimag = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/profile/aimag`)
            .then((res) => {
                return resolve(res.data);
            })
            .catch((err) => {
                return reject(err);
            });
    });
