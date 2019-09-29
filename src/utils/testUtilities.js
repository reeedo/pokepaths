export const validateSelectors = (component, selectors) => {
  selectors.forEach( (selector) => {
    const elt = component.find(selector.selector);
    try {
      expect(elt.length).toBe(selector.count);
    } catch (err) {
      console.log('Error finding selector', selector.selector);
      console.log(component.debug());
      throw err;
    }
  });
};