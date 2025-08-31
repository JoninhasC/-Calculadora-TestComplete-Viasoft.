/**
 * Garante que a Calculadora do Windows esteja aberta e pronta para uso.
 * Se a calculadora não estiver em execução, ela a inicia.
 * Se já estiver aberta, apenas registra uma mensagem.
 */
function openCalculator() {
  // Procura pelo processo da Calculadora ("Microsoft.WindowsCalculator") no sistema.
  // O segundo parâmetro (1000) é um timeout em milissegundos. A função espera até 1 segundo para que o processo apareça.
  var proc = Sys.WaitProcess("Microsoft.WindowsCalculator", 1000);

  // Verifica se a propriedade 'Exists' do processo é falsa. Ou seja, se a calculadora NÃO está aberta.
  if (!proc.Exists) {
    // Se não estiver aberta, registra uma mensagem informando que será iniciada.
    Log.Message("Calculator initializing...");

    // Executa a aplicação configurada como "calc" no módulo "TestedApps" do projeto de teste.
    // Esta é a maneira padrão de iniciar uma aplicação sob teste.
    TestedApps.calc.Run();

    // Bloco de sincronização para garantir que a aplicação carregou antes de continuar.
    try {
      // Espera até que a propriedade "Exists" do objeto principal da janela da calculadora se torne 'true'.
      // Isso garante que a janela não apenas foi criada, mas também foi reconhecida pela ferramenta de automação.
      // O timeout é de 5000ms (5 segundos).
      Aliases.Microsoft_WindowsCalculator.WaitProperty("Exists", true, 5000);
    } catch (e) {
      // Bloco de captura de erro. Ele é executado se o 'try' falhar.
      // Isso pode acontecer se o objeto 'Aliases.Microsoft_WindowsCalculator' ainda não foi mapeado no projeto.
      // Como um plano B, usamos um atraso fixo para dar tempo à aplicação para carregar.
      aqUtils.Delay(800);
    }

    // Adiciona um pequeno atraso adicional para garantir que a interface gráfica esteja totalmente estável e responsiva.
    aqUtils.Delay(300);

  } else {
    // Se o processo da calculadora já existia, simplesmente registra uma mensagem informativa.
    Log.Message("Calculator is already open.");
  }
}

/**
 * Função para simular o clique em um botão da Calculadora do Windows.
 * Ela centraliza a lógica de interação, mapeando uma string de entrada
 * (como "1", "+", "CE") para o clique no objeto de interface correspondente.
 * * @param {string} botao - O caractere ou string que representa o botão a ser clicado.
 */
 
function clickBut(button) {
  // Cria uma nova seção (pasta) no log para organizar as mensagens relacionadas a este clique específico.
  // Facilita a depuração ao agrupar todas as ações de um clique.
  Log.AppendFolder("Click: " + button);

  // --- Atalhos para os objetos da interface ---
  // Define um atalho para o objeto principal da calculadora, que contém todos os outros elementos.
  // Isso evita ter que escrever o caminho completo ("Aliases.Microsoft_WindowsCalculator...") repetidamente.
  const calc = Aliases.Microsoft_WindowsCalculator.Calculadora.NavView.LandmarkTarget;
  
  if(!calc.Exists){
    Log.Error("not found");
    Log.PopLogFolder();
    return;
  }
  // Cria atalhos para os principais grupos de botões dentro da calculadora.
  const numbers = calc.Teclado;            // Agrupa os botões de 0 a 9 e o separador decimal.
  const operations = calc.Operadores_padrao; // Agrupa os botões de operações (+, -, *, /, =).
  const controls = calc.Controles; // Agrupa os botões de controle (CE, C).
  // --- Mapeamento de Botões para Ações ---
  // Cria um "mapa" (ou dicionário) que associa a string de entrada ('botao') a uma função
  // que executa o clique no elemento de interface correspondente.
  // Essa abordagem é mais limpa, legível e eficiente do que usar uma longa sequência de 'if/else' ou um 'switch'.
  const map = {
      // Números
      "0": () => numbers.Zero.Click(),
      "1": () => numbers.Um.Click(),
      "2": () => numbers.Dois.Click(),
      "3": () => numbers.Tres.Click(),
      "4": () => numbers.Quatro.Click(),
      "5": () => numbers.Cinco.Click(),
      "6": () => numbers.Seis.Click(),
      "7": () => numbers.Sete.Click(),
      "8": () => numbers.Oito.Click(),
      "9": () => numbers.Nove.Click(),
      ",": () => numbers.Separador_decimal.Click(),

      // Operações
      "+": () => operations.Mais.Click(),
      "-": () => operations.Menos.Click(),
      "*": () => operations.Multiplicar_por.Click(),
      "/": () => operations.Dividir_por.Click(),
      "=": () => operations.Igual_a.Click(),
      "√": () => operations.Raiz_quadrada.Click(),
      "%": () => operations.Por_cento.Click(),

      // Controles
      "CE": () => controls.Limpar_entrada.Click(),
      "C": () => controls.Limpar.Click()
  };

  // --- Lógica de Execução ---
  // Verifica se o 'botao' recebido pela função existe como uma chave no mapa que criamos.
  if (map[button]) {
    // Se o botão existir no mapa, a função correspondente a ele é executada.
    // A sintaxe map[botao] acessa o valor (que é uma função), e os parênteses '()' a invocam, realizando o clique.
    map[button](); 
    
    // Registra uma mensagem de sucesso no log, confirmando que a ação foi executada.
    Log.Message("✅ Press button: " + button);
  } else {
    // Se o 'botao' não for encontrado nas chaves do mapa...
    // ...registra uma mensagem de erro, informando que o botão solicitado não é válido ou não foi mapeado.
    Log.Error("❌Button not mapped: " + button);
  }

  // Fecha a seção (pasta) do log que foi aberta no início da função.
  // Mantém o relatório de log limpo e bem estruturado.
  Log.PopLogFolder();
}

/**
 * Compara um resultado esperado com o valor atualmente exibido no display da calculadora.
 * Registra uma mensagem de sucesso ou erro no log de teste com base na comparação.
 * Esta é uma função de "asserção" ou "verificação", fundamental em testes automatizados.
 *
 * @param {string} resultExpected - O valor (em formato de texto) que se espera encontrar no display da calculadora.
 */
function checkResult(resultExpected) {
  // --- Obtenção do Resultado Atual ---

  // Navega pela árvore de objetos da interface da calculadora para encontrar o elemento do display.
  // ".UIAObject("A_exibição_é_*")" é um localizador que usa a automação de interface do usuário (UIA)
  // para encontrar um objeto cujo nome começa com "A exibição é ". O asterisco (*) é um curinga.
  // Isso torna o localizador mais robusto a pequenas mudanças no texto de acessibilidade.
  const resultObtained = Aliases.Microsoft_WindowsCalculator
    .Calculadora.NavView.LandmarkTarget
    .UIAObject("A_exibição_é_*")
    .UIAObject("TextContainer")
    .UIAObject("NormalOutput")
    .Text // Pega o conteúdo de texto do elemento (ex: "1.234")
    .trim(); // Remove espaços em branco no início ou no fim da string, garantindo uma comparação precisa.

  // --- Comparação e Log ---

  // Compara o valor esperado (passado como argumento para a função) com o valor obtido da tela.
  if (resultExpected == resultObtained) {
    // Se os valores forem iguais, o teste passou nesta verificação.
    // Registra uma mensagem de sucesso clara no log.
    Log.Message("✅ SUCESSO: O resultado '" + resultObtained + "' está correto.");
  } else {
    // Se os valores forem diferentes, o teste falhou nesta verificação.
    // Registra uma mensagem de erro detalhada. É uma boa prática mostrar tanto o valor
    // esperado quanto o obtido para facilitar a identificação e correção do problema.
    Log.Error("❌ Fail Esperado: '" + resultExpected + "' | Obtido: '" + resultObtained + "'");
  }
}

/**
 * Executa uma expressão matemática completa e verifica o resultado.
 * A função recebe uma string no formato "OPERAÇÃO=RESULTADO" (ex: "12+8=20"),
 * simula os cliques dos botões da operação e, ao final, valida se o resultado
 * exibido na calculadora corresponde ao resultado esperado.
 *
 * @param {string} expression - A expressão completa a ser testada.
 */
function calculate(expression) {
  
  // Divide a string de entrada em duas partes usando o "=" como separador.
  // Ex: "12+8=20" se torna o array ['12+8', '20'].
  // Em seguida, usa "atribuição via desestruturação" para criar duas variáveis:
  // 'operations' recebe '12+8'
  // 'resultExpected' recebe '20'
  let [operations, resultExpected] = expression.split("=");


  // Clica no botão "CE" (Limpar Entrada) para garantir que a calculadora
  // esteja zerada antes de iniciar uma nova operação. Isso evita que
  // cálculos anteriores interfiram no teste atual.
  clickBut("CE");


  // Itera sobre cada caractere da string 'operations'.
  // Ex: Para '12+8', o loop executará 4 vezes.
  for (let i = 0; i < operations.length; i++) {
    // Para cada caractere ('1', '2', '+', '8'), chama a função 'clickBut'.
    // Isso simula um usuário pressionando cada botão na calculadora em sequência.
    clickBut(operations[i]);
  }
  
  clickBut("=");

 
  // Após inserir a operação e obter o resultado, chama a função 'checkResult'.
  // Ela irá comparar o que está no display da calculadora com o 'resultExpected'
  // que foi extraído da string de expressão no início.
  checkResult(resultExpected);
}

// exporta as funções para outros scripts do TestComplete poderem usar
module.exports = {
   openCalculator: openCalculator,
   clickBut: clickBut,
   checkResult: checkResult,
   calculate: calculate
};