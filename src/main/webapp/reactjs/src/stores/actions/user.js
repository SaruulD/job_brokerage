import axios from "axios";
import { HOST_URL } from "../../settings";

export const userGetAccount = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/user/myaccount`)
            .then((res) => {
                return resolve(res.data);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const createProfile = (
    race,
    birthDate,
    birthAimag,
    birthSum,
    birthAddress,
    residentAimag,
    residentSum,
    residentAddress,
    familyName,
    gender
) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .post(
                `${HOST_URL}/profile/add`,
                race,
                birthDate,
                birthAimag,
                birthSum,
                birthAddress,
                residentAimag,
                residentSum,
                residentAddress,
                familyName,
                gender
            )
            .then((res) => {
                return resolve(res.data);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const addToFavList = (job_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/user/addtofavlist?jobId=${job_id}`)
            .then((res) => {
                return resolve(res.data);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const removeFromFav = (job_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/user/removefromfav?jobId=${job_id}`)
            .then((res) => {
                return resolve(res.data);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const isFav = (job_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/user/checkfavlist?jobId=${job_id}`)
            .then((res) => {
                return resolve(res.data);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const getFavList = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/user/favlist`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });
