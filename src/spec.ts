## Projeto Proposto: **TicketFlow (Sistema de Venda Rápida de Ingressos)**

Este projeto simula perfeitamente o ciclo de vida real de um software corporativo: ele nasce simples, sofre alterações de escopo abruptas e esbarra nos desafios clássicos de ambientes em produção.

## Fase 1: O MVP Inicial (O Pedido do Cliente)

* **O que o cliente pede:** Um sistema básico de cadastro de eventos, listagem de bilhetes e uma rota simples de compra.
* **Estrutura inicial:** Uma API monolítica direta ao ponto (CRUD), ligada a um banco de dados relacional, sem grandes preocupações arquiteturais iniciais.
* **Objetivo:** Fazer o fluxo funcional básico rodar de ponta a ponta para entregar valor rápido.

## Fase 2: A Mudança Realista (Escopo e Produção)

* **A alteração do cliente:** *"O evento principal vai ter uma venda relâmpago (*flash sale*) com 5.000 usuários tentando comprar os últimos 50 ingressos exatamente no mesmo segundo. O sistema atual caiu e gerou estoque negativo!"*
* **Desafios reais injetados no projeto:**
* **Concorrência e Paralelismo:** Múltiplas requisições simultâneas causando *race conditions* no estoque. Você terá que implementar transações de banco de dados e controle de concorrência otimista ou pessimista.
* **Pool de Conexões:** Sob o pico de acessos, o banco de dados começa a retornar erros de limite de conexões excedido. Você aprenderá como o *pool* de conexões funciona, configurando limites e tempos limite (*timeouts*).
* **Refactoração:** O código espaguete feito na Fase 1 precisa ser urgentemente reestruturado aplicando separação de responsabilidades para suportar filas de processamento em background.



## O Que Você Irá Praticar na Prática

* Implementação de transações seguras para evitar furos de estoque por concorrência.
* Monitoramento e dimensionamento do *pool* de conexões de banco de dados sob estresse.
* Refactoração de código monolítico acoplado para uma arquitetura mais limpa e resiliente.
* Testes de carga simulados com ferramentas práticas (como Autocannon ou k6).

---

Qual linguagem ou stack tecnológica você prefere utilizar para estruturar os detalhes técnicos deste projeto?