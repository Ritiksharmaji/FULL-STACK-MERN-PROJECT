import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth"; 
const API_URL = "https://full-stack-mern-project-p5ay.vercel.app/api/auth/"; 

export const registerUser = async (userData) => {
  return   axios.post(`${API_URL}register`, userData);
};

export const loginUser = async (userData) => {
  return  axios.post(`${API_URL}login`, userData);
};

