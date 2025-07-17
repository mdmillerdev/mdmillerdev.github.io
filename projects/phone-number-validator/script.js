const phoneInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const result = document.getElementById("results-div");

const isValid = phone => {
  const phoneRegex = /^1?\s?(?:\([\d][\d][\d]\)|[\d][\d][\d])\s?-?[\d][\d][\d]\s?-?[\d][\d][\d][\d]$/;
  return phoneRegex.test(phone);
}

checkButton.addEventListener("click", () => {
  const value = phoneInput.value;
  if (!value) {
    alert("Please provide a phone number");
    return;
  }
  const valid = isValid(value);
  result.textContent = `${valid ? "Valid US number: " : "Invalid US number: "}${value}`;
  result.style.color = valid ? "#00FF00" : "#FF0000";
});

clearButton.addEventListener("click", () => {
  result.textContent = "";
  phoneInput.value = "";
});
