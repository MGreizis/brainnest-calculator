// import * as operations from "./operations";
// This import here won't work if running the site by opening the file directly, it needs a live server

let currentOperand = "0";
let previousOperand = "0";
let currentOperator = ""
let displayValue = ''

function changeDisplayValue(newValue, replace = false) {
  // if (replace) {
  //   displayValue = newValue;
  // } else {
  //   displayValue += newValue;
  // }
  replace ? displayValue = newValue : displayValue += newValue;
  let displayNode = document.querySelector(".screen")
  displayNode.textContent = displayValue;
}

function onNumberSelect(number) {
  changeDisplayValue(number);
}

function onOperatorSelect(operator) {
  currentOperator = operator
}

function onClear() {}

function onDelete() {}

function onEqual() {
  // operate function imported from operations
}

function handleEventListeners() {
  const numberButtons = document.querySelectorAll('.number');
  numberButtons.forEach(element => {
    element.addEventListener("click", () => {
      // The text written on the button, which will be the number itself
      onNumberSelect(element.textContent);
    });
  });
  const operatorButtons = document.querySelectorAll('.operator');
  operatorButtons.forEach(element => {
    element.addEventListener("click", () => {
      // The text written on the button, which will be the operator itself
      // A string contained +, -, * or /
      onOperatorSelect(element.textContent);
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
    onDelete();
  })
}

handleEventListeners();