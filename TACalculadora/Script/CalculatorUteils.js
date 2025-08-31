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
 * Fecha o processo da Calculadora do Windows, se ele estiver em execução.
 */
function closeCalculator() {
  // Novamente, procura pelo processo da Calculadora, esperando até 1 segundo para encontrá-lo.
  var proc = Sys.WaitProcess("Microsoft.WindowsCalculator", 1000);

  // Verifica se a propriedade 'Exists' do processo é verdadeira. Ou seja, se a calculadora ESTÁ aberta.
  if (proc.Exists) {
    // Registra a intenção de fechar a aplicação.
    Log.Message("Closing Calculator...");

    // Envia um comando para o sistema operacional para terminar (forçar o fechamento) do processo.
    proc.Terminate();

    // Etapa de sincronização crucial: espera até que a propriedade "Exists" do processo se torne 'false'.
    // Isso confirma que o processo foi realmente encerrado antes de o script continuar.
    // O timeout é de 5000ms (5 segundos).
    proc.WaitProperty("Exists", false, 1000);

    // Registra uma mensagem de confirmação no log.
    Log.Message("Calculator closed.");
  } else {
    // Se o processo não foi encontrado, significa que a calculadora já estava fechada.
    // Registra uma mensagem informativa para que não haja dúvidas no relatório de teste.
    Log.Message("The calculator was already closed.");
  }
}


/**
 * Função para simular o clique em um botão da Calculadora do Windows.
 * Ela centraliza a lógica de interação, mapeando uma string de entrada
 * (como "1", "+", "CE") para o clique no objeto de interface correspondente.
 * * @param {string} botao - O caractere ou string que representa o botão a ser clicado.
 */
 
function clickBut(botao) {
  // Cria uma nova seção (pasta) no log para organizar as mensagens relacionadas a este clique específico.
  // Facilita a depuração ao agrupar todas as ações de um clique.
  Log.AppendFolder("Click: " + botao);

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
  const numeros = calc.Teclado;            // Agrupa os botões de 0 a 9 e o separador decimal.
  const operacoes = calc.Operadores_padrao; // Agrupa os botões de operações (+, -, *, /, =).
  const controles = calc.Controles_de_exibi__o; // Agrupa os botões de controle (CE, C).
  // --- Mapeamento de Botões para Ações ---
  // Cria um "mapa" (ou dicionário) que associa a string de entrada ('botao') a uma função
  // que executa o clique no elemento de interface correspondente.
  // Essa abordagem é mais limpa, legível e eficiente do que usar uma longa sequência de 'if/else' ou um 'switch'.
  const map = {
      // Números
      "0": () => numeros.Zero.Click(),
      "1": () => numeros.Um.Click(),
      "2": () => numeros.Dois.Click(),
      "3": () => numeros.Tres.Click(),
      "4": () => numeros.Quatro.Click(),
      "5": () => numeros.Cinco.Click(),
      "6": () => numeros.Seis.Click(),
      "7": () => numeros.Sete.Click(),
      "8": () => numeros.Oito.Click(),
      "9": () => numeros.Nove.Click(),
      ",": () => numeros.Separador_decimal.Click(),

      // Operações
      "+": () => operacoes.Mais.Click(),
      "-": () => operacoes.Menos.Click(),
      "*": () => operacoes.Multiplicar_por.Click(),
      "/": () => operacoes.Dividir_por.Click(),
      "=": () => operacoes.Igual_a.Click(),

      // Controles
      "CE": () => controles.Limpar_entrada.Click(),
      "CA": () => controles.Limpar.Click()
  };

  // --- Lógica de Execução ---
  // Verifica se o 'botao' recebido pela função existe como uma chave no mapa que criamos.
  if (map[botao]) {
    // Se o botão existir no mapa, a função correspondente a ele é executada.
    // A sintaxe map[botao] acessa o valor (que é uma função), e os parênteses '()' a invocam, realizando o clique.
    map[botao](); 
    
    // Registra uma mensagem de sucesso no log, confirmando que a ação foi executada.
    Log.Message("✅ Botão pressionado: " + botao);
  } else {
    // Se o 'botao' não for encontrado nas chaves do mapa...
    // ...registra uma mensagem de erro, informando que o botão solicitado não é válido ou não foi mapeado.
    Log.Error("❌ Botão não mapeado: " + botao);
  }

  // Fecha a seção (pasta) do log que foi aberta no início da função.
  // Mantém o relatório de log limpo e bem estruturado.
  Log.PopLogFolder();
}



// exporta as funções para outros scripts do TestComplete poderem usar
module.exports = {
   openCalculator: openCalculator,
   closeCalculator:  closeCalculator,
   clickBut:  clickBut
};
