const mongoose = require('mongoose')
require('dotenv').config();



async function connectDb() {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connexion Parfait!!!");
}

module.exports = { 
    connectDb
}