import axios from "axios";

const BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:5000";

// ห่อ axios: คืน data ตรง ๆ และแปลง error จาก backend เป็น Error ที่มีข้อความอ่านได้
export default class ApiClient {
  constructor(baseURL = BASE_URL) {
    this.http = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    });
  }

  async request(config) {
    try {
      const res = await this.http.request(config);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Request failed";
      throw new Error(message);
    }
  }

  get(url, params) {
    return this.request({ method: "get", url, params });
  }

  post(url, data) {
    return this.request({ method: "post", url, data });
  }

  delete(url, params) {
    return this.request({ method: "delete", url, params });
  }
}
