import Router from 'koa-router';
import Site from '../models/Site';
import SiteService from '../services/SiteService';
import { Db } from 'mongodb';

const createSiteRouter = (db: Db) => {
  const siteCollectionName = Site.name.toLowerCase();
  const siteService = new SiteService(db.collection(siteCollectionName));
  const siteRouter = new Router({ prefix: '/site' });
  
  // used to get the main site document
  siteRouter.get('/main', async (ctx) => {
    try {
      const site = await siteService.getSite();
      ctx.body = site;
      ctx.status = 200;
    } catch (error) {
      ctx.status = 400;
      ctx.body = { success: false, error };
    }
  });
  
  siteRouter.put('/layout', async (ctx) => {
    try {
      const site = await siteService.updateLayout(ctx.request.body as any);
      ctx.body = site;
      ctx.status = 200;
    } catch (error) {
      ctx.status = 400;
      ctx.body = { success: false, error };
    }
  });
  
  return siteRouter;
}

export default createSiteRouter;
  