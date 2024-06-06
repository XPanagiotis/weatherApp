//Create Image element Helper function
//We get the image src and then we append it as a child to its parent

export const createImage = function (src, className, id) {
  const image = document.createElement("img");
  image.src = src;
  if (className) {
    image.className = className;
  }

  if (id) {
    image.id = id;
  }

  return image;
};
