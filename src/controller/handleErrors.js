import { createDOMElement } from "../domHealperFunctions/createElement";

export const handleErrors = function (err) {
  if (err.code != 2008 && err.message) {
    //get the error and create an error message
    let errorText = err.message;
    console.warn(err.message);
    const errorMessage = createDOMElement(
      "div",
      "error-message",
      `${errorText}`
    );
    document.querySelector("main").appendChild(errorMessage);

    //show the error message
    setInterval(() => {
      errorMessage.remove();
    }, 3000);
  } else {
    document.getElementById("error-page").style.display = "flex";
  }
};
