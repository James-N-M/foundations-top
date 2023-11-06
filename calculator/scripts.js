// ui
const displayDiv = document.getElementById("display");
const digitButtons = document.querySelectorAll(".digit-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const equalsButton = document.getElementById("equals-btn");
const clearButton = document.getElementById("clear-btn");
const backspaceButton = document.getElementById('backspace-btn');

const state = {
    currentNumber: "", number1: "", number2: "", operator: "", display: ""
};

clearButton.addEventListener("click", clear);

backspaceButton.addEventListener("click", backspace);

equalsButton.addEventListener("click", () => {
    if (state.display && state.number2 == "" && state.number1 != "") {
        state.number2 = state.currentNumber;
    }

    if (state.operator && state.number1 && state.number2) {
        state.currentNumber = operate(state.operator, Number(state.number1), Number(state.number2));
        displayDiv.innerText = state.currentNumber;
        state.number1 = "";
        state.number2 = "";
        state.operator = "";
    }
});


digitButtons.forEach((elem) => {
    elem.addEventListener("click", (event) => {
        state.currentNumber += event.target.value;
        displayDiv.innerText = `${state.display} ${state.currentNumber}`;
    });
});

operatorButtons.forEach((elem) => {
    elem.addEventListener("click", (event) => {
        if (state.number1 == "") {
            state.number1 = state.currentNumber;
            state.display = `${state.number1} ${event.target.value}`
            displayDiv.innerText = state.display;
        } else if (state.number2 == "" || state.number2 == 0) {
            state.number2 = state.currentNumber;
            state.display = `${state.number1} ${event.target.value} ${state.number2}`
            displayDiv.innerText = state.display;
        }

        if (state.operator && state.number1 && state.number2) {
            const result = operate(state.operator, Number(state.number1), Number(state.number2));
            state.number1 = result;
            state.number2 = "";
            state.display = `${result} ${event.target.value}`;
            displayDiv.innerText = state.display;
        }

        state.operator = event.target.value;
        state.currentNumber = "";
    });
});

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

function operate(operator, number1, number2) {
    switch (operator) {
        case "+":
            return add(number1, number2);
        case "-":
            return subtract(number1, number2);
        case "*":
            return multiply(number1, number2);
        case "/":
            return divide(number1, number2);
    }
}

function clear() {
    state.number1 = "";
    state.number2 = "";
    state.operator = "";
    state.display = "";
    state.currentNumber = "";
    displayDiv.innerHTML = "";
}

function backspace() {
    if (state.currentNumber) {
        state.currentNumber = state.currentNumber.slice(0, -1);
        displayDiv.innerText = `${state.display} ${state.currentNumber}`;
    }
}
