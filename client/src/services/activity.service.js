import http from "../http-common";

class activityDataService {
  getAll() {
    return http.get("/activity");
  }

  get(id) {
    return http.get(`/activity/${id}`);
  }

  create(data) {
    return http.post("/activity", data);
  }

  update(id, data) {
    return http.put(`/activity/${id}`, data);
  }

  delete(id) {
    return http.delete(`/activity/${id}`);
  }
}

export default new activityDataService();