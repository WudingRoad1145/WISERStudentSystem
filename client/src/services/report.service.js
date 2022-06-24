import http from "../http-common";

class reportDataService {
  getAll() {
    return http.get("/reports");
  }

  get(id) {
    return http.get(`/reports/${id}`);
  }

  create(data) {
    return http.post("/reports", data);
  }

  update(id, data) {
    return http.put(`/reports/${id}`, data);
  }

  delete(id) {
    return http.delete(`/reports/${id}`);
  }
}

export default new reportDataService();