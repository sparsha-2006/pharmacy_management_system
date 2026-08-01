import api from "./Api";

export const getRecommendation = (data) =>
  api.post("/ai/recommend", data);