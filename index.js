export const mockHtmlFromCss = (css) => {
  if (!css) throw new Error("No CSS provided");
  const parentDiv = document.createElement("div");
  let elementToAppend = parentDiv;
  // Split the string into the different lines
  const splitedCss = css.replace(/[<>^]/g, "").split(/\s+/);

  // Filter out empty strings
  const selectorsToMock = splitedCss.filter((str) => str !== "");

  // eslint-disable-next-line no-restricted-syntax
  for (const selector of selectorsToMock) {
    // Deletes :not() selectors
    const cleanedSelector = selector.replace(/:not\([^)]*\)/g, "");
    // Regular expression to match classes, IDs, and attributes
    const classIdAttributeRegex =
      /(?:\.([\w-]+))|(?:#([\w-]+))|\[([\w-]+)=(["'])(.*?)\4\]/g;

    // Match classes, IDs, and attributes in the input string
    let match;
    const classes = [];
    let id;
    const attributes = {};

    do {
      match = classIdAttributeRegex.exec(cleanedSelector);
      if (!match) break;
      const [, classMatch, idMatch, attributeKey, , attributeValue] = match;

      if (classMatch) {
        classes.push(classMatch);
      } else if (idMatch) {
        id = idMatch;
      } else if (attributeKey && attributeValue) {
        attributes[attributeKey] = attributeValue;
      }
    } while (match !== null);

    // Create the HTML element (default to <div>)
    const detectElementRegex = /^[^.[\]#]+/;
    const elementMatch = (detectElementRegex.exec(selector) ?? ["div"])[0];
    const element = document.createElement(elementMatch);

    // Add classes if any
    if (classes.length > 0) element.classList.add(...classes);

    // Add id if present
    if (id) element.id = id;

    // Add attributes if any
    Object.keys(attributes).forEach((attr) => {
      element.setAttribute(attr, attributes[attr]);
    });
    // Return the created element
    elementToAppend.appendChild(element);
    elementToAppend = element;
  }
  return parentDiv;
};
