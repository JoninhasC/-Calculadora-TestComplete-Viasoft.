var calculadoraUtils = require("CalculadoraUtils");
var { openCalculator, calculate } = calculadoraUtils;

// Função para gerar número aleatório entre min e max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função auxiliar para calcular a expressão e verificar
function doOperation(a, b, operator, expected) {
  calculate(`${a}${operator}${b}=${expected}`);
  aqUtils.Delay(300);
}

function sum() {
  openCalculator();
  Log.AppendFolder("Test: Sum");

  let a = randomInt(1, 500);
  let b = randomInt(1, 500);
  doOperation(a, b, "+", a + b);

  let c = randomInt(1, 100);
  let d = randomInt(1, 100);
  doOperation(c, d, "+", c + d);

  Log.PopLogFolder();
}

function subtraction() {
  openCalculator();
  Log.AppendFolder("Test: Subtraction");

  let a = randomInt(1, 100);
  let b = randomInt(1, 100);
  doOperation(a, b, "-", a - b);

  let c = randomInt(1, 100);
  let d = randomInt(1, 100);
  doOperation(c, d, "-", c - d);

  Log.PopLogFolder();
}

function multiplication() {
  openCalculator();
  Log.AppendFolder("Test: Multiplication");

  let a = randomInt(1, 200);
  let b = randomInt(1, 200);
  doOperation(a, b, "*", a * b);

  let c = randomInt(0, 20);
  let d = randomInt(0, 20);
  doOperation(c, d, "*", c * d);

  Log.PopLogFolder();
}

function division() {
  openCalculator();
  Log.AppendFolder("Test: Division");

  let a = randomInt(1, 100);
  let b = randomInt(1, 20); // evitar zero
  doOperation(a, b, "/", a / b);

  let c = randomInt(1, 100);
  let d = randomInt(1, 20); // evitar zero
  doOperation(c, d, "/", c / d);

  Log.PopLogFolder();
}

function divisionByZero() {
  openCalculator();
  Log.AppendFolder("Test: Division By Zero");

  // Primeiro teste com a variável 'a'
  let a = randomInt(0, 200);

  // Verifica se o numerador 'a' é zero
  if (a === 0) {
    // Se for 0/0, o resultado esperado é "Resultado indefinido"
    doOperation(a, 0, "/", "Resultado indefinido");
  } else {
    // Caso contrário, para qualquer outro número dividido por zero...
    doOperation(a, 0, "/", "Não é possível dividir por zero");
  }

  // Segundo teste com a variável 'b'
  let b = randomInt(0, 200);

  // A mesma lógica de verificação para 'b'
  if (b === 0) {
    doOperation(b, 0, "/", "Resultado indefinido");
  } else {
    doOperation(b, 0, "/", "Não é possível dividir por zero");
  }

  Log.PopLogFolder();
}

function Test() {
  sum();
  subtraction();
  multiplication();
  division();
  divisionByZero();
}

module.exports = {
  Test
};
