import axios from "axios";
import { HOST_URL } from "../../settings";

export const getSums = (aimag_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/profile/sum_url/${aimag_id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });
