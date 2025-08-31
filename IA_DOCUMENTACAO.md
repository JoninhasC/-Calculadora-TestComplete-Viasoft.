# 🤖 Documentação de Uso de Inteligência Artificial, Referências e Materiais de Apoio

## FERRAMENTA: Gemini 
- VERSÃO: Gemini 2.5 pro
- PROMPT:
```tree
 "[Imagem da estrutura do Mapping] , trascreva "
```
- RESULTADO:
```bash
  [Claro, aqui está a transcrição da estrutura de árvore da imagem: Microsoft_WindowsCalculator, Calculadora, NavView, LandmarkTarget, Abrir_submenu_de_hist_rico, Controles_de_exibi__o, Backspace, Limpar, Limpar_entrada, Por_cento, Controles_de_mem_ria, Abrir_submenu_de_mem_ria, Adi__o_de_mem_ria, Armazenamento_de_mem_ria, Limpar_toda_a_mem_ria, Rechamada_de_mem_ria, Subtra__o_de_mem_ria, Fun__es_padr__o, Quadrado, Raiz_quadrada, Rec_proco, Operadores_padr__o, Dividir_por, Igual_a, Mais, Menos, Multiplicar_por, Positivo_negativo, TextBlock, Teclado, Cinco, Dois, Nove, Oito, Quatro, Seis, Separador_decimal, Sete, Tres, Um, Zero, Manter_na_parte_superior]
```

## FERRAMENTA: Gemini 
- VERSÃO: Gemini 2.5 pro
- PROMPT:
```bash
Quero que você analise o código abaixo, que contém funções de teste automatizado para uma calculadora (usando TestComplete e JavaScript).
O código abre a calculadora, executa operações matemáticas (soma, subtração, multiplicação, divisão e divisão por zero) com números aleatórios e valida o resultado esperado.
Com base nesse código, gere cenários BDD no formato Gherkin seguindo o padrão do TestComplete:
Feature: Descrição da funcionalidade
  Scenario: Descrição do cenário
    Given [pré-condição]
    When [ação executada]
    Then [validação do resultado]
Regras para a geração:
  Criar uma Feature que descreva a funcionalidade geral (testes da calculadora).
   Criar um Scenario separado para cada operação (soma, subtração, multiplicação, divisão e divisão por zero).
  Usar linguagem clara e objetiva.
  Manter o formato Given / When / Then.
  Incluir no Given que a calculadora está aberta.
  No When, descrever a operação realizada.
  No Then, descrever a validação do resultado esperado.
Código para referência:
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
```

- RESULTADO:
```bash
   #language: pt
Funcionalidade: Calculadora - Operações Aritméticas Básicas

  Como um usuário da calculadora
  Eu quero realizar operações matemáticas básicas
  Para obter resultados corretos e confiáveis

Cenário: Realizar uma soma com números inteiros
  Dado que a calculadora está aberta
  Quando o usuário calcula a expressão "125+75"
  Então o resultado deve ser "200"
  E o usuário calcula a expressão "99+1"
  Então o resultado deve ser "100"

Cenário: Realizar uma subtração com números inteiros
  Dado que a calculadora está aberta
  Quando o usuário calcula a expressão "100-25"
  Então o resultado deve ser "75"
  E o usuário calcula a expressão "50-90"
  Então o resultado deve ser "-40"

Cenário: Realizar uma multiplicação com números inteiros
  Dado que a calculadora está aberta
  Quando o usuário calcula a expressão "10*10"
  Então o resultado deve ser "100"
  E o usuário calcula a expressão "15*0"
  Então o resultado deve ser "0"

Cenário: Realizar uma divisão
  Dado que a calculadora está aberta
  Quando o usuário calcula a expressão "100/4"
  Então o resultado deve ser "25"
  E o usuário calcula a expressão "8/5"
  Então o resultado deve ser "1,6" # Usando vírgula para corresponder à saída da calculadora em português

Cenário: Tentar dividir um número por zero
  Dado que a calculadora está aberta
  Quando o usuário calcula a expressão "25/0"
  Então a calculadora deve exibir a mensagem "Não é possível dividir por zero"
  E o usuário calcula a expressão "0/0"
  Então a calculadora deve exibir a mensagem "Resultado indefinido" # A mensagem pode variar, ajuste se necessário
```
   
## FERRAMENTA: Gemini 
- VERSÃO: Gemini 2.5 pro
- PROMPT:
```bash
Quero que você analise o seguinte problema, Estou testando uma calculadora automatizada. O teste compara o resultado esperado com o resultado obtido. O esperado está no formato americano (8.3), mas o obtido vem no formato brasileiro (8,3). Isso causa falha no teste, mesmo quando o valor é correto.
Exemplo de erro: ❌ Fail Esperado: '8.3' Obtido: '8,3, também pode ocorrer com números maiores, como: ❌ Fail Esperado:: '1234.56' Obtido: '1.234,56'.
Preciso de um código em JavaScript que:
- Normalize o número obtido do formato brasileiro para o formato padrão (ponto como separador decimal e sem separador de milhar). Compare o valor esperado e o obtido como números, não como strings. Registre no log se o teste passou ou falhou. Formato de saída esperado: Função utilitária para normalizar o número. Função de validação que use essa normalização antes de comparar.
meu codigo atualmente está assim:
function normalizeNumber(text) {
// Remove pontos usados como separador de milhar
// e substitui vírgula decimal por ponto, se necessário
return text.replace(/\./g, "").replace(",", ".");
}
function checkResult(resultExpected) {
const resultObtained = Aliases.Microsoft_WindowsCalculator
.Calculadora.NavView.LandmarkTarget
.UIAObject("A_exibição_é_*")
.UIAObject("TextContainer")
.UIAObject("NormalOutput")
.Text.trim();
// Normaliza os dois valores para garantir consistência
const normalizedExpected = normalizeNumber(resultExpected);
const normalizedObtained = normalizeNumber(resultObtained);
if (normalizedExpected === normalizedObtained) {
Log.Message("✅ SUCESSO: O resultado '" + resultObtained + "' está correto.");
} else {
Log.Error("❌ Fail Esperado: '" + resultExpected + "' | Obtido: '" + resultObtained + "'");
}
}
```
- RESULTADO:
```bash
Olá! Ótima pergunta. Você identificou um problema muito comum em testes de UI: a localização.

O seu log de erro mostra exatamente o problema:

❌ Fail Esperado: '8.3' | Obtido: '8,3'
Isso acontece porque:

Esperado (resultExpected): Seu caso de teste está escrito com o padrão de número americano/programático, usando o ponto (.) como separador decimal.

Obtido (resultObtained): A Calculadora do Windows, rodando em um sistema configurado para o Brasil, exibe o resultado no formato local, usando a vírgula (,) como separador decimal.

A comparação if ('8.3' == '8,3') sempre será falsa, pois as strings são diferentes.

Análise da Sua Solução
Sua abordagem para resolver isso com a função normalizeNumber está no caminho certo. A ideia de converter ambos os valores para um formato padrão antes de comparar é a melhor prática.

Vamos analisar o que suas funções fazem agora:

JavaScript

/**
 * Converte uma string numérica para um formato padronizado (sem separador de milhar e com ponto decimal).
 * O objetivo é permitir a comparação de números que vêm de fontes com formatações diferentes.
 * @param {string} text - A string numérica a ser normalizada (ex: "1.234,56" ou "8.3").
 * @returns {string} A string no formato padronizado (ex: "1234.56" ou "8.3").
 */
function normalizeNumber(text) {
  // 1. Remove todos os pontos (.) da string. A intenção é remover separadores de milhar (ex: "1.234" -> "1234").
  // 2. Substitui a vírgula (,) por um ponto (.). A intenção é padronizar o separador decimal.
  return text.replace(/\./g, "").replace(",", ".");
}

/**
 * Compara um resultado esperado com o valor exibido na calculadora,
 * tratando diferenças de formatação de números (ponto vs. vírgula).
 * @param {string} resultExpected - O valor esperado, vindo do caso de teste (ex: "8.3").
 */
function checkResult(resultExpected) {
  // Obtém o resultado bruto da tela da calculadora (ex: "8,3").
  const resultObtained = Aliases.Microsoft_WindowsCalculator
    .Calculadora.NavView.LandmarkTarget
    .UIAObject("A_exibição_é_*")
    .UIAObject("TextContainer")
    .UIAObject("NormalOutput")
    .Text.trim();

  // --- Normalização ---
  // Aplica a função de normalização em ambos os valores.
  const normalizedExpected = normalizeNumber(resultExpected); // ex: normalizeNumber("8.3")
  const normalizedObtained = normalizeNumber(resultObtained); // ex: normalizeNumber("8,3")

  // Compara as duas strings JÁ NORMALIZADAS.
  if (normalizedExpected === normalizedObtained) {
    Log.Message("✅ SUCESSO: O resultado '" + resultObtained + "' está correto.");
  } else {
    // O erro acontece aqui. O log mostra a falha antes da normalização.
    // Para depuração, seria útil logar os valores normalizados também.
    Log.Error("❌ Fail Esperado: '" + resultExpected + "' | Obtido: '" + resultObtained + "'");
  }
}
O Problema Sutil na sua Lógica
A sua função normalizeNumber tem um pequeno efeito colateral que faz o teste continuar falhando. Vamos analisar o que acontece com os valores do seu log:

resultExpected = "8.3"

normalizeNumber("8.3")

.replace(/\./g, "") transforma "8.3" em "83" (remove o ponto).

.replace(",", ".") não faz nada.

Resultado: normalizedExpected se torna "83".

resultObtained = "8,3"

normalizeNumber("8,3")

.replace(/\./g, "") não faz nada.

.replace(",", ".") transforma "8,3" em "8.3".

Resultado: normalizedObtained se torna "8.3".

A comparação final será if ("83" === "8.3"), o que é falso.

A Correção
O problema é que replace(/\./g, "") é muito agressivo e remove o ponto decimal do seu resultExpected. Uma solução mais segura é aplicar lógicas de normalização diferentes ou, mais simples, ajustar a função para que ela não remova o ponto que já é um decimal.

A forma mais simples e eficaz de corrigir, considerando que seu resultExpected já está no formato desejado, é normalizar apenas o valor obtido da tela.

Versão Corrigida e Comentada:

JavaScript

// A função de normalização agora só precisa tratar o formato brasileiro (com vírgula).
function normalizeNumberForComparison(textFromScreen) {
  // Apenas substitui a vírgula decimal pela notação de ponto.
  // Também removemos os pontos de milhar, que a calculadora pode exibir para números grandes.
  return textFromScreen.replace(/\./g, "").replace(",", ".");
}

function checkResult(resultExpected) {
  // 1. Obtém o resultado bruto da tela (ex: "1.234,56" ou "8,3")
  const resultObtained = Aliases.Microsoft_WindowsCalculator
    .Calculadora.NavView.LandmarkTarget
    .UIAObject("A_exibição_é_*")
    .UIAObject("TextContainer")
    .UIAObject("NormalOutput")
    .Text.trim();

  // 2. Normaliza APENAS o resultado obtido da tela para o formato padrão.
  const normalizedObtained = normalizeNumberForComparison(resultObtained);

  // 3. Compara o resultado esperado (que já está no formato padrão) com o resultado normalizado.
  if (resultExpected === normalizedObtained) {
    Log.Message("✅ SUCESSO: O resultado '" + resultObtained + "' está correto.");
  } else {
    // Para um log de erro mais informativo, podemos mostrar a comparação que falhou.
    Log.Error(
      "❌ FALHA: A comparação falhou. Esperado: '" + resultExpected + 
      "' | Obtido (normalizado): '" + normalizedObtained + 
      "' | Obtido (bruto): '" + resultObtained + "'"
    );
  }
}
```
## 📚 Referências e Materiais de Apoio

- **TestComplete 15 Documentatio**  
  (https://support.smartbear.com/testcomplete/docs)
  
- **Test Complete for Desktop Automation Learning por TechChain**
   (https://www.youtube.com/playlist?list=PLTP6ErXQT8WgiJdgYimsZtSFXmzJdh234)
  
- **TestComplete - Criando o Projeto rsmSantos_Calculadora  por RSM.SANTOS**  
  (https://www.youtube.com/watch?v=sZpqX9Ad1Jw)

- **Curso udyme -Dominando o TestComplete**  
  (https://www.udemy.com/course/dominando-o-testcomplete)

