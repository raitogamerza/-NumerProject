const mongoose = require('mongoose');

// Singleton: ทั้งแอปใช้ connection เดียวกัน
class Database {
  static #instance = null;

  static getInstance() {
    if (!Database.#instance) Database.#instance = new Database(process.env.MONGODB_URI);
    return Database.#instance;
  }

  constructor(uri) {
    this.uri = uri;
  }

  get isConnected() {
    return mongoose.connection.readyState === 1;
  }

  async connect() {
    if (this.isConnected) return;
    if (!this.uri) throw new Error('MONGODB_URI is not set');
    await mongoose.connect(this.uri);
    console.log('✅ MongoDB connected');
  }

  async disconnect() {
    if (!this.isConnected) return;
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

module.exports = Database;
