import { IState } from "../state";

export const getSite = (state: IState) => state.site.data;

export const getAdminLayoutChanges = (state: IState) => state.site.admin;
