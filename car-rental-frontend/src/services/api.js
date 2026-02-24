import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export const getCars = () => API.get("/cars");
export const addCar = (data) => API.post("/cars", data);
export const deleteCar = (id) => API.delete(`/cars/${id}`);

export const bookCar = (userId, carId, data) =>
  API.post(`/bookings/${userId}/${carId}`, data);

export const getUserBookings = (id) =>
  API.get(`/bookings/user/${id}`);