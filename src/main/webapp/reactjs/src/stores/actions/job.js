import axios from "axios";
import { HOST_URL } from "../../settings";
import * as actionTypes from "./actionTypes";

export const jobCategoryList = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/job/categorylist`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const jobTypeList = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/job/typelist`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const jobPostedDate = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/job/jobposteddate`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const postJob = (
    company_id,
    job_title,
    selectCatList,
    selectTypeList,
    genderLimit,
    ageUp,
    ageDn,
    content,
    salary,
    ageLimit,
    selectedGender
) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .post(`${HOST_URL}/job/add/`, {
                company_id: company_id,
                job_title: job_title,
                category_id: selectCatList,
                job_type_id: selectTypeList,
                gender: genderLimit,
                ageUp: ageUp,
                ageDn: ageDn,
                description: content,
                salary: salary,
                ageLimit: ageLimit,
                selectedGender: selectedGender,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const getAllJobs = () =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/job/list`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const JobsByPage = (pageNo) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(
                `${HOST_URL}/job/jobpage?page=${pageNo}&size=20&sort=createdDate,desc`
            )
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const jobDetails = (job_id) => {
    return {
        type: actionTypes.JOB_DETAILS,
        job_id: job_id,
    };
};

export const JobById = (job_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/job/jobbyid/${job_id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const searchJob = (searchText, catId, typeId, dateId, pageNo) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(
                `${HOST_URL}/job/search?searchText=${searchText}&catId=${catId}&typeId=${typeId}&dateId=${dateId}&page=${pageNo}&size=20&sort=createdDate`
            )
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const JobTypeById = (jobType_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/job/jobtypebyid/${jobType_id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const JobCatById = (jobCat_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/job/jobcatbyid/${jobCat_id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const jobByCompany = (company_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/job/jobbycompany/${company_id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const jobByCompanyCount = (company_id) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .get(`${HOST_URL}/job/jobbycompanycount/${company_id}`)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });

export const editJob = (
    jobId,
    company_id,
    job_title,
    selectCatList,
    selectTypeList,
    genderLimit,
    ageUp,
    ageDn,
    content,
    salary,
    ageLimit,
    selectedGender
) =>
    new Promise(function (resolve, reject) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
        axios
            .put(`${HOST_URL}/job/edit/`, {
                id: jobId,
                company_id: company_id,
                job_title: job_title,
                category_id: selectCatList,
                job_type_id: selectTypeList,
                gender: genderLimit,
                ageUp: ageUp,
                ageDn: ageDn,
                description: content,
                salary: salary,
                ageLimit: ageLimit,
                selectedGender: selectedGender,
            })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });
