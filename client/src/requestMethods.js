import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
    .accessToken || "";
// const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGNjOWE4NmRlNjEwMjFhNzFkNjZiOCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjk4NjExNzIsImV4cCI6MTczMDEyMDM3Mn0.WwrT-m8pniLzPapsecwwGBdKZIYDD6pq3XU68cYh3yU";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
