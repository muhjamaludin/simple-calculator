const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false
}

function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber
}

function clearCalculator() {
  calculator.displayNumber = '0'
  calculator.operator = null
  calculator.firstNumber = null
  calculator.waitingForSecondNumber = false
}

function inputDigit(digit) {
  if (calculator.displayNumber === '0') {
    calculator.displayNumber = digit
  } else {
    calculator.displayNumber += digit
  }
}

function inverseNumber() {
  if (calculator.displayNumber === '0') {
    return
  }
  calculator.displayNumber = calculator.displayNumber * -1
}

function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert('Anda belum menetapkan operator')
    return
  }

  let result = 0
  if (calculator.operator === "x") {
    result = parseFloat(calculator.firstNumber) * parseFloat(calculator.displayNumber)
  } else if (calculator.operator === "-") {
    result = parseFloat(calculator.firstNumber) - parseFloat(calculator.displayNumber)
  } else if (calculator.operator === "+") {
    result = parseFloat(calculator.firstNumber) + parseFloat(calculator.displayNumber)
  } else if (calculator.operator === "^") {
    result = Math.pow(parseFloat(calculator.firstNumber),parseFloat(calculator.displayNumber))
  } else {
    result = parseFloat(calculator.firstNumber) / parseFloat(calculator.displayNumber)
  }

  //sent argumen putHistory
  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    resutl: result
  }

  putHistory(history)
  calculator.displayNumber = result
  renderHistory()
}

function inputDigit(digit) {
  if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
    calculator.displayNumber = digit
  } else {
    if (calculator.displayNumber === '0') {
      calculator.displayNumber = digit
    } else {
      calculator.displayNumber += digit
    }
  }
}

function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator
    calculator.waitingForSecondNumber = true
    calculator.firstNumber = calculator.displayNumber
  } else {
    alert('Kosongkan layar Ya!')
  }
}

function percentOperator() {
  if (calculator.displayNumber === '%') {
    return
  }
  calculator.displayNumber = calculator.displayNumber / 100
}

const buttons = document.querySelectorAll(".button")
for (let button of buttons) {
  button.addEventListener("click", function(event) {
    const target = event.target

    if(target.classList.contains('clear')) {
      clearCalculator()
      updateDisplay()
      return // menghentikan event handler, kode dibawah tidak dieksekusi
    }

    if(target.classList.contains('negative')) {
      inverseNumber()
      updateDisplay()
      return
    }

    if(target.classList.contains('percent')) {
      percentOperator()
      updateDisplay()
      return
    }

    if(target.classList.contains('equals')) {
      performCalculation()
      updateDisplay()
      return
    }

    if(target.classList.contains('operator')) {
      handleOperator(target.innerText)
      updateDisplay()
      return
    }

    inputDigit(target.innerText)
    updateDisplay()
  })
}
