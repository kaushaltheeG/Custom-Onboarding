import { IState } from "../state";
import ISite, { IComponent } from "./model";

export const getSite = (state: IState) => state.site.data;

export const getCurrentPageMap = (state: IState) => {
  const layout: ISite['layout'] | undefined = state.site.data?.layout;
  if (!layout) {
    return {};
  }
  const pageMap: { [page: number]: string[]} = {
    0: new Array(1).fill(null),
    1: ['email', 'password', 'firstName', 'lastName'],
    2: new Array(2).fill(null),
    3: new Array(2).fill(null),
  };
  for (const component of layout) {
    const { page, type, order } = component as IComponent;
    if (pageMap[page]) {
      pageMap[page][order - 1] = type;
    }
  }
  return pageMap;
}

export const getAdminLayoutChanges = (state: IState) => state.site.admin;
