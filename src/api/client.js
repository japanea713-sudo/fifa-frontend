import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const getPlayers = (limit = 100) =>
  axios.get(`${API_URL}/players`, { params: { limit } });

export const getPlayer = (sofifaId) =>
  axios.get(`${API_URL}/players/${sofifaId}`);

export const predictScore = (data) =>
  axios.post(`${API_URL}/predict`, data);

export const getRandomQuizPlayer = () => axios.get(`${API_URL}/quiz/random`);

export const getModelInfo = () => axios.get(`${API_URL}/model-info`);