let firstNumber = "";
let secondNumber = "";
let operator = "";
let currentNumber = "";
let newCalculation = false;

const display = document.getElementById("display");

const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const zero = document.getElementById("zero");

const add = document.getElementById("add");
const subtract = document.getElementById("subtract");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const percentage = document.getElementById("percent");

const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const decimal = document.getElementById("decimal");


function enterNumber(number) {

    if (newCalculation) {
        currentNumber = "";
        firstNumber = "";
        operator = "";
        newCalculation = false;
    }

    currentNumber += number;

    if (operator === "") {
        display.textContent = currentNumber;
    } else {
        display.textContent = firstNumber + " " + operator + " " + currentNumber;
    }
}


seven.onclick = function() {
    enterNumber("7");
};

eight.onclick = function() {
    enterNumber("8");
};

nine.onclick = function() {
    enterNumber("9");
};

four.onclick = function() {
    enterNumber("4");
};

five.onclick = function() {
    enterNumber("5");
};

six.onclick = function() {
    enterNumber("6");
};

three.onclick = function() {
    enterNumber("3");
};

two.onclick = function() {
    enterNumber("2");
};

one.onclick = function() {
    enterNumber("1");
};

zero.onclick = function() {
    enterNumber("0");
};


add.onclick = function() {
    firstNumber = currentNumber;
    operator = "+";
    currentNumber = "";

    display.textContent = firstNumber + " + ";
};


subtract.onclick = function() {
    firstNumber = currentNumber;
    operator = "-";
    currentNumber = "";

    display.textContent = firstNumber + " - ";
};


multiply.onclick = function() {
    firstNumber = currentNumber;
    operator = "×";
    currentNumber = "";

    display.textContent = firstNumber + " × ";
};


divide.onclick = function() {
    firstNumber = currentNumber;
    operator = "÷";
    currentNumber = "";

    display.textContent = firstNumber + " ÷ ";
};


percentage.onclick = function() {
    firstNumber = currentNumber;
    operator = "%";
    currentNumber = "";

    display.textContent = firstNumber + " % ";
};


equals.onclick = function() {

    secondNumber = currentNumber;

    let number1 = Number(firstNumber);
    let number2 = Number(secondNumber);
    let result;

    if (operator === "+") {
        result = number1 + number2;
    }

    else if (operator === "-") {
        result = number1 - number2;
    }

    else if (operator === "×") {
        result = number1 * number2;
    }

    else if (operator === "÷") {

        if (number2 === 0) {
            display.textContent = "Cannot divide by 0";
            return;
        }

        result = number1 / number2;
    }

    else if (operator === "%") {
        result = number1 % number2;
    }

    display.textContent = result;

    currentNumber = result.toString();
    firstNumber = "";
    secondNumber = "";
    operator = "";
    newCalculation = true;
};


clear.onclick = function() {

    display.textContent = "0";

    firstNumber = "";
    secondNumber = "";
    operator = "";
    currentNumber = "";
    newCalculation = false;
};


deleteBtn.onclick = function() {

    currentNumber = currentNumber.slice(0, -1);

    if (currentNumber === "") {
        display.textContent = "0";
    } else if (operator === "") {
        display.textContent = currentNumber;
    } else {
        display.textContent = firstNumber + " " + operator + " " + currentNumber;
    }
};


decimal.onclick = function() {

    if (!currentNumber.includes(".")) {

        if (currentNumber === "") {
            currentNumber = "0.";
        } else {
            currentNumber += ".";
        }

        if (operator === "") {
            display.textContent = currentNumber;
        } else {
            display.textContent = firstNumber + " " + operator + " " + currentNumber;
        }
    }
};