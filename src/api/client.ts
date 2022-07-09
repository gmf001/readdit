import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/reddit",
  headers: {
    "Content-type": "application/json"
  }
});

export const redditClient = axios.create({
  baseURL: "https://reddit.com",
  headers: {
    "Content-type": "application/json"
  },
  params: { raw_json: 1 }
});
