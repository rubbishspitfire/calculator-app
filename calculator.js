let sum = '0';
let formula;

//selects every button and adds an eventhandler
let buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('click', () => calculator(button.innerHTML));
});

//the main function of the calculator
function calculator(input) {
  if (sum === '0') {
    //number clicked sum is '0' sum and formula are same as input
    if (isFinite(input)) {
      sum = input;
      formula = input;
    }
    //. clicked and sum is '0' => '0.'
    if (input === '.') {
      sum = sum + '.';
      formula = '0' + '.';
    }
    //displays the new sum in the screen
    document.getElementById('screen').innerHTML = sum;
  } else {
    //when a number or operant is clicked, after first num is set
    if (isFinite(input) || input === '+' || input === '-' || input === '.') {
      sum = sum + input;
      formula = formula + input;
    }
    //'x' is clicked add 'x' to sum '*' to formula
    if (input === 'x') {
      sum = sum + 'x';
      formula = formula + '*';
    }
    //'÷' clicked add '÷' to sum '/' to formula
    if (input === '÷') {
      sum = sum + '÷';
      formula = formula + '/';
    }
    //makes a percentage of last number
    if (input === '%') {
      //gets the last index of operator in formula string and adds 1 to it
      let numIndex = operatorSearch() + 1;
      //if numIndex value = 1 => there is no operator calculate the hole number in formula and sum
      if (numIndex === 1) {
        formula = formula / 100;
        sum = sum / 100;
      }
      //else cut there first part of the string and add the new calulated percentage
      else {
        let percentage = formula.slice(numIndex) / 100;
        formula = formula.slice(0, numIndex) + percentage;
        sum = sum.slice(0, numIndex) + percentage;
      }
    }
    //makes a negative number of a positieve one
    if (input === '+/-') {
      //gets index of last operator in formula string and adds 1 to it
      let numIndex = operatorSearch() + 1;
      //saves the last part of the formula string
      let endPart = formula.slice(numIndex);
      //if numIndex = 1 => there is no operator, add '-' at the begining of formula and sum string
      if (numIndex === 1) {
        formula = '(-' + formula + ')';
        sum = '(-' + sum + ')';
      }
      //add '-' between the first and last part of formula and sum string
      else {
        formula = formula.slice(0, numIndex) + '(-' + endPart + ')';
        sum = sum.slice(0, numIndex) + '(-' + endPart + ')';
      }
    }
    //'c' clicked remove all
    if (input === 'c') {
      sum = '0';
      formula = '0';
    }
    //displays the new sum in the screen
    document.getElementById('screen').innerHTML = sum;
  }

  //calculates the formula and displays it
  if (input === '=') {
    try {
      let answer = eval(formula);
      sum = answer.toString();
      formula = answer.toString();
      document.getElementById('screen').innerHTML = sum;
    } catch (e) {
      //let people know if the calculation went wrong
      if (e instanceof SyntaxError) {
        document.getElementById('screen').innerHTML = 'Error';
      }
    }
  }
}

//helper function => will search for last operator in formula string
function operatorSearch() {
  const operatorArr = ['-', '+', '/', '*'];
  let lastOperator = 0;
  //loops through operator array, when new index is larger then previous? => lastoperator = new index
  for (let index = 0; index < operatorArr.length; index++) {
    let search = formula.lastIndexOf(operatorArr[index]);
    if (search >= lastOperator) {
      lastOperator = search;
    }
  }
  return lastOperator;
}