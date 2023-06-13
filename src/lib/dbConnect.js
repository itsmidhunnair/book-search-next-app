const mongoose = require("mongoose");

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URL);
};

export default dbConnect;
