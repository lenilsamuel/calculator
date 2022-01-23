$(document).ready(function () {
  const calculatorDisplay = $(".calc-val");
  const calculate = {
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
    "=": (firstNumber, secondNumber) => secondNumber,
    'Enter': (firstNumber, secondNumber) => secondNumber,
  };

  let firstValue = 0;
  let operatorValue = "";
  let awaitingNextValue = false;

  function sendNumberValue(number) {
    if (awaitingNextValue) {
      calculatorDisplay.text(number);
      awaitingNextValue = false;
    } else {
      const displayValue = calculatorDisplay.html();
      if (displayValue === "0") {
        calculatorDisplay.text(number);
      } else {
        calculatorDisplay.text(displayValue + number);
      }
    }
  }

  function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.html());
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
      operatorValue = operator;
      return;
    }
    // Assign firstValue if no value
    if (!firstValue) {
      firstValue = currentValue;
    } else {
      const calculation = calculate[operatorValue](firstValue, currentValue);
      calculatorDisplay.html(calculation);
      firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
  }

  function useDecimal() {
    if (awaitingNextValue) return;
    const displayValue = calculatorDisplay.html();
    if (!displayValue.includes(".")) {
      calculatorDisplay.text(displayValue + ".");
    } else {
      calculatorDisplay.text(displayValue);
    }
  }

  $(".decimal").on("click", useDecimal);

  // Add event listeners for numbers. Decimal & operator buttons are ignored
  $("button").on("click", function () {
    if ($(this).hasClass("decimal")) {
      return;
    }
    if ($(this).hasClass("operator")) {
      useOperator(this.value);
      return;
    }
    sendNumberValue(this.value);
  });

  $(this).on("keypress", function (e) {
    const arrNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const operatorArr = ["+", "-", "*", "/", "=", "Enter"];
    if (arrNums.includes(Number(e.key))) sendNumberValue(e.key);
    if (operatorArr.includes(e.key)) {
      e.preventDefault();
      useOperator(e.key);
    }
    if (e.key === ".") useDecimal();
  });

  // Event listener to reset display on clicking 'C' (clear button)
  $("#clear-btn").on("click", function () {
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;
    calculatorDisplay.html("0");
  });
});
