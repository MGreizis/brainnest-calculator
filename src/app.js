// import * as operations from "./operations";
// This import here won't work if running the site by opening the file directly, it needs a live server

let currentOperand = "";
let previousOperand = "";
let currentOperator = ""
let displayValue = ''

function changeDisplayValue(newValue, replace = false) {
  // if (replace) {
  //   displayValue = newValue;
  // } else {
  //   displayValue += newValue;
  // }
  replace ? displayValue = newValue : displayValue += newValue;
  let displayNode = document.querySelector(".screen");
  displayNode.textContent = displayValue;
}

function onNumberSelect(number) {
  changeDisplayValue(number);
}

function onOperatorSelect(operator) {
  currentOperator = operator
}

function onClear() {
  currentOperand = "";
  previousOperand = "";
  currentOperator = "";
  // replace display value with empty string
  changeDisplayValue("", true);
}

function onDelete() {
  if (displayValue.length > 0) {
    // turn string into array
    const arrayDisplayValue = displayValue.split("")
    // remove the last element and turn it into a string again
    displayValue = arrayDisplayValue.slice(0, arrayDisplayValue.length - 1).join("");
    // force displayValue on screen to be replaced
    changeDisplayValue(displayValue, true);
  }
  
}

/* does something like this work??
function onEqual() {
  // operate function imported from operations
  const { firstOperand, displayValue, operator } = 'calculator'
  const inputValue = parseFloat(displayValue);

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }
}
*/


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
  const deleteButton = document.querySelector('#delete')
  deleteButton?.addEventListener("click", () => {
    onDelete();
  })
}

handleEventListeners();