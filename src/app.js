let firstOperand = "";
let secondOperand = "";
let operator = "";
let displayValue = "";
let currentResult = "";

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
    // no operator and previous result
    if (currentResult) {
      firstOperand = number;
      currentResult = "";
      changeDisplayValue(firstOperand, true);
    } else {
      // no operator and no previous result
      // modify the first operand
      firstOperand += number;
      changeDisplayValue(number);
    }
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
      if (firstOperand.charAt(firstOperand.length-1) === '.') {
        firstOperand = firstOperand.slice(0, firstOperand.length - 1);
        changeDisplayValue(`${firstOperand}${operator}`, true)
      } else {
        changeDisplayValue(operator);
      }
      
    }
  }
}

function onClear() {
  firstOperand = "";
  secondOperand = "";
  operator = "";
  currentResult = "";
  // replace display value with empty string
  changeDisplayValue("", true);
}

function onDelete() {
  if (displayValue.length > 0) {
    // clear current result from last operation
    currentResult = "";
    if (secondOperand) {
      secondOperand = secondOperand.slice(0 , secondOperand.length - 1);
      changeDisplayValue(`${firstOperand}${operator}${secondOperand}`, true);
    } else if (operator) {
      operator = "";
      changeDisplayValue(firstOperand, true);
    } else {
      firstOperand = firstOperand.slice(0 , firstOperand.length - 1);
      changeDisplayValue(`${firstOperand}`, true);
    }
  }
}


function onEqual() {
  if (firstOperand && secondOperand && operator) {
    let result = operate(
      parseFloat(firstOperand),
      parseFloat(secondOperand),
      operator
    );
    // reset operands and operator
    firstOperand = result.toString();
    currentResult = result.toString();
    secondOperand = "";
    operator = "";
    // update display with result
    changeDisplayValue(result.toString(), true);
  }
}

function onMinus() {
  if (firstOperand && !operator) {
    if (parseFloat(firstOperand) < 0) {
      firstOperand = firstOperand.slice(1);
    } else {
      firstOperand = '-' + firstOperand;
    }
    changeDisplayValue(firstOperand, true);
  } else if (operator && secondOperand) {
    if (parseFloat(secondOperand) < 0) {
      secondOperand = secondOperand.slice(1);
      changeDisplayValue(`${firstOperand}${operator}${secondOperand}`, true);
    } else {
      secondOperand = '-' + secondOperand;
      changeDisplayValue(`${firstOperand}${operator}(${secondOperand})`, true);
    }
    
  }
}

function onPercentage() {
  if (firstOperand && !operator) {
    firstOperand /= 100;
    console.log(firstOperand);
    changeDisplayValue(firstOperand, true);
  } else if (operator && secondOperand) {
    secondOperand /= 100;
    changeDisplayValue(`${firstOperand}${operator}${secondOperand}`, true);
  }
}

function onDecimal() {
  if (firstOperand && !operator && !firstOperand.includes('.')) {
    currentResult = "";
    firstOperand += '.';
    changeDisplayValue('.');
  } else if (operator && secondOperand && !secondOperand.includes('.')) {
    secondOperand += '.';
    changeDisplayValue('.');
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
  const negativeButton = document.querySelector(".negativeToggle");
  negativeButton.addEventListener("click", onMinus);
  const percentageButton = document.querySelector(".percentage");
  percentageButton.addEventListener("click", onPercentage);
  const decimalButton = document.querySelector(".decimal");
  decimalButton.addEventListener("click", onDecimal);

  window.addEventListener("keydown", (event) => {
    // check if the key pressed is a number key
    if (!isNaN(parseInt(event.key))) {
      onNumberSelect(event.key);
    } else if (event.key === ".") {
      onDecimal();
    } else if (event.key === "Backspace") {
      onDelete();
    } else if (event.key === "Escape") {
      onClear();
    } else if (event.key === "+") {
      onOperatorSelect("+");
    } else if (event.key === "-") {
      onOperatorSelect("-");
    } else if (event.key === "*") {
      onOperatorSelect("*");
    } else if (event.key === "/") {
      onOperatorSelect("/");
    } else if (event.key === "=" || event.key === "Enter") {
      onEqual();
    }
  });
}

handleEventListeners();
