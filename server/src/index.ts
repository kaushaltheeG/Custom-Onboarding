import Koa from 'koa';
// import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { connectDB } from './utils/mongodb';
import dotenv from 'dotenv';

dotenv.config()

const app = new Koa();
const PORT = process.env.PORT || 5000;


// Connect to MongoDB
connectDB().then(() => {
  // Middleware
  app.use(bodyParser());

  // Routes
  // add routes

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error while starting the server:', err);
});
