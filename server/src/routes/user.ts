import Router from 'koa-router';
import UserService from '../services/UserService';
import User from '../models/user';
import { Db } from 'mongodb';

const createUserRouter = (db: Db) => {
  const userCollectionName = User.name.toLowerCase();
  const userService = new UserService(db.collection(userCollectionName));
  const userRouter = new Router({ prefix: '/user' });
  
  userRouter.get('/all', async (ctx: any) => {
    try {
      const users = await userService.getUsers();
      ctx.body = users;
      ctx.status = 200;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, error: error.message };
    }
  });
  
  userRouter.post('/validate', async (ctx: any) => {
    try {
      const { email, password } = ctx.request.body;
      if (!email || typeof email !== 'string') {
        ctx.throw(400, 'email is required for request and must be a string');
      }
      if (!password || typeof password !== 'string') {
        ctx.throw(400, 'password is required for request and must be a string');
      }

      const passwordHash = await userService.createPasswordHash(password);
      const user = await userService.getUser(email, passwordHash);
      if (!user) {
        ctx.body = null;
        ctx.status = 204;
        return;
      }
      ctx.body = user;
      ctx.status = 200;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, error: error.message };
    }
  });
  
  userRouter.post('/new', async (ctx: any) => {
    try {
      const newUser = await userService.insertUser(ctx.request.body);
      ctx.body = newUser;
      ctx.status = 200;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, error: error.message };
    }
  });
  
  return userRouter;
}
  
export default createUserRouter;
