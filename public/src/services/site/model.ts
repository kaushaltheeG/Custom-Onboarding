type ObjectValues<T> = T[keyof T];
export const COMPONENT_TYPE = {
  aboutMe: 'aboutMe',
  address: 'address',
  birthday: 'birthday',
} as const;
export type ComponentType = ObjectValues<typeof COMPONENT_TYPE>;

export const PAGE_PLACEMENT = {
  two: 2,
  three: 3,
  none: 0,
} as const;
export type PagePlacementType = ObjectValues<typeof PAGE_PLACEMENT>;

export interface IComponent {
  type: ComponentType;
  page: PagePlacementType;
  order: number;
}

interface ISite {
  _id: string,
  created: number,
  name: string;
  layout: IComponent[];
}
export default ISite;