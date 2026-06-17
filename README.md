# Protótipo de alta fidelidade: matrícula online SIGAA

## Contexto da atividade

Este projeto foi desenvolvido para a atividade de Proposta de Melhoria de Interface e Experiência do Usuário, para composição da n2 da disciplina de Experiência do Usuário de Software, ministrada pelo professor Nivaldo Pereira de Morais Junior, no Instituto de Informática da Universidade Federal de Goiás (INF UFG) no semestre de 2026.1. A proposta consiste em identificar uma solução de software que não atenda aos critérios de qualidade de interface e experiência do usuário discutidos em sala, e a partir dela criar um protótipo de alta fidelidade com uma nova interface que atenda a esses critérios.

A solução escolhida foi o SIGAA, especificamente o fluxo de realização de matrícula online, mapeado previamente por meio de diagramas BPMN e de um mapa de empatia do usuário discente. Disponíveis em `docs/`.

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

Acesse o endereço exibido no terminal, normalmente `http://localhost:5173`. As credenciais de acesso mockadas estão indicadas na própria tela de login.

## Limitações conhecidas

Por se tratar de um protótipo focado na interface e na experiência do usuário, as seguintes simplificações foram conscientemente adotadas e não foram resolvidas:

### Identificadores de turma sem validação cruzada

Existe a possibilidade teórica de colisão de identificadores entre as três fontes de dados mockadas (disciplinas do curso, equivalentes e núcleo livre). Em um sistema real, essa validação de unicidade seria responsabilidade do backend ao gerar os identificadores das turmas, e não da camada de interface.

### Resultado da matrícula não persistido

O resultado final da matrícula (disciplinas deferidas ou indeferidas) é calculado localmente na tela de resultado e não é persistido em um estado central nem em armazenamento permanente. Isso significa que, se o protótipo for recarregado após a exibição do resultado, um novo sorteio seria gerado. Em um sistema real, esse resultado viria de um processamento de backend e seria armazenado de forma definitiva.

Nenhuma das duas limitações compromete a demonstração do fluxo de interface proposto, que é o objetivo central desta entrega.