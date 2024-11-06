import { IComponent, PAGE_PLACEMENT } from "./model";

export const validateNewSiteLayout = (newLayout: IComponent[]) => {
  const seenMap: {[order: number]: string[]} = {
    0: new Array(1).fill(null),
    2: new Array(2).fill(null),
    3: new Array(2).fill(null),
  };
  let hasOneComponentOnPageTwo = false;
  let hasOneComponentOnPageThree = false;

  for (const component of newLayout) {
    const { type, page, order } = component;
    console.log(`type: ${type}, page: ${page}, order: ${order}`)
    console.log(seenMap)
    // on 0 or none
    if (!page) {
      if (seenMap[page][0]) {
        console.log('hit first false')
        return false;
      }
      seenMap[page][0] = type;
      continue;
    }

    if (seenMap[page] && seenMap[page][order - 1]) {
      console.log(seenMap[page])
      console.log(seenMap[page][order - 1])
        console.log('hit sec false')
      return false;
    }
    seenMap[page][order - 1] = type;
    if (page === PAGE_PLACEMENT.two) {
      hasOneComponentOnPageTwo = true;
    }
    if (page === PAGE_PLACEMENT.three) {
      hasOneComponentOnPageThree = true;
    }
  }
  console.log(`hasOneComponentOnPageTwo: ${hasOneComponentOnPageTwo} hasOneComponentOnPageThree: ${hasOneComponentOnPageThree}`)
  return hasOneComponentOnPageTwo && hasOneComponentOnPageThree;
}
