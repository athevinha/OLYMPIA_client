import http from "../http-common";
class VcnvsService {
  getkds() {
    return http.get("/kds");
  }
  getvcnvs() {
    return http.get("/vcnvs");
  }
  gettts() {
    return http.get("/tts");
  }
  getvds() {
    return http.get("/vds");
  }
}
export default new VcnvsService();