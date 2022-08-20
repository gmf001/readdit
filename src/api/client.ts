import axios from 'axios';

export const redditClient = axios.create({
  baseURL: 'https://reddit.com',
  headers: { 'Content-type': 'application/json' },
  params: { raw_json: 1 }
});
