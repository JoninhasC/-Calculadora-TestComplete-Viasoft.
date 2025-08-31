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