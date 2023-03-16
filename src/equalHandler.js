import { operate } from "./operations";

let currentOperand = 0;
let previousOperand = 0;
let currentOperator = ""

function onEqual() {
  let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }// operate function imported from operations


function onOperatorSelect(operator) {
  currentOperator = operator
}


