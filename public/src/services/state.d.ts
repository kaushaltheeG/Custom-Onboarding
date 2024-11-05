import IUser from "./user/model";
import { ISiteState } from "./site/reducer";
import { IUserState } from "./user/reducer";

export interface IState {
  site: ISiteState,
  user: IUserState,
}
