// ui elements
const gridContainer = document.getElementById("grid-container");
const colorInput = document.getElementById("color-input");
const clearButton = document.getElementById("clear-btn");
const modeButtons = document.querySelectorAll(".mode-button");
const gridRangeInput = document.getElementById("grid-range");
const gridSetting = document.getElementById("grid-setting");

// constants
const defaultColor = "#fff";
const settings = {
  color: "#000000",
  mode: "color",
  grid: 16,
};

colorInput.addEventListener("change", (event) => {
  settings.color = event.target.value;
});

gridRangeInput.addEventListener("change", (event) => {
    if(event.target.value == "0" ) {
        settings.grid = 1;
        gridSetting.innerText = "1 x 1"
    } else {
        settings.grid = event.target.value;
        gridSetting.innerText = `${event.target.value} x ${event.target.value}`
    }

    createGrid();
  });

clearButton.addEventListener("click", clear);

modeButtons.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    setActiveButton(event.target);
    settings.mode = event.target.value;
  });
});

createGrid();

function createGrid() {
  let squareSize = 500 / settings.grid;
  let squares = [];
  for (let i = 0; i < settings.grid; i++) {
    for (let j = 0; j < settings.grid; j++) {
      let div = document.createElement("div");
      div.addEventListener(
        "mouseover",
        (event) => (event.target.style.background = color())
      );
      div.style.height = squareSize + "px";
      div.style.width = squareSize + "px";
      div.style.backgroundColor = "#fff";
      div.classList.add("square");
      squares.push(div);
    }
    gridContainer.replaceChildren(...squares);
  }
}

function color() {
  if (settings.mode === "color") {
    return settings.color;
  } else if (settings.mode === "rainbow") {
    return randomColor();
  } else if (settings.mode === "eraser") {
    return defaultColor;
  }
}

function clear() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((elem) => (elem.style.backgroundColor = defaultColor));
}

function setActiveButton(elem) {
  const buttons = document.getElementsByTagName("button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("settings-button--active");
  }

  elem.classList.add("settings-button--active");
}

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
