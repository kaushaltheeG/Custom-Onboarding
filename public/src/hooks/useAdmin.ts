import React, { ChangeEvent } from "react";
import ISite, { ComponentType, IComponent, PagePlacementType } from "../services/site/model";

const useAdmin = (site: ISite | null) => {
  const [components, setComponents] = React.useState<IComponent[]>([]);

  React.useEffect(() => {
    if (!site) {
      return;
    }
    // Initialize components based on the site's layout
    const initialComponents: IComponent[] = site.layout.map((layoutComponent) => ({
      type: layoutComponent.type,
      page: layoutComponent.page,
      order: layoutComponent.order,
    }));

    setComponents(initialComponents);
  }, [site]);

  const updatePage = (componentType: ComponentType, e: ChangeEvent<HTMLSelectElement>) => {
    const newPage = dropdownToIntMap[e.target.value] as PagePlacementType;

    // Check constraints
    if (newPage === 0 && components.filter(c => c.page === 0).length >= 1) {
      // Prevent moving another component to page 0 if it's already occupied
      return;
    }
    if (components.filter(c => c.page === newPage).length >= 2) {
      // Prevent moving another component to the page if it already has 2 components
      return;
    }
  
    setComponents((prevComponents: IComponent[]) =>
      prevComponents.map((component: IComponent) =>
        component.type === componentType 
          ? { ...component, page: newPage } 
          : component
      )
    );
  };

  const updateOrder = (componentType: ComponentType, e: ChangeEvent<HTMLSelectElement>) => {
    const newOrder = dropdownToIntMap[e.target.value];
    setComponents(prevComponents =>
      prevComponents.map(component =>
        component.type === componentType 
          ? { ...component, order: newOrder } 
          : component
      )
    );
  };

  const typeToLabel = {
    'aboutMe': 'About Me',
    'address': 'Address',
    'birthday': 'Birthday',
  };

  const dropdownToIntMap: { [key: string]: number } = {
    'Hide': 0,
    'One': 1,
    'Two': 2,
    'Three': 3,
  };

  const intTodropdownValueMap: { [key: number]: string } = {
    0: 'Hide',
    1: 'One',
    2: 'Two',
    3: 'Three',
  };

  return { components, updatePage, updateOrder, typeToLabel, intTodropdownValueMap};
};
export default useAdmin;
