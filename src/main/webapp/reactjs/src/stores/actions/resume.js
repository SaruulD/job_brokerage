import axios from "axios";
import { HOST_URL } from "../../settings";

export const usersResumeList = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/resume/usersresume`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const createResume = (resumeName, content) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .post(`${HOST_URL}/resume/add`, {
                resume: content,
                name: resumeName,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const viewResume = (resume_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/resume/${resume_id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const editResume = (id, resumeName, content) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .put(`${HOST_URL}/resume/edit`, {
                id: id,
                resume: content,
                name: resumeName,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const deleteResume = (id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .delete(`${HOST_URL}/resume/delete/${id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const sendResume = (resumeId, jobId) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(
                `${HOST_URL}/resume/sendresume?resumeId=${resumeId}&jobId=${jobId}`
            )
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const jobResumes = (jobId) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/resume/jobresumes/${jobId}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const receivedResume = (resume_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/resume/viewreceived/${resume_id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });
