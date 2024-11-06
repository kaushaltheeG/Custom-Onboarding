import { IState } from "../state";
import ISite, { IComponent } from "./model";

export const getSite = (state: IState) => state.site.data;

export const getCurrentPageMap = (state: IState) => {
  const layout: ISite['layout'] | undefined = state.site.data?.layout;
  if (!layout) {
    return {};
  }
  const pageMap: { [page: number]: string[]} = {
    0: [],
    1: ['email', 'password', 'firstName', 'lastName'],
    2: [],
    3: [],
  };
  for (const component of layout) {
    const { page, type } = component as IComponent;
    if (pageMap[page]) {
      pageMap[page].push(type);
    }
  }
  return pageMap;
}

export const getAdminLayoutChanges = (state: IState) => state.site.admin;
