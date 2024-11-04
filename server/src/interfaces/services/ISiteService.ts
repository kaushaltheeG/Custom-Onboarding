import ISite, { IComponent } from "../models/ISite";

interface ISiteService {
  getSite(): Promise<ISite | null>;
  updateLayout(layoutData: IComponent[]): Promise<ISite | null>;
}
export default ISiteService;
