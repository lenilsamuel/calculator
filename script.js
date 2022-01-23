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

  // Add event listeners for numbers, operators and decimal buttons
  $("button").on("click", function () {
    sendNumberValue(this.value);
  });

  // Reset display on clicking 'C'
  $("#clear-btn").on("click", function () {
    calculatorDisplay.text('0');
  });

});
