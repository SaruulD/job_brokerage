import axios from "axios";
import { HOST_URL } from "../../settings";

export const getProfileData = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/profile/profile`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const fullDetail = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/profile/fulldetail`)
            .then((res) => {
                return resolve(res);
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
            .post(`${HOST_URL}/profile/add`, {
                race: race,
                birthdate: birthDate,
                birthAimag: birthAimag,
                birthSum: birthSum,
                birthAddress: birthAddress,
                residentAimag: residentAimag,
                residentSum: residentSum,
                residentAddress: residentAddress,
                familyName: familyName,
                gender: gender,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const editProfile = (
    id,
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
            .put(`${HOST_URL}/profile/edit`, {
                id: id,
                race: race,
                birthdate: birthDate,
                birthAimag: birthAimag,
                birthSum: birthSum,
                birthAddress: birthAddress,
                residentAimag: residentAimag,
                residentSum: residentSum,
                residentAddress: residentAddress,
                familyName: familyName,
                gender: gender,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });
