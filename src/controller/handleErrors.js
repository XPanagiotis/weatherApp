import { createDOMElement } from "../domHealperFunctions/createElement";

export const handleErrors = function (response) {
  if (response.code != 2008 && response.code) {
    let errorText = response.message;
    console.warn(response.message);
    const errorMessage = createDOMElement(
      "div",
      "error-message",
      `${errorText}`
    );
    document.querySelector("main").appendChild(errorMessage);

    setInterval(() => {
      errorMessage.remove();
    }, 3000);
  } else {
    document.getElementById("error-page").style.display = "flex";
  }
};
