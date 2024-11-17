const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const statElements = {
  name: document.getElementById("pokemon-name"),
  id: document.getElementById("pokemon-id"),
  weight: document.getElementById("weight"),
  height: document.getElementById("height"),
  hp: document.getElementById("hp"),
  attack: document.getElementById("attack"),
  defense: document.getElementById("defense"),
  "special-attack": document.getElementById("special-attack"),
  "special-defense": document.getElementById("special-defense"),
  speed: document.getElementById("speed"),
  typeContainer: document.getElementById("types"),
  imgContainer: document.getElementById("image-container"),
};

const fetchData = async (url, waitingCode = undefined) => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    waitingCode(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const vaildInputsListUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

let listOfValidInputs = {};

const updateListOfValidInputs = (data) => {
  listOfValidInputs = data;
}

const updateStats = (data) => {
  const { name, id, weight, height, typeContainer, imgContainer } = statElements;
  const stats = data.stats;
  name.textContent = data.name;
  id.textContent = data.id;
  stats.forEach((stat) => {
    const statName = stat.stat.name;
    const statValue = stat.base_stat;
    statElements[statName].textContent = statValue;
  });
  weight.textContent = data.weight;
  height.textContent = data.height;
  typeContainer.innerHTML = "";
  data.types.forEach((el) => {
    typeContainer.innerHTML += `<div class="type">${el.type.name.toUpperCase()}</div>`;
    typeContainer.value = el.type.name.toUpperCase();
  });
  const imgHTML = `<img id="sprite" src="${data.sprites["front_default"]}" alt="${data.name}"/>`;
  console.log(imgHTML);
  imgContainer.innerHTML = imgHTML;
}

fetchData(vaildInputsListUrl, updateListOfValidInputs);

const cleanInput = (input) => {
  const regex = /["'_]/gi;
  const cleaned = input.toLowerCase().replace(regex, "");
  const spaceRegex = /\s/g;
  const dashed = cleaned.replace(spaceRegex, "-");
  return dashed;
}

const isInputValid = input => {
  let resultId = -1;
  const isValid = listOfValidInputs.results.some(({ id, name }) => {
    if (id === Number(input) || name === input) {
      resultId = id;
      return true;
    }
    return false;
  });
  const result = { valid: isValid, id: resultId }
  return result;
}

searchButton.addEventListener("click", () => {
  if (!listOfValidInputs["count"]) {
    console.log("Data not loaded yet.");
    return;
  }
  const input = cleanInput(searchInput.value);
  const { valid, id } = isInputValid(input);
  if (valid) {
    console.log(id);
    let url = `${vaildInputsListUrl}/${id}/`;
    fetchData(url, updateStats);
  } else {
    alert("Pokemon not found");
  }
});