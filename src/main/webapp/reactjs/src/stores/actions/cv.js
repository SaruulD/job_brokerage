import axios from "axios";
import { HOST_URL } from "../../settings";

export const addEdu = (name, startYear, gradYear, eduLevel, profession) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .post(`${HOST_URL}/cv/addedu`, {
                schoolName: name,
                startAt: startYear,
                endAt: gradYear,
                degree: eduLevel,
                profession: profession,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const eduList = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/cv/listedu`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const deleteEdu = (edu_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .delete(`${HOST_URL}/cv/deleteedu/${edu_id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const editEdu = (id, schoolName, startAt, endAt, degree, profession) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .put(`${HOST_URL}/cv/editedu/`, {
                id: parseInt(id),
                schoolName: schoolName,
                startAt: startAt,
                endAt: endAt,
                degree: degree,
                profession: profession,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const addLang = (name, listening, speaking, reading, writing) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .post(`${HOST_URL}/cv/addlang`, {
                name: name,
                listening: listening,
                speaking: speaking,
                reading: reading,
                writing: writing,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const langList = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/cv/listlang`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const deleteLang = (lang_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .delete(`${HOST_URL}/cv/deletelang/${lang_id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const editLang = (id, name, listening, writing, speaking, reading) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .put(`${HOST_URL}/cv/editlang/`, {
                id: parseInt(id),
                name: name,
                listening: listening,
                writing: writing,
                speaking: speaking,
                reading: reading,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const addExp = (institute, position, startAt, endAt) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .post(`${HOST_URL}/cv/addexp`, {
                institute: institute,
                position: position,
                startAt: startAt,
                endAt: endAt,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const expList = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/cv/listexp`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const deleteExp = (exp_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .delete(`${HOST_URL}/cv/deleteexp/${exp_id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const editExp = (id, institute, position, startAt, endAt) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .put(`${HOST_URL}/cv/editexp/`, {
                id: parseInt(id),
                institute: institute,
                position: position,
                startAt: startAt,
                endAt: endAt,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });
