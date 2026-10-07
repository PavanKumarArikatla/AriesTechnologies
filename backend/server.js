const app = require('./src/app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();


const PORT = process.env.PORT || 4000;



mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});