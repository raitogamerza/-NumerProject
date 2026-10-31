class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }

  static badRequest(message) {
    return new HttpError(400, message);
  }

  static notFound(message = 'Not found') {
    return new HttpError(404, message);
  }
}

module.exports = HttpError;
