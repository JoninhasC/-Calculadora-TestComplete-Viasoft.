# 📌 Automatização das 4 operações matemáticas por meio do TestComplete.

Projeto desenvolvido para automação de testes da **Calculadora do Windows** utilizando **TestComplete** com **JavaScript** e cenários **BDD (Gherkin)**. Se tudo Estiver configurado apertar F5 roda todos os testes

---

## ⚙️ Tecnologias Utilizadas
- **TestComplete** (automação de testes desktop)
- **JavaScript** (linguagem dos scripts)
- **BDD (Behavior Driven Development)** com Gherkin
- **Object Spy / Object Browser** (mapeamento de elementos visuais da calculadora)
- **Aliases / Name Mapping** (facilitar reconhecimento de componentes)

---

## 📖 Funcionalidades Automatizadas
Foram criados cenários BDD para as 4 operações básicas da calculadora:
- ➕ Adição
- ➖ Subtração
- ✖️ Multiplicação
- ➗ Divisão

---

## 📂 Estrutura do Projeto

```tree
Calculadora-TestComplete-Viasoft/
├── Script/              # Scripts em JavaScript
   └── CalculadoraScripts            # Scripts para realização dos calculos
   └── CalculadoraUtils              # Funções de abertura da calculadora, click de botões, validações. 
   └── EventsHooks                   # Manipulação de eventos
   └──  Steps                        # Mapeamento dos passos Gherkin
├── Scenarios/             # Cenários BDD escritos em Gherkin
├── NameMappping/          # Mapeamento de objetos da Calculadora
├── TestedApps/            # Caminho da calculadora
├── IA_DOCUMENTACAO.md     # Registro do uso de IA
└── README.md              # Documentação principal
```

## 🚀 Como Executar o Projeto

1. **Instalar o TestComplete**  
   - Certifique-se de que o **TestComplete 15** está instalado e configurado.  

2. **Pré-requisitos**  
   - O projeto foi desenvolvido e testado utilizando o **TestComplete 15**.  
   - É necessário ter o aplicativo **Calculadora do Windows** disponível (padrão do Windows 10/11).  
   - Certifique-se de que o aplicativo pode ser aberto via menu **Iniciar**.  

3. **Abrir o Projeto**  
   - Clone este repositório no seu computador:  
     ```bash
     git clone https://github.com/JoninhasC/Calculadora-TestComplete-Viasoft.git
     ```  
   - Abra o projeto no **TestComplete 15**.  

4. **Executar os Testes**  
   - Utilize a aba **BDD Scenarios** para rodar os cenários escritos em **Gherkin**.  
   - Ou utilize os **scripts JavaScript** para execução direta.  
   - Verifique se o **TestComplete** consegue identificar os elementos da interface da Calculadora  
     (se necessário, ative a opção **UI Automation**).  

5. **Encerramento Automático**  
   - O projeto já possui **hooks** configurados para abrir e fechar a Calculadora automaticamente  
     no início e fim dos testes.  

---

## ✅ Checklist de Entrega

| Item                                      | Status |
|-------------------------------------------|--------|
| Cenários Gherkin criados para as 4 operações | ✅ |
| TestComplete instalado e configurado      | ✅ |
| Scripts automatizados prontos             | ✅ |
| Projeto publicado em repositório público  | ✅ |
| Documentação de uso de IA registrada      | ✅ |

---
## 🚧 Principais Desafios no Desenvolvimento

**Durante o desenvolvimento do projeto, enfrentei algumas dificuldades:**

 - Configuração do TestComplete com a Calculadora do Windows: A aplicação não era reconhecida corretamente pelo TestComplete, impossibilitando o reconhecimento de componentes da interface (UI) e a execução de testes automatizados. Para contornar, precisei utilizar o PC de um terceiro onde a ferramenta funcionava.
 - Aprendizado de linguagem: Apesar de não ter conhecimento prévio em JavaScript, consegui aprendê-la rapidamente, aproveitando semelhanças com a linguagem C.
 - Padronização de QA: Entender e aplicar padrões de projetos de Quality Assurance também exigiu dedicação, mas foi uma experiência enriquecedora.
   
Esses desafios fortaleceram minhas habilidades em testes automatizados, **desenvolvimento em QA e resolução de problemas técnicos**.

## 👨‍💻 Autor
Projeto desenvolvido como parte do desafio proposto pela **Viasoft**.  
