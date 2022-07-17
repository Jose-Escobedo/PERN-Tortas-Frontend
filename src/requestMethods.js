import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2ZiZDYyMWNjYjE1NGIwYzBjZGY0ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1ODAzNzY5MiwiZXhwIjoxNjU4MTI0MDkyfQ.B4iQZmiQN2ljC8Xye_Vzw2W6-SVBowR0_LYi6ZCnBm0";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
