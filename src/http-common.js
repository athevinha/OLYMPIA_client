import axios from "axios";
// const { SERVER_BUILD_URL, SERVER_LOCAL_URL } = process.env;
export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? ""
      : "http://localhost:7878",
});