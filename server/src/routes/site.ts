import Router from 'koa-router';
import Site from '../models/Site';
import SiteService from '../services/SiteService';
import { Db } from 'mongodb';
import { Context } from 'koa';

const createSiteRouter = (db: Db) => {
  const siteCollectionName = Site.name.toLowerCase();
  const siteService = new SiteService(db.collection(siteCollectionName));
  const siteRouter = new Router({ prefix: '/site' });
  
  // used to get the main site document
  siteRouter.get('/main', async (ctx: Context) => {
    try {
      const site = await siteService.getSite();
      ctx.body = site;
      ctx.status = 200;
    } catch (error) {
      ctx.status = 400;
      ctx.body = { success: false, error: error.message };
    }
  });
  
  siteRouter.put('/layout', async (ctx: Context) => {
    try {
      const site = await siteService.updateLayout(ctx.request.body as any);
      ctx.body = site;
      ctx.status = 200;
    } catch (error) {
      ctx.status = 400;
      ctx.body = { success: false, error: error.message };
    }
  });
  
  return siteRouter;
}

export default createSiteRouter;
  