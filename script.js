$(document).ready(function () {
  const calculatorDisplay = $(".calc-val");
  const inputBtns = $("button");
  const clearBtn = $("#clear-btn");

  function sendNumberValue(number) {
    const displayValue = calculatorDisplay.html();
    if (displayValue === "0") {
      calculatorDisplay.text(number);
    } else {
      calculatorDisplay.text(displayValue + number);
    }
  }

  // Function that prevents a decimal from being added to the display if a decimal already exists 
  $(".decimal").on("click", function () {
    const displayValue = calculatorDisplay.html();
    if (!displayValue.includes(this.value)) {
      calculatorDisplay.text(displayValue + this.value);
    } else {
      calculatorDisplay.text(displayValue);
    }
  });

  // Add event listeners for numbers, operators. Decimal button is ignored
  $("button").on("click", function () {
    if (this.value === '.') return;
    sendNumberValue(this.value);
  });

  // Reset display on clicking 'C'
  $("#clear-btn").on("click", function () {
    calculatorDisplay.text("0");
  });

});
