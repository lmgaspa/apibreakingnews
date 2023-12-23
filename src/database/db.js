const mongoose = require('mongoose');

const connectDatabase = () => {
    console.log('wait connecting to the database')
    console.log(process.env)

    mongoose.connect(process.env.MONGODB_URI, {

    }
    )
        .then(() => console.log('MongoDB Atlas Connected')).catch((error) => console.log(error))
};

module.exports = connectDatabase;