const express = require('express');
const cors = require('cors');
const Database = require('./config/Database');
const ProblemRepository = require('./repositories/ProblemRepository');
const HistoryRepository = require('./repositories/HistoryRepository');
const ProblemService = require('./services/ProblemService');
const HistoryService = require('./services/HistoryService');
const ProblemController = require('./controllers/ProblemController');
const HistoryController = require('./controllers/HistoryController');
const { METHODS } = require('./constants/methods');

class App {
  constructor({ port = process.env.PORT || 5000, corsOrigin = process.env.CORS_ORIGIN } = {}) {
    this.port = port;
    this.corsOrigins = (corsOrigin || 'http://localhost:5173').split(',').map((s) => s.trim());
    this.database = Database.getInstance();
    this.express = express();

    this.registerMiddleware();
    this.registerRoutes();
    this.registerErrorHandlers();
  }

  registerMiddleware() {
    this.express.use(cors({ origin: this.corsOrigins }));
    this.express.use(express.json({ limit: '1mb' }));
  }

  registerRoutes() {
    // ประกอบ dependency: Controller -> Service -> Repository -> Model
    const problems = new ProblemController(new ProblemService(new ProblemRepository()));
    const history = new HistoryController(new HistoryService(new HistoryRepository()));

    this.express.get('/api/health', (req, res) =>
      res.json({ status: 'ok', database: this.database.isConnected ? 'connected' : 'disconnected' })
    );
    this.express.get('/api/methods', (req, res) => res.json(METHODS));
    this.express.use('/api/problems', problems.router);
    this.express.use('/api/history', history.router);
  }

  registerErrorHandlers() {
    this.express.use((req, res) => res.status(404).json({ message: 'Not found' }));
    // eslint-disable-next-line no-unused-vars
    this.express.use((err, req, res, next) => {
      const status = err.status || (err.name === 'ValidationError' ? 400 : 500);
      if (status >= 500) console.error(err);
      res.status(status).json({ message: status >= 500 ? 'Server Error' : err.message });
    });
  }

  async start() {
    await this.database.connect();
    this.server = this.express.listen(this.port, () =>
      console.log(`🚀 Server running on port ${this.port}`)
    );
    return this.server;
  }

  async stop() {
    if (this.server) await new Promise((resolve) => this.server.close(resolve));
    await this.database.disconnect();
  }
}

module.exports = App;
