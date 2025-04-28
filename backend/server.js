const app = require('./app')

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is runnning on http://localhost:${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.error(err);
    server.close(() => {
        process.exit(1);
    });
});