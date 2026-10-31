const BaseService = require('./BaseService');

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

class HistoryService extends BaseService {
  list(method, limit) {
    this.assertMethod(method, { optional: true });
    const n = Math.min(MAX_LIMIT, Math.max(1, Number(limit) || DEFAULT_LIMIT));
    return this.repository.findRecent(method, n);
  }

  record({ method, input, output = null }) {
    this.assertMethod(method);
    this.assertInput(input);
    return this.repository.create({ method, input, output });
  }

  async clear(method) {
    this.assertMethod(method, { optional: true });
    const { deletedCount } = await this.repository.deleteMany(method ? { method } : {});
    return { deletedCount };
  }
}

module.exports = HistoryService;
