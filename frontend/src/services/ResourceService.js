// คลาสแม่ของ service ที่คุยกับ REST resource หนึ่งตัว (เช่น /api/problems)
export default class ResourceService {
  constructor(client, basePath) {
    if (new.target === ResourceService) throw new Error("ResourceService เป็น abstract class");
    this.client = client;
    this.basePath = basePath;
  }

  list(params) {
    return this.client.get(this.basePath, params);
  }

  get(id) {
    return this.client.get(`${this.basePath}/${id}`);
  }

  create(data) {
    return this.client.post(this.basePath, data);
  }

  remove(id) {
    return this.client.delete(`${this.basePath}/${id}`);
  }
}
