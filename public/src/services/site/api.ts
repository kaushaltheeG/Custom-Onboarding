import { API_URL } from "../utils";
import ISite from "./model";
import axios from 'axios';

export const getMainSite = async (): Promise<ISite | null> => {
  console.log(`API_URL: ${API_URL}`)
  const { data } = await axios.get(`${API_URL}/api/site/main`);
  return data;
}

export const updateSiteLayout = async (newLayout: ISite['layout']): Promise<ISite | null> => {
  const { data } = await axios.put(`${API_URL}/api/site/layout`, newLayout);
  return data
};
