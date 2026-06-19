# Protótipo de alta fidelidade: matrícula online SIGAA

## Contexto da atividade

Este projeto foi desenvolvido para a atividade de Proposta de Melhoria de Interface e Experiência do Usuário, para composição da n2 da disciplina de Experiência do Usuário de Software, ministrada pelo professor Nivaldo Pereira de Morais Junior, no Instituto de Informática da Universidade Federal de Goiás (INF UFG) no semestre de 2026.1. A proposta consiste em identificar uma solução de software que não atenda aos critérios de qualidade de interface e experiência do usuário discutidos em sala, e a partir dela criar um protótipo de alta fidelidade com uma nova interface que atenda a esses critérios.

A solução escolhida foi o SIGAA, especificamente o fluxo de realização de matrícula online, mapeado previamente por meio de diagramas BPMN e de um mapa de empatia do usuário discente. Disponíveis em `docs/`.

Autor: Kelvin de Oliveira

## Critérios de UI/UX considerados

O redesenho buscou atender, ao longo de todas as telas, aos seguintes critérios discutidos durante o semestre: facilidade de aprendizado, eficiência de uso, memorabilidade, baixa taxa de erro, satisfação subjetiva, uso adequado de cor e contraste, respiro visual, proporção entre elementos, clareza, consistência e hierarquia visual.

Exemplos concretos de aplicação: indicador fixo de etapa (Etapa N de 5) para orientar o aluno sobre seu progresso no fluxo; alertas de conflito de horário e pré requisito não cumprido antes da confirmação final, reduzindo erros tardios; modais de confirmação para ações críticas, como atualização de dados e confirmação de identidade; e paleta de cores e componentes consistentes em todas as telas do fluxo.

## Jornada mapeada

```
Login
  -> Portal do discente
    -> Etapa 1: confirmação de dados cadastrais
      -> Etapa 2: seleção de turmas
        -> Etapa 3: verificação de pré requisitos e conflitos de horário
          -> (se houver pendência) volta para Etapa 2: seleção de turmas
          -> (se aprovado) Etapa 4: confirmação da matrícula
            -> Etapa 5: processamento da solicitação
              -> Resultado final por disciplina
                -> retorna ao Portal do discente
```

## Stack utilizada

O protótipo foi construído com as seguintes tecnologias:

`React` com `TypeScript`, como base da aplicação.

`Vite`, como bundler e servidor de desenvolvimento.

`Tailwind CSS`, para estilização de toda a interface.

`Radix UI` via `shadcn`, para os componentes de interface (inputs, abas, diálogos, badges).

`React Router`, para a navegação entre as telas do fluxo.

`Context API`, para centralizar o estado de turmas selecionadas durante a jornada de matrícula.

Todos os dados (aluno, turmas ofertadas, equivalentes, núcleo livre e unidades) são mockados em arquivos JSON, sem qualquer integração com backend real.

## Como clonar e rodar o protótipo

Pré requisitos: `Node.js` (versão 18 ou superior) e `npm` instalados.

Clone o repositório e entre na pasta do projeto:
```
git clone <url-do-repositorio>
cd sigaa-matricula
```

Instale as dependências:
```
npm install
```

Inicie o servidor de desenvolvimento:
```
npm run dev
```

Acesse o endereço exibido no terminal, normalmente `http://localhost:5173`.

As credenciais de acesso estão definidas em `src/mocks/aluno.json` (campo `id` como usuário) e validadas diretamente no componente `src/pages/Login/Login.tsx`, na função `onSubmit`. Para alterar o usuário, a senha ou a data de nascimento utilizados na autenticação, edite esses dois arquivos. Os demais dados do aluno (curso, período, endereço, renda per capita) também estão em `src/mocks/aluno.json` e são exibidos nas telas de portal e dados cadastrais.


## Simulação de fluxos no protótipo
 
Por se tratar de um protótipo sem backend, alguns comportamentos que em um sistema real dependeriam de processamento do servidor são simulados por meio de controles visíveis na interface. Eles estão identificados visualmente para não serem confundidos com elementos reais da futura interface.
 
### 1. Conflito de pré requisito não cumprido. 
 
Na tela da Etapa 3 (verificação de pré requisitos e conflitos de horário), há um checkbox discreto rotulado "Simular pré requisito não cumprido (teste)". Ao marcá-lo antes da verificação ser concluída, o sistema exibirá o fluxo de erro com uma disciplina indicada como pendente por pré requisito não atendido, além de qualquer conflito de horário real detectado entre as turmas selecionadas.
 
### 2. Conflito de horário real
 
O conflito de horário não precisa de simulação. Ele é calculado automaticamente a partir das turmas selecionadas na Etapa 2. Para provocá-lo, basta selecionar duas turmas cujos horários se sobreponham no mesmo dia e turno. A Etapa 3 identificará e exibirá o conflito automaticamente.
 
### 3. Divulgação do resultado da matrícula
 
Na tela da Etapa 5 (processamento da solicitação), há um botão discreto rotulado "Simular divulgação do resultado (teste)". Ao clicá-lo, o sistema sorteia o resultado de cada disciplina (deferida ou indeferida) e navega para a tela de resultado final, reproduzindo o comportamento esperado após o encerramento do período de processamento.

