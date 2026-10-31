const BaseRepository = require('./BaseRepository');
const Problem = require('../models/Problem');

class ProblemRepository extends BaseRepository {
  constructor() {
    super(Problem);
  }

  findByMethod(method) {
    const filter = method ? { method } : {};
    return this.findAll(filter, { sort: { method: 1, createdAt: 1 } });
  }

  async findRandom(method) {
    const match = method ? { method } : {};
    const [doc] = await this.model.aggregate([{ $match: match }, { $sample: { size: 1 } }]);
    return doc ?? null;
  }
}

module.exports = ProblemRepository;
