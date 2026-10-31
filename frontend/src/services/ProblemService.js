import ResourceService from "./ResourceService";

// โจทย์ตัวอย่างที่เก็บในฐานข้อมูล
export default class ProblemService extends ResourceService {
  constructor(client) {
    super(client, "/api/problems");
  }

  listByMethod(method) {
    return this.list(method ? { method } : undefined);
  }

  random(method) {
    return this.client.get(`${this.basePath}/random`, { method });
  }

  save(method, input, title = "") {
    return this.create({ method, input, title });
  }
}
