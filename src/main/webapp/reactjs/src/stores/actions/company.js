import axios from "axios";
import { HOST_URL } from "../../settings";

export const ownerCreateCompany = (companyName, description, location) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .post(`${HOST_URL}/company/add`, {
                name: companyName,
                description: description,
                location: location,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const usersCompanyList = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/company/userscompany`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const companyById = (company_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/company/companybyid/${company_id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const deleteCompany = (id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .delete(`${HOST_URL}/company/delete/${id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const editCompany = (id, name, location, description) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .put(`${HOST_URL}/company/edit`, {
                id: id,
                name: name,
                location: location,
                description: description,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const searchCompany = (searchText, pageNo) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(
                `${HOST_URL}/company/search?searchText=${searchText}&page=${pageNo}&size=20`
            )
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const searchUser = (searchText) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/company/usersearch?searchText=${searchText}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const addModerator = (userId, companyId) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(
                `${HOST_URL}/company/addmoderator?userId=${userId}&companyId=${companyId}`
            )
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const checkModerator = (userId, companyId) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(
                `${HOST_URL}/company/checkmod?userId=${userId}&companyId=${companyId}`
            )
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const moderatorList = (companyId) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/company/moderatorlist?companyId=${companyId}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const removeModerator = (userId, companyId) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .delete(
                `${HOST_URL}/company/removemoderator/${companyId}/${userId}`
            )
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });
