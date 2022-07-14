const axios = require('axios');

export const createUser = (user) => axios.post('http://localhost:8080/api/users/create',{
    user
});

export const getUsers = () => axios.get('http://localhost:8080/api/users');

export const findUsersWithExperience = (experience) => axios.get(`http://localhost:8080/api/users/findByExperience/${experience}`)

export const getUserById = (id) => axios.get(`http://localhost:8080/api/user/${id}`);

export const deleteUser = (id) => axios.delete(`http://localhost:8080/api/user/delete/${id}`);

export const login = (user) => axios.post('http://localhost:8080/api/users/login',{
    user
})

export const logout = () => axios.get('http://localhost:8080/api/users/logout');
