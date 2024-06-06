//Create DOM element Helper function
//We get the type of element the class name and the content and we create that element
//Then append it as a child to its parent

export const createDOMElement = function (el, className, content, id) {
  const element = document.createElement(el);
  if (className) element.setAttribute("class", className);
  element.textContent = content;
  if (id) element.id = id;

  return element;
};
