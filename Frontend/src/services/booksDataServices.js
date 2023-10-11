import axios from "axios";

const SERVER_URL = "library-three-sigma.vercel.app/api";

// @desc  Borrowing
// @route post http://localhost:5000/api/message
export const borrowingBookMessageService = (userId, bookId) => {
  const url = `${SERVER_URL}/message`;
  return axios.post(url, { userId, bookId });
};

//  message
// @desc  Get Messages
// @route POST http://localhost:5000/api/message
export const getMessageService = () => {
  const url = `${SERVER_URL}/message`;
  return axios.get(url);
};

//  message
// @desc  Confirm Message
// @route put http://localhost:5000/api/confirm-message
export const confirmMessageService = (message, status) => {
  const url = `${SERVER_URL}/confirm-message`;
  return axios.put(url, message, status);
};

// @desc  GET ALL UserMessages
// @route POST http://localhost:5000/api/get-user-message
export const GetUserMessages = (userId) => {
  const url = `${SERVER_URL}/get-user-message`;
  return axios.post(url, { userId });
};

// @desc  delete AUTHORS
// @route delete http://localhost:5000/api/mark as read
export const UserMarkAsReadService = (message) => {
  const url = `${SERVER_URL}/user-mark-as-read`;
  return axios.post(url, {message});
};
