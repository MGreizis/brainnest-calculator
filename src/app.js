// import * as operations from "./operations";
// This import here won't work if running the site by opening the file directly, it needs a live server

let displayValue = 0;

function changeDisplayValue(newValue) {
  displayValue = newValue;
  // code for updating the screen with new value
}

function onNumberSelect(number) {
  changeDisplayValue(number);
}

function handleEventListeners() {
  let numberButtons = document.querySelectorAll('.number');
  numberButtons.forEach(element => {
    element.addEventListener("click", (e) => {
      // The text written on the button, which will be the number itself
      onNumberSelect(element.childNodes[0].nodeValue);
    });
  });
}

handleEventListeners();