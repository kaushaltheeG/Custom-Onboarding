import assert from "assert";
import ISite, { isValidSiteLayout } from "../interfaces/models/ISite";
import Base from "./base";


const AVAILABLE_SITE_COMPONENTS = 3;

class Site extends Base<ISite> {
  private _name!: ISite['name'];
  private _layout!: ISite['layout'];

  constructor(dto: ISite) {
    super(dto);
    const { name, layout } = dto;
    this._name = name;
    this._layout = layout;
  }

  get name() {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get layout() {
    return this._layout;
  }

  set layout(value: ISite['layout']) {
    assert(isValidSiteLayout(value, AVAILABLE_SITE_COMPONENTS), 'invalid site layout data');
    this._layout = value;
  } 
};

export default Site;