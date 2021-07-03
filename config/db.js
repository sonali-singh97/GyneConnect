const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Database connected host ${con.connection.host}`);
  } catch (error) {
    console.log(
      `Database not connected Error: ${error.message}`
    );
    process.exit(1);
  }
};

module.exports = connectdb;