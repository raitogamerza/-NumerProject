const BaseController = require('./BaseController');

class ProblemController extends BaseController {
  registerRoutes() {
    this.router.get('/', this.handle((req) => this.service.list(req.query.method)));
    this.router.get('/random', this.handle((req) => this.service.random(req.query.method)));
    this.router.get('/:id', this.handle((req) => this.service.getById(req.params.id)));
    this.router.post('/', this.handle((req) => this.service.create(req.body ?? {}), 201));
    this.router.delete('/:id', this.handle((req) => this.service.remove(req.params.id)));
  }
}

module.exports = ProblemController;
