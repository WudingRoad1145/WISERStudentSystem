import http from "../http-common";

class studentDataService {
  getAll() {
    return http.get("/students");
  }

  get(id) {
    return http.get(`/students/${id}`);
  }

  create(data) {
    return http.post("/students", data);
  }

  update(id, data) {
    return http.put(`/students/${id}`, data);
  }

  delete(id) {
    return http.delete(`/students/${id}`);
  }

  deleteAll() {
    return http.delete(`/students`);
  }

  findByname(name) {
    return http.get(`/students?name=${name}`);
  }
  
  findByGraduationYear(year) {
    return http.get(`/students?graduationYear=${year}`);
  }

  findByStudentClass(student_class) {
    return http.get(`/students?studentClass=${student_class}`);
  }

  findByHouse(house) {
    return http.get(`/students?house=${house}`);
  }

  findBySubject(subject) {
    return http.get(`/students?subject=${subject}`);
  }
}

export default new studentDataService();