const app = require('./app');

app.listen(process.env.PORT, (req, res) => {
    console.log("Server is running successfully");
})