import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2ZiZDYyMWNjYjE1NGIwYzBjZGY0ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Nzk0NjE1MCwiZXhwIjoxNjU4MDMyNTUwfQ.XnCTmcv3fDZqkVmyx0fpWLBtvI1SBcl2cKMyQzqBdYU";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
