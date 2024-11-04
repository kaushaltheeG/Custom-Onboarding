import IModel from "./IModel";


type ObjectValues<T> = T[keyof T];
export const COMPONENT_TYPE = {
  aboutMe: 'aboutMe',
  address: 'address',
  birthday: 'birthday',
} as const;
export type ComponentType = ObjectValues<typeof COMPONENT_TYPE>;

export const PAGE_PLACEMENT = {
  two: 'two',
  three: 'three',
  none: 'none',
} as const;
export type PagePlacementType = ObjectValues<typeof PAGE_PLACEMENT>;

export interface IComponent {
  type: ComponentType,
  page: PagePlacementType,
  order: number,
}

interface ISite extends IModel {
  name: string,
  layout: IComponent[],
}
export default ISite;

const isValidComponentType = (value: any): boolean => {
  return Object.values(COMPONENT_TYPE).includes(value);
}

const isValidPagePlacementType = (value: any): boolean => {
  return Object.values(PAGE_PLACEMENT).includes(value);
}

const createPlacementKey = (page: PagePlacementType, order: number) => (`${page}-${order}`);
export const isValidSiteLayout = (componentArray: any[], expectedCount: number): boolean => {
  if (componentArray.length !== expectedCount) {
    return false;
  }
  const seenComponentSet = new Set();
  const seenPlacementSet = new Set();

  for (const component of componentArray) {
    const rootCheck = (
      'type' in component &&
      'page' in component &&
      'order' in component
    );
    if (!rootCheck) {
      return rootCheck;
    }

    if (!isValidComponentType(component.type)) {
      return false;
    }

    if (!isValidPagePlacementType(component.page)) {
      return false;
    }

    if (seenComponentSet.has(component.type)) {
      return false;
    }

    // check if order is inclusively between 0 & 3
    if (!(0 <= component.order && component <= 3)) {
      return false;
    }

    const placementKey = createPlacementKey(component.page, component.order);
    if (seenPlacementSet.has(placementKey)) {
      return false;
    }

    seenComponentSet.add(component.type);
    seenPlacementSet.add(placementKey);
  }
  return true;
}
