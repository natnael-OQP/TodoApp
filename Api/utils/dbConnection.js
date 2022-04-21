const mongoose = require('mongoose')

async function dbConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('mongodb connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnection
