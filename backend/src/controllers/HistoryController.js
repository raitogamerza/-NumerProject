const BaseController = require('./BaseController');

class HistoryController extends BaseController {
  registerRoutes() {
    this.router.get('/', this.handle((req) => this.service.list(req.query.method, req.query.limit)));
    this.router.post('/', this.handle((req) => this.service.record(req.body ?? {}), 201));
    this.router.delete('/', this.handle((req) => this.service.clear(req.query.method)));
    this.router.delete('/:id', this.handle((req) => this.service.remove(req.params.id)));
  }
}

module.exports = HistoryController;
