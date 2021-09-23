import http from "../http-common";
class VdsService {
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
  getchps() {
    return http.get("/chps");
  }
}
export default new VdsService();