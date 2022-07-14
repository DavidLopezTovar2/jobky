const axios = require('axios');

axios.defaults.withCredentials = true;

export const createJoboffer = (joboffer) => axios.post('http://localhost:8080/api/joboffers/create',{
    joboffer
});

export const getJoboffers = () => axios.get('http://localhost:8080/api/joboffers');

export const getJob = (id) => axios.get(`http://localhost:8080/api/job/${id}`);

export const deleteJob = (id) => axios.delete(`http://localhost:8080/api/joboffer/delete/${id}`);

export const editJoboofer = (id, joboffer) => axios.put(`http://localhost:8080/api/joboffer/edit/${id}`,{
    joboffer
})

export const addVisitsCounter = (id) => axios.put(`http://localhost:8080/api/joboffer/add-visists/${id}`);