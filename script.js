const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

Array.from(buttons).forEach(button => button.addEventListener('click', buttonClick));
let fillFirst = true;
let addPeriod = true;
let firstNumStr = "";
let secondNumStr = "";
let operationStr = "";
let result;

function buttonClick(e){
    if (this.classList.contains("number")){
        fillNumber(this.value);

        if (fillFirst){
            display.textContent = firstNumStr;
        }
        else {
            display.textContent = secondNumStr;
        }
    }
    else if (this.classList.contains("period")){
        if (addPeriod){
            fillNumber('.');
        }

        addPeriod = false;
        
        if (fillFirst){
            display.textContent = firstNumStr;
        }
        else {
            display.textContent = secondNumStr;
        }
    }
    else if (this.classList.contains("operator")){
        fillOperator(this.value);
        fillFirst = false;
        addPeriod = true;
    }
    else if (this.classList.contains("equals")){
        if (firstNumStr && secondNumStr && operationStr){
            let x = Number(firstNumStr);
            let y = Number(secondNumStr);
            result = operate(operationStr, x, y);

            display.textContent = result;
        }

        firstNumStr = '';
        secondNumStr = '';
        operationStr = '';

        fillFirst = true;
        addPeriod = true;
    }
    else if (this.classList.contains("clear")){
        clearButtonClicked(this.value);
    }
}

function clearButtonClicked(value){

    if (value === "AC"){
        firstNumStr = '';
        secondNumStr = '';
        operatorStr = '';

        fillFirst = true;
        addPeriod = true;

        result = 0
        display.textContent = '';
    }

}

function fillNumber(numChar){
    if (fillFirst){
        firstNumStr += numChar;
    }
    else {
        secondNumStr += numChar;
    }
}

function fillOperator(opValue){
    switch (opValue){
        case 'add':
            operationStr = '+';
            break;
        case 'minus':
            operationStr = '-';
            break;
        case 'multiply':
            operationStr = '*';
            break;
        case 'divide':
            operationStr = '/';
            break;
        default:
            return 'INVALID_OPERATOR';
    }
}

function add(x, y){
    return x + y;
}

function subtract (x,y){
    return x - y;
}

function multiply (x,y){
    return x * y;
}

function divide (x, y){
    return x / y;
}

function operate(operator, x, y){
    if (typeof x !== 'number' || typeof y !== 'number'){
        return 'INVALID_INPUT';
    }
    
    switch (operator){
        case '+':
            return add(x,y);
            break;
        case '-':
            return subtract(x,y);
            break;
        case '*':
            return multiply(x,y);
            break;
        case '/':
            return divide(x,y);
            break;
        default:
            return 'INVALID_OPERATOR';
            break;
    }
}