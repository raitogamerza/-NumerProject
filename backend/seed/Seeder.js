require('dotenv').config();
const Database = require('../src/config/Database');
const ProblemRepository = require('../src/repositories/ProblemRepository');
const problems = require('./data');

class Seeder {
  constructor(database, repository, data) {
    this.database = database;
    this.repository = repository;
    this.data = data;
  }

  async run() {
    await this.database.connect();
    try {
      await this.repository.model.syncIndexes();
      await this.repository.deleteMany({});
      console.log('Existing problem data cleared.');
      await this.repository.insertMany(this.data);
      console.log(`✅ Inserted ${this.data.length} problems`);
    } finally {
      await this.database.disconnect();
    }
  }
}

new Seeder(Database.getInstance(), new ProblemRepository(), problems)
  .run()
  .catch((err) => {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  });
