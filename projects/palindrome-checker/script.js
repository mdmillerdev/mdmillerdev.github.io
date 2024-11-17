const checkButton = document.querySelector("#check-btn");
const textInput = document.querySelector("#text-input");
const resultText = document.querySelector("#result");

checkButton.addEventListener("click", () => {
  if (textInput.value === "") {
    alert("Please input a value");
  } else {
    let foundError = false;
    const regex = /[\W\s_]/g;
    const cleanedString = textInput.value.replace(regex, '').toLowerCase();
    const charArr = Array.from(cleanedString);
    for (let i = 0; i < Math.ceil(charArr.length / 2); i++) {
      if (charArr[i] !== charArr[charArr.length - i - 1]) {
        foundError = true;
      }
    }
    resultText.innerText = `${textInput.value} ${foundError ? "is not" : "is"} a palindrome`;
  }
});
