var currentInput = '0';
var operator = '';
var previousInput = '';
function appendToDisplay(value) {
    var update = false;
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput !== '0' && currentInput !== '') {
            if (previousInput !== '' && operator !== '') {
                calculate();
            }
            previousInput = currentInput;
            operator = value;
            currentInput = '0';
        }
    }
    else {
        update = true;
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        }
        else {
            currentInput += value;
        }
    }
    if (update) {
        updateDisplay();
    }
}
function updateDisplay() {
    var display = document.getElementById('display');
    display.value = currentInput;
}
function clearDisplay() {
    currentInput = '0';
    operator = '';
    previousInput = '';
    updateDisplay();
}
function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    }
    else {
        currentInput = '0';
    }
    updateDisplay();
}
function calculate() {
    if (previousInput !== '' && currentInput !== '0' && currentInput !== '' && operator !== '') {
        var prev = parseFloat(previousInput);
        var current = parseFloat(currentInput);
        var result = void 0;
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Error: División por cero');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateDisplay();
    }
}
document.addEventListener('DOMContentLoaded', function () {
    updateDisplay();
    setupEventListeners();
});
function setupEventListeners() {
    var buttonsContainer = document.querySelector('.buttons');
    if (buttonsContainer) {
        buttonsContainer.addEventListener('click', function (event) {
            var target = event.target;
            if (target.tagName === 'BUTTON') {
                var action = target.dataset.action;
                var value = target.dataset.value;
                if (action === 'clear') {
                    clearDisplay();
                }
                else if (action === 'delete') {
                    deleteLast();
                }
                else if (action === 'calculate') {
                    calculate();
                }
                else if (value) {
                    appendToDisplay(value);
                }
            }
        });
    }
}
