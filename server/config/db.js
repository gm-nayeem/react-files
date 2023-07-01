const mongoose = require('mongoose');


mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }
)
.then(() => console.log("MongoDB connection successful"))
.catch(err => console.log(err));