const BaseRepository = require('./BaseRepository');
const History = require('../models/History');

class HistoryRepository extends BaseRepository {
  constructor() {
    super(History);
  }

  findRecent(method, limit) {
    const filter = method ? { method } : {};
    return this.findAll(filter, { sort: { createdAt: -1 }, limit });
  }
}

module.exports = HistoryRepository;
