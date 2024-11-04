import Router from 'koa-router';
import UserService from '../services/UserService';
import User from '../models/User';
import { Db } from 'mongodb';

const createUserRouter = (db: Db) => {
  const userCollectionName = User.name.toLowerCase();
  const userService = new UserService(db.collection(userCollectionName));
  const userRouter = new Router({ prefix: '/user' });
  
  userRouter.get('/all', async (ctx) => {
    try {
      const users = await userService.getUsers();
      ctx.body = users;
      ctx.status = 200;
    } catch (error) {
      ctx.status = 400;
      ctx.message = error;
    }
  });
  
  userRouter.post('/validate', async (ctx) => {
    try {
      const { email, password } = ctx.body;
      const passwordHash = await userService.createPassowrdHash(password);
      const user = await userService.getUser(email, passwordHash);
      ctx.body = user;
      ctx.status = 200;
    } catch (error) {
      ctx.status = 400;
      ctx.message = error;
    }
  });
  
  userRouter.post('/new', async (ctx) => {
    try {
      const newUser = await userService.insertUser(ctx.body);
      ctx.body = newUser;
      ctx.body = 200;
    } catch (error) {
      ctx.status = 400;
      ctx.message = error;
    }
  });
  
  return userRouter;
}
  
export default createUserRouter;
