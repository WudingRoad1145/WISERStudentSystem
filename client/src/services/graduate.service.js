import http from "../http-common";

class graduateDataService {
  getAll() {
    return http.get("/graduate");
  }

  get(id) {
    return http.get(`/graduate/${id}`);
  }

  create(data) {
    return http.post("/graduate", data);
  }

  update(id, data) {
    return http.put(`/graduate/${id}`, data);
  }

  delete(id) {
    return http.delete(`/graduate/${id}`);
  }
}

export default new graduateDataService();