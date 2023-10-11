import axios from "axios";

const SERVER_URL = "javananlibrary.vercel.app/library-three-sigma.vercel.app/api/";

// @desc  Update Author
// @route PUT http://localhost:5000/api/update-author
export const updateAuthorService = (author) => {
  const url = `${SERVER_URL}/update-author`;
  return axios.put(url, author);
};

//  Author
// @desc  Create New AUTHOR Pic
// @route POST http://localhost:5000/api/create-author-pic
export const createAuthor = (formData) => {
  const url = `${SERVER_URL}/create-author-pic`;
  const headers = {
    Authorization: localStorage.getItem("token"),
    "Content-Type": "multipart/form-data",
  };
  return axios.post(url,formData, { headers: headers });
};


//  Author
// @desc  Create New AUTHOR Detail
// @route POST http://localhost:5000/api/create-author-details
export const createAuthorDetails = (author , AImg) => {
  const url = `${SERVER_URL}/create-author-details`;
  return axios.post(url, author , AImg);
};

//  Author
// @desc  GET ALL AUTHORS
// @route POST http://localhost:5000/api/get-authors
export const getAllAuthors = () => {
  const url = `${SERVER_URL}/get-authors`;
  return axios.get(url);
};

//  Author
// @desc  delete AUTHORS
// @route delete http://localhost:5000/api/delete-authors
export const deleteAuthor = (authorId , authorImage) => {
  const url = `${SERVER_URL}/delete-author`;
  return axios.delete(url , {data:{authorId , authorImage}});
};
