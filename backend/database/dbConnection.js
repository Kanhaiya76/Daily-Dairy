const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "Memoir"
    });
    console.log(`MongoDB Connected`);

  } catch (error) {
    console.error(error, "Mongodb");
    process.exit(1);
  }
};

module.exports = connectDB;
