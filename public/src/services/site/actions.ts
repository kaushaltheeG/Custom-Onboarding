import ISite from "./model";

export const SET_MAIN_SITE = 'site/SET_MAIN_SITE';
export const FETCH_MAIN_SITE = 'site/FETCH_MAIN_SITE';
export const UPDATE_LAYOUT = 'site/UPDATE_LAYOUT';

export interface IGetMainSiteAction {
  payload: { site: ISite | null };
  type: typeof SET_MAIN_SITE;
}

export interface IUpdateLayoutAction {
  payload: { layout: ISite['layout'] };
  type: typeof UPDATE_LAYOUT;
}

export interface IFetchMainSite {
  type: typeof FETCH_MAIN_SITE;
}

export type ISiteActions = (
  IGetMainSiteAction |
  IUpdateLayoutAction |
  IFetchMainSite
);

export const setMainSite = (site: ISite | null): IGetMainSiteAction => {
  return {
    payload: { site },
    type: SET_MAIN_SITE,
  };
};

export const updateSiteLayout = (layout: ISite['layout']): IUpdateLayoutAction => {
  return {
    payload: { layout },
    type: UPDATE_LAYOUT,
  };
};

export const fetchMainSite = (): IFetchMainSite => {
  return {
    type: FETCH_MAIN_SITE,
  };
};

