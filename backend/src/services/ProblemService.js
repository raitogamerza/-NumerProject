const BaseService = require('./BaseService');
const HttpError = require('../middleware/HttpError');

class ProblemService extends BaseService {
  list(method) {
    this.assertMethod(method, { optional: true });
    return this.repository.findByMethod(method);
  }

  async random(method) {
    this.assertMethod(method, { optional: true });
    const doc = await this.repository.findRandom(method);
    if (!doc) throw HttpError.notFound(`No problems found${method ? ` for method ${method}` : ''}`);
    return doc;
  }

  create({ method, title = '', input }) {
    this.assertMethod(method);
    this.assertInput(input);
    return this.repository.create({ method, title, input });
  }
}

module.exports = ProblemService;
