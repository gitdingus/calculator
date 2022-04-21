const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

Array.from(buttons).forEach(button => button.addEventListener('click', buttonClick));

function buttonClick(e){
    console.log(`Value of button clicked: ${this.value}`);
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