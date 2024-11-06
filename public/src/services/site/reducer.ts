import { SET_MAIN_SITE, ISiteActions } from "./actions";
import ISite, { IComponent } from "./model";

export interface ISiteState {
  data: ISite | null,
  admin: IComponent[],
}

const INITIAL_SITE_STATE: ISiteState = {
  data: null,
  admin: [],
};

const siteReducer = (state: ISiteState = INITIAL_SITE_STATE, action: ISiteActions) => {
  switch (action.type) {
    case SET_MAIN_SITE:
      const { site } = action.payload;
      return {
        ...state,
        data: site,
      };
    default:
      return state;
  }
};
export default siteReducer;
