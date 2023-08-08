const mongoose = require('mongoose');

const DB_URI = process.env.MONGO_URI;

const connectDB = async (url) => {
try {
  if(!DB_URI) {
    throw new Error('No Database addres')
  }

  const x = await mongoose.connect(DB_URI);
  const dbName = x.connections[0].name;
  console.log(`Connecting in to database: ${dbName}`);
  
} catch (error) {
  console.log('Fail to connect into database')
  process.exit();
}};

connectDB();
