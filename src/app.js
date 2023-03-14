// import * as operations from "./operations";
// This import here won't work if running the site by opening the file directly, it needs a live server

let displayValue = 0;

function changeDisplayValue(newValue) {
  displayValue = newValue;
  console.log(displayValue)
  // code for updating the screen with new value
}

function onNumberSelect(number) {
  changeDisplayValue(number);
}

function onOperatorSelect(operator) {}

function onClear() {}

function undo() {}

function onEqual() {
  // operate function imported from operations
}

function handleEventListeners() {
  const numberButtons = document.querySelectorAll('.number');
  numberButtons.forEach(element => {
    element.addEventListener("click", () => {
      // The text written on the button, which will be the number itself
      onNumberSelect(element.childNodes[0].nodeValue);
    });
  });
  const operatorButtons = document.querySelectorAll('.operator');
  operatorButtons.forEach(element => {
    element.addEventListener("click", () => {
      // The text written on the button, which will be the operator itself
      // A string contained +, -, * or /
      onOperatorSelect(element.childNodes[0].nodeValue);
    });
  });
  const equalButton = document.querySelector('.equal');
  equalButton.addEventListener("click", () => {
    onEqual();
  });
  const clearButton = document.querySelector('.clear')
  clearButton.addEventListener("click", () => {
    onClear();
  });
  const undoButton = document.querySelector('.undo')
  undoButton?.addEventListener("click", () => {
    undo();
  })
}

handleEventListeners();