let currentInput: string = '0';
let operator: string = '';
let previousInput: string = '';

function appendToDisplay(value: string): void {
    let update = false;
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput !== '0' && currentInput !== '') {
            if (previousInput !== '' && operator !== '') {
                calculate();
            }
            previousInput = currentInput;
            operator = value;
            currentInput = '0';
        }
    } else {
        update = true;
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }
    if (update) {
        updateDisplay();
    }
}

function updateDisplay(): void {
    const display = document.getElementById('display') as HTMLInputElement;
    display.value = currentInput;
}

function clearDisplay(): void {
    currentInput = '0';
    operator = '';
    previousInput = '';
    updateDisplay();
}

function deleteLast(): void {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate(): void {
    //cuando restas o sumas 0 directamente el resultado que te devuelve es 0 , es decir -> 6-0=0;
    //si quitas currentInput !== '0', ya puedes restar y sumar 0
    if (previousInput !== '' /*&& currentInput !== '0'*/ && currentInput !== '' && operator !== '') {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result: number;
        
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

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    setupEventListeners();
});

function setupEventListeners(): void {
    const buttonsContainer = document.querySelector('.buttons');
    
    if (buttonsContainer) {
        buttonsContainer.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            
            if (target.tagName === 'BUTTON') {
                const action = target.dataset.action;
                const value = target.dataset.value;
                
                if (action === 'clear') {
                    clearDisplay();
                } else if (action === 'delete') {
                    deleteLast();
                } else if (action === 'calculate') {
                    calculate();
                } else if (value) {
                    appendToDisplay(value);
                }
            }
        });
    }
}

