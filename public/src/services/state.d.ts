import { ISiteState } from "./site/reducer";
import { IUserState } from "./user/reducer";
import { IFormState } from "./form/reducer";

export interface IState {
  site: ISiteState,
  user: IUserState,
  form: IFormState,
}
