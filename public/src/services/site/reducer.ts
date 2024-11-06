import { SET_MAIN_SITE, ISiteActions, SET_SITE_ERROR } from "./actions";
import ISite, { IComponent } from "./model";

export interface ISiteState {
  data: ISite | null;
  admin: IComponent[];
  error: Error | null;
}

const INITIAL_SITE_STATE: ISiteState = {
  data: null,
  admin: [],
  error: null,
};

const siteReducer = (state: ISiteState = INITIAL_SITE_STATE, action: ISiteActions) => {
  switch (action.type) {
    case SET_MAIN_SITE:
      const { site } = action.payload;
      return {
        ...state,
        data: site,
      };
    case SET_SITE_ERROR:
      const { error } = action.payload;
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};
export default siteReducer;
