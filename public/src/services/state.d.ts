import { ISiteState } from "./site/reducer";
import { IUserState } from "./user/reducer";
import { IFormState } from "./form/reducer";
import { IModalState } from "./modal/reducer";

export interface IState {
  form: IFormState,
  modal: IModalState,
  site: ISiteState,
  user: IUserState,
}
