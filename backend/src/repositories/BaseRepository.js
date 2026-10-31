// Data-access layer ทั่วไป: subclass ส่ง Mongoose model เข้ามา
class BaseRepository {
  constructor(model) {
    if (new.target === BaseRepository) throw new Error('BaseRepository is abstract');
    this.model = model;
  }

  findAll(filter = {}, { sort = { createdAt: -1 }, limit = 0 } = {}) {
    return this.model.find(filter).sort(sort).limit(limit).lean();
  }

  findById(id) {
    return this.model.findById(id).lean();
  }

  async create(data) {
    const doc = await this.model.create(data);
    return doc.toObject();
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id).lean();
  }

  deleteMany(filter = {}) {
    return this.model.deleteMany(filter);
  }

  insertMany(docs) {
    return this.model.insertMany(docs);
  }
}

module.exports = BaseRepository;
