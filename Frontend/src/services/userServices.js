import axios from "axios";

const SERVER_URL = "https://library-three-sigma.vercel.app/api";

// @desc  Post Login
// @route Post http://localhost:5000/login
export const loginUser = (user) => {
  const url = `${SERVER_URL}/login`;
  return axios.post(url, user);
};

// @desc  Get All Users
// @route POST http://localhost:5000/register
export const createUser = (user) => {
  const url = `${SERVER_URL}/register`;
  return axios.post(url, user);
};

// @desc  Create New Uontact
// @route POST http://localhost:5000/get-users
export const getAllUsers = () => {
  const url = `${SERVER_URL}/get-users`;
  return axios.get(url);
};

// @desc  Change status
// @route POST http://localhost:5000/change-status
export const ChangeStatus = (userId, selectedStatus) => {
  const url = `${SERVER_URL}/change-status`;
  return axios.put(url, { userId, selectedStatus });
};


// @desc  delete user
// @route POST http://localhost:5000/delete-user
export const deleteUser = (userId) => {
    const url = `${SERVER_URL}/delete-user`;
    return axios.delete(url, {data:{userId}});
  };
  