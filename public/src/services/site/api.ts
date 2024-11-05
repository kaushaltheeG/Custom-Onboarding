import ISite from "./model";
import axios from 'axios';

export const getMainSite = async (): Promise<ISite | null> => {
  const { data } = await axios.get(`api/site/main`);
  return data;
}

export const updateSiteLayout = async (newLayout: ISite['layout']): Promise<ISite | null> => {
  const { data } = await axios.put(`api/site/layout`, newLayout);
  return data
};
