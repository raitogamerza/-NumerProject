const express = require('express');

// แต่ละ controller สร้าง router ของตัวเอง; handle() ห่อ async handler ให้ส่ง error ไปที่ error middleware
class BaseController {
  constructor(service) {
    if (new.target === BaseController) throw new Error('BaseController is abstract');
    this.service = service;
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    throw new Error(`${this.constructor.name} must implement registerRoutes()`);
  }

  handle(fn, status = 200) {
    return async (req, res, next) => {
      try {
        res.status(status).json(await fn(req, res));
      } catch (err) {
        next(err);
      }
    };
  }
}

module.exports = BaseController;
