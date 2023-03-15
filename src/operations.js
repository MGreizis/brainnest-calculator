function add(number, newValue) {
    if (operator === '+') {
        return number + newValue;
    }
}

function subtract(number, newValue) {
    if (operator === '-') {
        return number - newValue;
    }
}


function multiply(number, newValue) {
    if (operator === '*') {
        return number * newValue; 
    }
}

function divide(number, newValue) {
    if (operator === '/') {
        return number / newValue;
    }
}

function operate(number, newValue, operator) {
    const newValue = parseFloat(displayValue);
    const result = calculate(number, newValue, operator)
    displayValue = String(result);
}

export {add, subtract, multiply, divide, operate}


/* potentially what we really need

let divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }
  
*/



//Can I do this? //
function calculate(number, newValue, operator) {
    if (operator === '+') {
        return number + newValue;
    } else if (operator === '-') {
        return number - newValue;
    } else if (operator === '*') {
        return number * newValue; 
    } else if (operator === '/') {
        return number / newValue;
    }
    return newValue
} export {calculate};

//result displayed ===true;//