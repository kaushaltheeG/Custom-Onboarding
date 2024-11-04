import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { connectDB } from './utils/mongodb';
import dotenv from 'dotenv';
import createSiteRouter from './routes/site';
import createUserRouter from './routes/user';

dotenv.config()

const app = new Koa();
const PORT = process.env.PORT || 5000;


// Connect to MongoDB
connectDB().then((db) => {
  // Middleware
  app.use(bodyParser());

  // Routes
  const siteRoutes = createSiteRouter(db).prefix('/api');
  const userRoutes = createUserRouter(db).prefix('/api');
  app.use(siteRoutes.routes()).use(siteRoutes.allowedMethods());
  app.use(userRoutes.routes()).use(userRoutes.allowedMethods());

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error while starting the server:', err);
});
