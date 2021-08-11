// const display1El = document.querySelector('.display1');
// const display2El = document.querySelector('.display2');
// const tempResultEl = document.querySelector('.temp-result');
// const numbersEl = document.querySelectorAll('.number');
// const operationEl = document.querySelectorAll('.operation');
// const equalEl = document.querySelector('.equal');
// const clearAllEl = document.querySelector('.all-clear');
// const clearLastEl = document.querySelector('.last-clear');
// let dis1Num = '';
// let dis2Num = '';
// let result = null;
// let lastOperation = '';
// let haveDot = false;
// numbersEl.forEach(number => {
//     number.addEventListener('', (e) => {
//         if (e.target.innertext === '.' && !haveDot) {
//             haveDot = true
//         } else if (e.target.innertext === '.' && haveDot) {
//             return;
//         }
//         dis2Num += e.target.innertext;
//         display2El.innertext = dis2Num;

//     });
// });
// operationEl.forEach(operation => {
//     operation.addEventListener('click', (e) => {
//         if (!dis2Num) result;
//         haveDot = false;
//         const opeartioName = e.target.innertext;
//         if (dis1Num && dis2Num && lastOperation) {
//             mathOperation();
//         } else {
//             result = parseFloat(dis2Num);
//         }
//         clearvar(opeartioName);
//         lastOperation = opeartioName;
//         console.log(result);

//     });
// });

// function clerarvar(name = '') {
//     dis1Num += dis1Num + ' ' + name + ' ';
//     display1El.innertext = dis1Num;
//     display2El.innertext = '';
//     dis2Num = '';
//     tempResultEl.innertext = result;
// }

// function mathOperation() {
//     if (lastOperation === 'X') {
//         result = parseFloat(result) * parseFloat(dis2Num);
//     } else if (lastOperation === '+') {
//         result = parseFloat(result) + parseFloat(dis2Num);
//     } else if (lastOperation === '-') {
//         result = parseFloat(result) - parseFloat(dis2Num);
//     } else if (lastOperation === '/') {
//         result = parseFloat(result) / parseFloat(dis2Num);
//     } else if (lastOperation === '%') {
//         result = parseFloat(result) % parseFloat(dis2Num);
//     }
// }
// equalEl.addEventListener('click', (e) => {
//     if (!dis1Num || !dis2Num) return;
//     haveDot = false;
//     mathOperation();
//     clerarvar();
//     display2El.innertext = result;
//     tempResultEl.innertext = '';
//     dis2Num = result;
//     dis1Num = '';

// });
// clearAllEl.addEventListener('click', (e) => {
//     display1El.innertext = '';
//     display2El = '';
//     dis1Num = '';
//     dis2Num = '';
//     result = '';
//     tempResultEl.innertext = '0';
// })
// clearLastEl.addEventListener('click', (e) => {
//     display2El.innertext = '';
//     dis2Num = '';

// });
// window.addEventListener('keydown', (e) => {
//     if (e.key === '0' ||
//         e.key === '1' ||
//         e.key === '2' ||
//         e.key === '3' ||
//         e.key === '4' ||
//         e.key === '5' ||
//         e.key === '6' ||
//         e.key === '7' ||
//         e.key === '8' ||
//         e.key === '9' ||
//         e.key === '.') {
//         clickButtonEl(e.key);

//     }


// });

// function clickButtonEl(key) {
//     numbersEl.forEach(button => {
//         if (button.innertext === key) {
//             button.click();
//         }
//     })
// }"use strict";

const input = document.querySelector(".input");
const result = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
const keys = document.querySelectorAll(".bottom span");

let operation = "";
let answer;
let decimalAdded = false;

const operators = ["+", "-", "x", "÷"];

function handleKeyPress(e) {
    const key = e.target.dataset.key;
    const lastChar = operation[operation.length - 1];

    if (key === "=") {
        return;
    }

    if (key === "." && decimalAdded) {
        return;
    }

    if (operators.indexOf(key) !== -1) {
        decimalAdded = false;
    }

    if (operation.length === 0 && key === "-") {
        operation += key;
        input.innerHTML = operation;
        return;
    }

    if (operation.length === 0 && operators.indexOf(key) !== -1) {
        input.innerHTML = operation;
        return;
    }

    if (operators.indexOf(lastChar) !== -1 && operators.indexOf(key) !== -1) {
        operation = operation.replace(/.$/, key);
        input.innerHTML = operation;
        return;
    }

    if (key) {
        if (key === ".") decimalAdded = true;
        operation += key;
        input.innerHTML = operation;
        return;
    }

}

function evaluate(e) {
    const key = e.target.dataset.key;
    const lastChar = operation[operation.length - 1];

    if (key === "=" && operators.indexOf(lastChar) !== -1) {
        operation = operation.slice(0, -1);
    }

    if (operation.length === 0) {
        answer = "";
        result.innerHTML = answer;
        return;
    }

    try {

        if (operation[0] === "0" && operation[1] !== "." && operation.length > 1) {
            operation = operation.slice(1);
        }

        const final = operation.replace(/x/g, "*").replace(/÷/g, "/");
        answer = +(eval(final)).toFixed(5);

        if (key === "=") {
            decimalAdded = false;
            operation = `${answer}`;
            answer = "";
            input.innerHTML = operation;
            result.innerHTML = answer;
            return;
        }

        result.innerHTML = answer;

    } catch (e) {
        if (key === "=") {
            decimalAdded = false;
            input.innerHTML = `<span class="error">${operation}</span>`;
            result.innerHTML = `<span class="error">Bad Expression</span>`;
        }
        console.log(e);
    }

}

function clearInput(e) {

    if (e.ctrlKey) {
        operation = "";
        answer = "";
        input.innerHTML = operation;
        result.innerHTML = answer;
        return;
    }

    operation = operation.slice(0, -1);
    input.innerHTML = operation;

}

deleteBtn.addEventListener("click", clearInput);
keys.forEach(key => {
    key.addEventListener("click", handleKeyPress);
    key.addEventListener("click", evaluate);
});