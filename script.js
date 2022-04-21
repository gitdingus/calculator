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
        if (operationStr === '' && fillFirst === false){
            firstNumStr = '';
            fillFirst = true;
        }
        fillNumber(this.value);

        if (fillFirst){
            display.textContent = firstNumStr;
        }
        else {
            display.textContent = secondNumStr;
        }
    }
    else if (this.classList.contains("period")){
        if (operationStr === '' && fillFirst === false){
            firstNumStr = '';
            fillFirst = true;
        }
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
        if (!fillFirst){
            if (firstNumStr && secondNumStr && operationStr){
                let x = Number(firstNumStr);
                let y = Number(secondNumStr);
                result = operate(operationStr, x, y);
    
                if (result.toString().length > 21){
                    display.textContent = result.toFixed(21);
                }
                else{
                    display.textContent = result;
                }
                firstNumStr = result.toString();
                secondNumStr = '';
            }
        }
        fillFirst = false;
        addPeriod = true;

        fillOperator(this.value);


    }
    else if (this.classList.contains("equals")){
        if (!(firstNumStr && secondNumStr && operationStr)){
            return;
        }
        if (firstNumStr && secondNumStr && operationStr){
            let x = Number(firstNumStr);
            let y = Number(secondNumStr);
            result = operate(operationStr, x, y);

            if (result.toString().length > 21){
                display.textContent = result.toFixed(21);
            }
            else{
                display.textContent = result;
            }
        }

        firstNumStr = result.toString();
        secondNumStr = '';
        operationStr = '';

        fillFirst = false;
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

    if (value === "CE"){
        if (secondNumStr !== ''){
            secondNumStr = '';
        }
        else if (secondNumStr === ''){
            clearButtonClicked("AC");
        }

        display.textContent = '';
    }

}

function fillNumber(numChar){
    if (fillFirst && firstNumStr.length < 21){
        firstNumStr += numChar;
    }
    else if (!fillFirst && secondNumStr.length < 21){
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
    if (y === 0){
        return 'snarky error message';
    }
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