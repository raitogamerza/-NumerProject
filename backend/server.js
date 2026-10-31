require('dotenv').config();
const App = require('./src/App');

const app = new App();

app.start().catch((err) => {
  console.error('❌ Failed to start server:', err.message);
  process.exit(1);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, async () => {
    await app.stop();
    process.exit(0);
  });
}
