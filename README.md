# Protótipo de alta fidelidade: matrícula online SIGAA

## Contexto da atividade

Este projeto foi desenvolvido para a atividade de Proposta de Melhoria de Interface e Experiência do Usuário. A proposta consiste em identificar uma solução de software que não atenda aos critérios de qualidade de interface e experiência do usuário discutidos em sala, e a partir dela criar um protótipo de alta fidelidade com uma nova interface que atenda a esses critérios.

A solução escolhida foi o SIGAA, especificamente o fluxo de realização de matrícula online, mapeado previamente por meio de diagramas BPMN e de um mapa de empatia do usuário discente.

## Critérios de UI/UX considerados

O redesenho buscou atender, ao longo de todas as telas, aos seguintes critérios discutidos durante o semestre: facilidade de aprendizado, eficiência de uso, memorabilidade, baixa taxa de erro, satisfação subjetiva, uso adequado de cor e contraste, respiro visual, proporção entre elementos, clareza, consistência e hierarquia visual.

Exemplos concretos de aplicação: indicador fixo de etapa (Etapa N de 5) para orientar o aluno sobre seu progresso no fluxo; alertas de conflito de horário e pré requisito não cumprido antes da confirmação final, reduzindo erros tardios; modais de confirmação para ações críticas, como atualização de dados e confirmação de identidade; e paleta de cores e componentes consistentes em todas as telas do fluxo.

## Jornada mapeada

O fluxo cobre as seguintes etapas, na ordem em que o aluno percorre o sistema: login, portal do discente, confirmação de dados cadastrais, seleção de turmas, verificação de pré requisitos e conflitos de horário, confirmação da matrícula com revisão de disciplinas e grade de horários, processamento da solicitação e exibição do resultado final por disciplina.

## Stack utilizada

O protótipo foi construído em React com TypeScript, usando Vite como bundler, Tailwind CSS para estilização e componentes baseados em Radix UI via shadcn. A navegação entre telas é feita com React Router, e o estado de turmas selecionadas é centralizado em um Context API. Todos os dados (aluno, turmas ofertadas, equivalentes, núcleo livre e unidades) são mockados em arquivos JSON, sem qualquer integração com backend real.

## Limitações conhecidas

Por se tratar de um protótipo focado na interface e na experiência do usuário, duas simplificações foram conscientemente adotadas e não foram resolvidas:

A primeira é a possibilidade teórica de colisão de identificadores entre as três fontes de dados mockadas (disciplinas do curso, equivalentes e núcleo livre). Em um sistema real, essa validação de unicidade seria responsabilidade do backend ao gerar os identificadores das turmas, e não da camada de interface.

A segunda é que o resultado final da matrícula (disciplinas deferidas ou indeferidas) é calculado localmente na tela de resultado e não é persistido em um estado central nem em armazenamento permanente. Isso significa que, se o protótipo for recarregado após a exibição do resultado, um novo sorteio seria gerado. Em um sistema real, esse resultado viria de um processamento de backend e seria armazenado de forma definitiva.

Nenhuma das duas limitações compromete a demonstração do fluxo de interface proposto, que é o objetivo central desta entrega.