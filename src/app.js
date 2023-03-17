let firstOperand = "";
let secondOperand = "";
let operator = "";
let displayValue = "";

function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  return num1 / num2;
}
function operate(num1, num2, operator) {
  if (operator === "+") {
    return num1 + num2;
  } else if (operator === "-") {
    return num1 - num2;
  } else if (operator === "*") {
    return num1 * num2;
  } else if (operator === "/") {
    return num1 / num2;
  }
}

function changeDisplayValue(newValue, replace = false) {
  // if (replace) {
  //   displayValue = newValue;
  // } else {
  //   displayValue += newValue;
  // }
  replace ? (displayValue = newValue) : (displayValue += newValue);
  let displayNode = document.querySelector(".screen");
  displayNode.textContent = displayValue;
}

function onNumberSelect(number) {
  if (operator) {
    // modify the second operand
    secondOperand += number;
    changeDisplayValue(number);
  } else {
    // modify the first operand
    firstOperand += number;
    changeDisplayValue(number);
  }
}

function onOperatorSelect(newOperator) {
  if (firstOperand) {
    // operator cannot be selected as the first input
    if (operator && secondOperand) {
      // if the full operation was already inputted
      // chain its result with the new operator
      onEqual();
      operator = newOperator;
      changeDisplayValue(operator);
    } else if (operator && !secondOperand) {
      // if operator was already inputted but no second operand
      // change the operator
      operator = newOperator;
      changeDisplayValue(`${firstOperand}${operator}`, true);
    } else {
      // if no operator yet
      operator = newOperator;
      changeDisplayValue(operator);
    }
  }
}

function onClear() {
  firstOperand = "";
  secondOperand = "";
  operator = "";
  // replace display value with empty string
  changeDisplayValue("", true);
}

function onDelete() {
  if (displayValue.length > 0) {
    // check if displayValue is a result of a previous calculation
    if (/\d+.?\d*\s*[+-/]\s\d+.?\d*/.test(displayValue)) {
      let result = displayValue.split(" ")[2];
      displayValue = displayValue.slice(0, -result.length);
      firstOperand = result;
      secondOperand = "";
      operator = "";
    } else {
      // remove last character from displayValue
      displayValue = displayValue.slice(0, -1);
      if (operator) {
        // if deleting from second operand
        secondOperand = secondOperand.slice(0, -1);
      } else {
        // if deleting from first operand
        firstOperand = firstOperand.slice(0, -1);
      }
    }
    // update display
    let displayNode = document.querySelector(".screen");
    displayNode.textContent = displayValue;
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

function onEqual() {
  if (firstOperand && secondOperand && operator) {
    let result = operate(
      parseFloat(firstOperand),
      parseFloat(secondOperand),
      operator
    );
    // reset operands and operator
    firstOperand = result.toString();
    secondOperand = "";
    operator = "";
    // update display with result
    changeDisplayValue(result.toString(), true);
  }
}

function handleEventListeners() {
  const numberButtons = document.querySelectorAll(".number");
  numberButtons.forEach((element) => {
    element.addEventListener("click", () => {
      // The text written on the button, which will be the number itself
      onNumberSelect(element.textContent);
    });
  });
  const operatorButtons = document.querySelectorAll(".operator");
  operatorButtons.forEach((element) => {
    element.addEventListener("click", () => {
      // The text written on the button, which will be the operator itself
      // A string contained +, -, * or /
      onOperatorSelect(element.textContent);
    });
  });
  const equalButton = document.querySelector(".equal");
  equalButton.addEventListener("click", () => {
    onEqual();
  });
  const clearButton = document.querySelector(".clear");
  clearButton.addEventListener("click", () => {
    onClear();
  });
  const deleteButton = document.querySelector("#delete");
  deleteButton?.addEventListener("click", () => {
    onDelete();
  });
}

handleEventListeners();
