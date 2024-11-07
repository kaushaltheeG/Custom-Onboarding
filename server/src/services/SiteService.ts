import { Collection } from "mongodb";
import Site from "../models/site";
import ISiteService from "../interfaces/services/ISiteService";
import ISite, { IComponent } from "../interfaces/models/ISite";
import assert from "assert";

// only one site document will exist
const SITE_NAME = 'main';

class SiteService implements ISiteService {
  private _siteCollection!: Collection<Site>;

  constructor(siteCollection: Collection<Site>) {
    this._siteCollection = siteCollection;
  }

  async getSite(): Promise<ISite | null> {
    try {
      const site = await this._siteCollection.findOne({ name: SITE_NAME });
      if (!site) {
        return null;
      }
      return new Site(site).toDTO();
    } catch (error) {
      if (error instanceof assert.AssertionError) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  }

  async updateLayout(layoutData: IComponent[]): Promise<ISite | null> {
    try {
      const site = await this.getSite();
      if (!site) {
        return null;
      }

      site.layout = layoutData;

      // validates the site's new layout
      const updatedSite = new Site(site);
      await this._siteCollection.updateOne(
        { name: SITE_NAME },
        {
          $set : {
            layout: updatedSite.layout,
          },
        },
      );
      return await this.getSite();
    } catch (error) {
      if (error instanceof assert.AssertionError) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  }
}
export default SiteService;
