const { default: mongoose } = require("mongoose")

const ConnectMongoDB =  async(uri) => {
    try {
       await mongoose.connect(uri);
        console.log("Mongo DB connection is successfull !!");  
    } catch (error) {
        console.error("Failed in Mongo DB Connection ", error);
    }
};

module.exports = ConnectMongoDB;