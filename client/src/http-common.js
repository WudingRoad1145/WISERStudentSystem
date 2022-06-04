import axios from "axios";

export default axios.create({
  baseURL: "https://wiser-student-system.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});