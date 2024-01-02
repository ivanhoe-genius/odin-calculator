let first = 0;
let operator = null;
let second = null;
let result = null;
let typing = false;
let solved = false;

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display>span');

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case '0':
            numericHandler('0');
            break;
        case '1':
            numericHandler('1');
            break;
        case '2':
            numericHandler('2');
            break;
        case '3':
            numericHandler('3');
            break;
        case '4':
            numericHandler('4');
            break;
        case '5':
            numericHandler('5');
            break;
        case '6':
            numericHandler('6');
            break;
        case '7':
            numericHandler('7');
            break;
        case '8':
            numericHandler('8');
            break;
        case '9':
            numericHandler('9');
            break;
        case 'Backspace':
            backspaceHandler();
            break;
        case '/':
            operatorHandler('/');
            break;
        case '*':
            operatorHandler('*');
            break;
        case '-':
            operatorHandler('-');
            break;
        case '+':
            operatorHandler('+');
            break;
        case '.':
            decimalHandler();
            break;
        case 'Enter':
            e.preventDefault();
            equalsHandler();
            break;
    }
});

function numericHandler(num) {
    updateDisplay(num);
}

function operatorHandler(oper) {
    if (first === 0 && operator === null) {
        first = Number(display.textContent);

    } else if (first !== 0 && operator !== null && second === null) {
        second = Number(display.textContent);
        result = operate(first, operator, second);
        cleanUp();
    }

    operator = oper;
}

function backspaceHandler() {
    const newValue = display.textContent.slice(0, -1);
    if (newValue === '') {
        display.textContent = '0';
    } else if (!Number(display.textContent)) {
        display.textContent = '0';
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function decimalHandler() {
    if (!display.textContent.includes('.')) {
        updateDisplay('.');
    }
}

function equalsHandler() {
    if (first !== null && operator !== null) {
        second = Number(display.textContent);
        result = operate(first, operator, second);
        cleanUp();
        solved = true;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', e => {
        switch (true) {
            case e.target.value === 'C':
                display.textContent = '0';
                first = 0;
                operator = null;
                second = null;
                result = null;
                typing = false;
                break;

            case e.target.id === 'bakcspace':
                backspaceHandler();
                break;

            case e.target.value === "%":
                if (isNaN(Number(display.textContent))) {
                    display.textContent = 'Yeah, right!';
                } else {
                    display.textContent /= 100;
                }
                break;

            case e.target.value === "+/-":
                if (isNaN(Number(display.textContent))) {
                    display.textContent = 'Yeah, right!';
                } else {
                    display.textContent *= (-1);
                }
                break;

            case [...e.target.classList].includes('number') && e.target.id !== 'dot':
                numericHandler(e.target.value);
                break;

            case e.target.id === 'dot':
                decimalHandler();
                break;

            case [...e.target.classList].includes('operator'):
                operatorHandler(e.target.value);
                break;

            case e.target.id === 'equals':
                equalsHandler();
                break;

            default:
                break;
        }
    }, false);
});

function cleanUp() {
    typing = false;

    updateDisplay(result);

    if (result === 'Yeah, right!') {
        first = 0;
    } else {
        first = result;
    }

    operator = null;
    second = null;
    result = null;
    typing = false;
}

function updateDisplay(value) {
    if (isNaN(Number(value)) && value !== '.') {
        value = 'Yeah, right!';
    }

    if (value === '.') {
        display.textContent = display.textContent + value;
        return;
    }

    if (value === 'Yeah, right!') {
        display.textContent = value;
    } else if (operator === null) {
        if (display.textContent === 'Yeah, right!') {
            display.textContent = '';

        } else if (first !== 0) {
            if (Number(value) && parseFloat(Number(value)).toString().length > 15) {
                if (parseFloat(Number(value).toFixed(7)).toString().length <= 15) {
                    display.textContent = parseFloat(Number(value).toFixed(7));
                } else {
                    display.textContent = 'Yeah, right!';
                }
            } else {
                if (solved === true) {
                    display.textContent = Number(value);
                    solved = false;
                } else {
                    display.textContent = display.textContent + Number(value);
                }
            }

        } else {
            if (Number(value) && parseFloat(Number(display.textContent + value)).toString().length > 15) {
                if (parseFloat(Number(value).toFixed(7)).toString().length <= 15) {
                    display.textContent = parseFloat(Number(display.textContent + value).toFixed(7));
                } else {
                    display.textContent = 'Yeah, right!';
                }
            } else {
                if (value === '0') {
                    display.textContent = display.textContent + value;
                } else {
                    display.textContent = Number(display.textContent + value);
                }
            }
        }

    } else {
        if (!typing) {
            display.textContent = '';
            typing = true;
        }

        if (display.textContent === 'Yeah, right!') {
            display.textContent = '';
        }

        if (Number(value) && parseFloat(Number(display.textContent + value)).toString().length > 15) {
            if (parseFloat(Number(value).toFixed(7)).toString().length <= 15) {
                display.textContent = parseFloat(Number(display.textContent + value).toFixed(7));
            } else {
                display.textContent = 'Yeah, right!';
            }
        } else {
            if (value === '0') {
                display.textContent = display.textContent + value;
            } else {
                display.textContent = Number(display.textContent + value);
            }
        }
    }
}

function operate(firstOp, op, secondOp) {
    switch (op) {
        case '+':
            return add(firstOp, secondOp);
        case '-':
            return subtract(firstOp, secondOp);
        case '*':
            return multiply(firstOp, secondOp);
        case '/':
            return divide(firstOp, secondOp);

        default:
            break;
    }
}

function add(firstOp, secondOp) {
    return firstOp + secondOp;
}
function subtract(firstOp, secondOp) {
    return firstOp - secondOp;
}
function multiply(firstOp, secondOp) {
    return firstOp * secondOp;
}
function divide(firstOp, secondOp) {
    if (secondOp === 0) {
        return 'Yeah, right!';
    }
    return firstOp / secondOp;
}

