import api from "./Api";

export const getMedicines = () => api.get("/medicines");

export const addMedicine = (data) =>
  api.post("/medicines", data);

export const updateStock = (id, quantity) =>
  api.put(`/stock/${id}`, { quantity });