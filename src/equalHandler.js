import { operate } from "./operations";

let currentOperand = 0;
let previousOperand = 0;
let currentOperator = ""

function onEqual() {
  // operate function imported from operations
}

function onOperatorSelect(operator) {
  currentOperator = operator
}