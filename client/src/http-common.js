import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  //"https://wiser-student-system.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});