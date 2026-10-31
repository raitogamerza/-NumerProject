import ResourceService from "./ResourceService";

// ประวัติการคำนวณที่บันทึกในฐานข้อมูล
export default class HistoryService extends ResourceService {
  constructor(client) {
    super(client, "/api/history");
  }

  recent(method, limit = 10) {
    return this.list({ method, limit });
  }

  record(method, input, output) {
    return this.create({ method, input, output });
  }

  clear(method) {
    return this.client.delete(this.basePath, { method });
  }
}
