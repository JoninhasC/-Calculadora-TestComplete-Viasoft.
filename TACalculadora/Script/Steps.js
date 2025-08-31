/**
 * Este arquivo contém as implementações (definições de passos) para os testes de aceitação
 * da Calculadora, escritos no formato Gherkin (Given/When/Then).
 * Ele conecta as frases legíveis por humanos dos arquivos .feature com as funções de
 * automação correspondentes.
 */

// --- IMPORTAÇÃO DE MÓDULOS ---
// Importa funções específicas do nosso módulo de utilidades da Calculadora.
// A sintaxe com chaves {} é chamada de "desestruturação" e permite importar apenas o que é necessário.
var { openCalculator, clickBut, checkResult } = require("CalculadoraUtils");

// Importa a função de fechar a calculadora de um módulo separado,
// possivelmente para manter os "hooks" de eventos (como setup/teardown) organizados.
var { closeCalculator } = require("EventsHooks");

// Declara uma variável no escopo do módulo para armazenar o resultado esperado.
// Isso permite que um passo "Then" acesse informações definidas em um passo anterior.
let resultExpected = "";


// --- DEFINIÇÕES DOS PASSOS (STEP DEFINITIONS) ---

/**
 * GIVEN: Define o estado inicial ou o pré-requisito do teste.
 * Implementa o passo "Dado que o usuário abre a calculadora".
 */
Given("that the user opens the calculator", function () {
  // Chama a função importada para garantir que a aplicação da calculadora esteja aberta e pronta.
  openCalculator();
});

/**
 * WHEN: Define uma ação ou interação do usuário com o sistema.
 * Implementa o passo "Quando o usuário digita '...'".
 * O {string} no Gherkin captura o valor e o passa como argumento para a função.
 */
When("the user types {string}", function (number) {
  // Pega a string de número (ex: "123"), divide em um array de caracteres (['1', '2', '3'])
  // e itera sobre ele, chamando a função clickBut para cada caractere.
  number.split("").forEach(ch => clickBut(ch));
});

/**
 * WHEN: Define outra ação do usuário.
 * Implementa o passo "Quando o usuário pressiona '...'".
 * Este passo é usado para cliques únicos, como operadores (+, -, =) ou funções (CE).
 */
When("o usuário pressiona {string}", function (button) {
  // Chama a função clickBut passando diretamente o botão capturado do arquivo .feature.
  clickBut(button);
});

/**
 * THEN: Define uma verificação ou um resultado esperado.
 * Implementa o passo "Então o resultado deve ser '...'".
 */
Then("o resultado deve ser {string}", function (result) {
  // Armazena o resultado esperado (capturado do .feature) na variável do módulo.
  resultExpected = result;
  // Chama a função de verificação, que irá comparar o que está na tela da calculadora
  // com o resultado esperado que acabamos de armazenar.
  checkResult(resultExpected);
});

/**
 * THEN: Pode também ser usado para definir passos de limpeza (teardown) no final de um cenário.
 * Implementa o passo "Então o usuário fecha a calculadora".
 */
Then("the user closes the calculator", function () {
  // Chama a função para fechar o processo da calculadora, deixando o ambiente
  // limpo para o próximo teste.
  closeCalculator();
});