$(document).ready(function () {
  const calculatorDisplay = $(".calc-val");
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
    // Assign firstValue if no value
    if (!firstValue) {
      firstValue = currentValue;
    } else {
      console.log("currentValue", currentValue);
    }
    awaitingNextValue = true;
    operatorValue = operator;
    console.log("firstValue", firstValue, "operatorValue", operatorValue);
  }

  // Function that prevents a decimal from being added to the display if a decimal already exists
  $(".decimal").on("click", function () {
    if (awaitingNextValue) return;
    const displayValue = calculatorDisplay.html();
    if (!displayValue.includes(this.value)) {
      calculatorDisplay.text(displayValue + this.value);
    } else {
      calculatorDisplay.text(displayValue);
    }
  });

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

  // Reset display on clicking 'C'
  $("#clear-btn").on("click", function () {
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;
    calculatorDisplay.text("0");
  });
});
