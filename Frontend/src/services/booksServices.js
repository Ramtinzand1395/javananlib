import axios from "axios";

const SERVER_URL = "https://library-three-sigma.vercel.app/api";

// @desc  Update Book
// @route PUT http://localhost:5000/api/update-book
export const updateBookService = (book) => {
  const url = `${SERVER_URL}/update-book`;
  return axios.put(url, book);
};

// @desc  Change status
// @route POST http://localhost:5000/change-book-status
export const ChangeBookStatus = (message) => {
  const url = `${SERVER_URL}/change-book-status`;
  return axios.put(url, message);
};

//  Author
// @desc  Create New BOOK Pic
// @route POST http://localhost:5000/api/create-BOOK-pic
export const createBookImg = (formData) => {
  const url = `${SERVER_URL}/create-book-pic`;
  const headers = {
    Authorization: localStorage.getItem("token"),
    "Content-Type": "multipart/form-data",
  };
  return axios.post(url,formData, { headers: headers });
};


//  Author
// @desc  Create New Book Detail
// @route POST http://localhost:5000/api/create-book-details
export const createBookDetails = (book , bookImg) => {
  const url = `${SERVER_URL}/create-book-details`;
  return axios.post(url, book , bookImg);
};

//  Author
// @desc  GET ALL Books
// @route POST http://localhost:5000/api/get-books
export const getAllBooks = () => {
  const url = `${SERVER_URL}/get-books`;
  return axios.get(url);
};

//  Author
// @desc  delete Book
// @route delete http://localhost:5000/api/delete-books
export const deleteBook = (bookId , bookImage) => {
  const url = `${SERVER_URL}/delete-book`;
  return axios.delete(url , {data:{bookId , bookImage}});
};
