const numbers = document.querySelectorAll('.btn')
const operators = document.querySelectorAll('.opr')
const equalsButton = document.querySelector('.equ');
const firstNumber = document.querySelector('.first')
const operatorDisplay = document.querySelector('.operator')
const secondNumber = document.querySelector('.second')
const total = document.querySelector('.total')
const clearButton = document.querySelector('.clear')
const dotButton = document.querySelector('.dot')
const backspaceButton = document.querySelector('.backspace')



let num_1 = ''
let operation = ''
let num_2 = ''
let result = ''

function add(a, b){
  return a + b;
}
function sub(a, b){
  return a - b;
}
function mult(a, b){
  return a * b;
}
function div(a, b){
  return a / b;
}

function operate(num_1, num_2, operation){
  let num1 = parseFloat(num_1)
  let num2 = parseFloat(num_2)
  if(operation === '+'){
   return add(num1, num2);  
  }else if(operation === '-'){
    return sub(num1, num2)
  }else if(operation === '*'){
    return mult(num1, num2)
  }else if(operation === '/'){
    return div(num1, num2)
  }
    
}
function calculate(){
  dotButton.disabled = false
  result = operate(num_1, num_2,operation)
  num_1 = ''
  num_1 = Math.round((result + Number.EPSILON) * 100) / 100
  console.log(num_1)
  num_2 = ''
  operation = ''
  console.log(num_2)
  firstNumber.innerText = num_1
  secondNumber.innerText = ''
  operatorDisplay.innerText = ''
}

function clearDisplay(){
  num_1 = ''
  num_2 = ''
  result = ''
  operation = ''
  firstNumber.innerText = ''
  secondNumber.innerText = ''
  operatorDisplay.innerText = ''
  dotButton.disabled = false
}

function backSpace(){
  if(num_2 !== '' && operation === ''){
    num_2 = num_2.slice(0, -1)
  secondNumber.innerText = num_2
  }else if(operation !== '' && num_2 === '' || num_1 === ''){
    operation = operation.slice(0, -1)
    operatorDisplay.innerText = operation
  }else if(num_1 !== '' && operation === ''){
    num_1 = num_1.toString().slice(0, -1)
  firstNumber.innerText = num_1
  }else if(num_1 !== '' && operation !== '' && num_2 !== ''){
  num_2 = num_2.toString().slice(0, -1)
  secondNumber.innerText = num_2
  }
}

numbers.forEach(num => num.addEventListener('click', (e)=>{
  num_2 += e.target.innerText
  secondNumber.innerText = num_2
  if(operation === ''){
    firstNumber.innerText = ''
    num_1 = ''
  }
  if(num_2.includes('.')){
      dotButton.disabled = true;
     }else if(operation != ''){
       dotButton.disabled = false
     }
}))



operators.forEach(opr => opr.addEventListener('click', (e)=>{
  dotButton.disabled = false
  operation = e.target.innerText
  if(num_2 === ''){
    firstNumber.innerText = num_1
    operatorDisplay.innerText = operation
  }else if(num_1 != '' && num_2 != '' && operation != ''){
    result = operate(num_1, num_2, operation)
    num_1 = Math.round((result + Number.EPSILON) * 100) / 100
    firstNumber.innerText = num_1
    operatorDisplay.innerText = operation
    secondNumber.innerText = ''
    num_2 = ''
  }else{
    num_1 = num_2
    num_2 = ''
    firstNumber.innerText = secondNumber.innerText
    operatorDisplay.innerText = operation
    secondNumber.innerText = ''
  }
}))

equalsButton.addEventListener('click', ()=>{
  
  if(num_1 === '' || num_2 === '' || operation === ''){return}
  if(num_2 === '0' && operation === '/'){
    secondNumber.innerText = ''
    operatorDisplay.innerText = ''
    num_1 = ''
    num_2 = ''
    return firstNumber.innerText = `You cant do that! Please click clear!`
  }

  calculate()
})

clearButton.addEventListener('click', clearDisplay)
backspaceButton.addEventListener('click', backSpace)

window.addEventListener('keydown', (e)=>{
  console.log(e.key)
  const equals = document.querySelector('.equ').innerText
  const backspace = document.querySelector('.backspace').value
  const clear = document.querySelector('.clear').value
  const dotKey = document.querySelector('.dot').value
 

  if(e.key === '.'){
    if(num_1 !== '' && operation === ''){
      firstNumber.innerText = ''
      num_1 = ''
      
    }
    if(!num_2.includes('.')){
      num_2 += e.key
      secondNumber.innerText = num_2
      dotButton.disabled = true
    }else if(num_2.includes('.')){
      num_2 += dotKey
      secondNumber.innerText = num_2
      dotButton.disabled = true
     }
     

    
  } else if(!Number.isNaN(parseFloat(e.key))){
    if(num_1 !== '' && operation === ''){
      firstNumber.innerText = ''
      num_1 = ''
      
    }
    
    num_2 += e.key
    console.log(num_2)
    secondNumber.innerText = num_2
    console.log(num_2)
  } else if(e.key === '/'|| e.key === '+' || e.key === '-' || e.key === '*'){
    dotButton.disabled = false
    operation = e.key
    console.log(operation)
    if(num_2 === ''){
      firstNumber.innerText = num_1
      operatorDisplay.innerText = operation
    }else if(num_1 != '' && num_2 != '' && operation != ''){
      result = operate(num_1, num_2, operation)
    num_1 = Math.round((result + Number.EPSILON) * 100) / 100
    firstNumber.innerText = num_1
    operatorDisplay.innerText = operation
    secondNumber.innerText = ''
    num_2 = ''
    operation = ''
    }else{
      num_1 = num_2
      num_2 = ''
      firstNumber.innerText = secondNumber.innerText
      operatorDisplay.innerText = operation
      secondNumber.innerText = ''
    }
    }else if(equals === e.key){
      
      if(num_1 === '' || num_2 === '' || operation === ''){return}
      if(num_2 === '0' && operation === '/'){
       secondNumber.innerText = ''
        operatorDisplay.innerText = ''
        num_1 = ''
        num_2 = ''
        return firstNumber.innerText = `You cant do that! Please click clear!`
  }
  
  calculate()

  }else if(backspace === e.key){
    backSpace()
    
  }else if(clear === e.key){
    clearDisplay()
  }

  
})

