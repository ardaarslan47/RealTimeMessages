const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://ardaarslan:${process.env.MONGO_PASSWORD}@cluster0.uusk2j2.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  }
};

module.exports = connectDb;
