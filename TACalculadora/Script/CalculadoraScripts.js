var calculadoraUtils = require("CalculadoraUtils");

var { openCalculator, clickBut, calculate, checkResult } = calculadoraUtils;

function sum(){
  openCalculator();
  Log.AppendFolder("Test: Sum");
  calculate("140+450=590");
  aqUtils.Delay(300);
  calculate("12+13=25");
  aqUtils.Delay(300);
  Log.PopLogFolder();
}

function subtraction(){
  openCalculator();
  Log.AppendFolder("Test: Subtraction");
  calculate("15-6=9");
  aqUtils.Delay(300);
  calculate("18-28=-10");
  aqUtils.Delay(300);
  Log.PopLogFolder();
}

function multiplication(){
  openCalculator();
  Log.AppendFolder("Test: Multiplication");
  calculate("178*124=22.072"); 
  aqUtils.Delay(300);
  calculate("12*0=0");
  aqUtils.Delay(300);
  calculate("12*11,5=138");
  aqUtils.Delay(300);
  Log.PopLogFolder();
}

function division(){
  openCalculator();
  Log.AppendFolder("Test: Division");
  calculate("15/5=3");
  aqUtils.Delay(300);
  calculate("5/5=1");
  aqUtils.Delay(300);
  Log.PopLogFolder();
}
function percentage(){
  openCalculator();
  Log.AppendFolder("Test:Percentage");
  calculate("200+10%=220"); 
  aqUtils.Delay(300);
  calculate("50%5=2,5"); 
  aqUtils.Delay(300);
  calculate("300*10%=30"); 
  aqUtils.Delay(300);
  Log.PopLogFolder();
}
function squareRoot(){
  openCalculator();
  Log.AppendFolder("Test:Square Root");
  calculate("√9=3");
  aqUtils.Delay(300);
  calculate("√25=5");
  aqUtils.Delay(300);
  Log.PopLogFolder();
}
function divisionByZero(){
  openCalculator();
  Log.AppendFolder("Test: Division By Zero");
  calculate("178/0=Não é possível dividir por zero"); 
  aqUtils.Delay(300);
  calculate("78/0=Não é possível dividir por zero"); 
  aqUtils.Delay(300);
  calculate("18/0=Não é possível dividir por zero"); 
  aqUtils.Delay(300);
  Log.PopLogFolder();
}


function Test (){
  sum();
  subtraction();
  multiplication();
  division();
  percentage();
  squareRoot();
  divisionByZero();
}

module.exports = {
  Test
};
