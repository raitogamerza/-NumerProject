const mongoose = require('mongoose');
const HttpError = require('../middleware/HttpError');
const { METHOD_NAMES } = require('../constants/methods');

// Business-logic layer ทั่วไป: ตรวจสอบข้อมูลก่อนส่งต่อให้ repository
class BaseService {
  constructor(repository) {
    if (new.target === BaseService) throw new Error('BaseService is abstract');
    this.repository = repository;
  }

  assertMethod(method, { optional = false } = {}) {
    if (optional && (method === undefined || method === '')) return;
    if (!METHOD_NAMES.includes(method)) {
      throw HttpError.badRequest(`Unknown method "${method}"`);
    }
  }

  assertId(id) {
    if (!mongoose.isValidObjectId(id)) throw HttpError.badRequest('Invalid id');
  }

  assertInput(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      throw HttpError.badRequest('input must be an object');
    }
  }

  async getById(id) {
    this.assertId(id);
    const doc = await this.repository.findById(id);
    if (!doc) throw HttpError.notFound();
    return doc;
  }

  async remove(id) {
    this.assertId(id);
    const doc = await this.repository.deleteById(id);
    if (!doc) throw HttpError.notFound();
    return doc;
  }
}

module.exports = BaseService;
