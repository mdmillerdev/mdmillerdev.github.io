const convertButton = document.getElementById("convert-btn");
const numberInput = document.getElementById("number");
const result = document.getElementById("output");

const numerals = [
  {
    one: "I",
    five: "V",
    ten: "X"
  },
  {
    one: "X",
    five: "L",
    ten: "C"
  },
  {
    one: "C",
    five: "D",
    ten: "M"
  },
  {
    one: "M",
    five: "V",
    ten: "X"
  }
];

const stringToRomanNumerals = (number) => {
  const length = number.length;
  const value = parseInt(number.substring(0, 1));
  const numeral = numerals[length - 1] || {};
  if (length === 0) {
    return "";
  }
  if (value <= 3) {
    return numeral.one.repeat(value) + stringToRomanNumerals(number.substring(1));
  }
  if (value === 4) {
    return numeral.one + numeral.five + stringToRomanNumerals(number.substring(1));
  }
  if (value === 5) {
    return numeral.five + stringToRomanNumerals(number.substring(1));
  }
  if (value <= 8) {
    return numeral.five + numeral.one.repeat(value - 5) + stringToRomanNumerals(number.substring(1));
  }
  return numeral.one + numeral.ten + stringToRomanNumerals(number.substring(1));
}

convertButton.addEventListener("click", () => {
  const numberValue = parseInt(numberInput.value);
  if (!numberInput.value || isNaN(numberValue)) {
    result.textContent = "Please enter a valid number";
    return;
  }
  if (numberValue < 0) {
    result.textContent = "Please enter a number greater than or equal to 1";
    return;
  }
  if (numberValue >= 4000) {
    result.textContent = "Please enter a number less than or equal to 3999";
    return;
  }
  result.textContent = stringToRomanNumerals(String(numberValue));
});
