import http from "../http-common";
class UsersService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/games/${id}`);
  }

  create(data) {
    return http.post("/users/create", data);
  }
  update(id, data) {
    return http.put(`/users/update/${id}`, data);
  }
  delete(id) {
    return http.delete(`/games/delete/${id}`);
  }
}
export default new UsersService();