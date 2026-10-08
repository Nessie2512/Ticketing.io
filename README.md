<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">


# TicketFlow — Sistema de Venda Rápida de Ingressos

O **TicketFlow** é um projeto concebido para simular o ciclo de vida real de um software em ambiente de produção. O sistema foi planejado para evoluir desde um MVP (Produto Mínimo Viável) simples até um cenário de alta concorrência, exigindo refatoração de código, gestão eficiente de recursos de banco de dados e resolução de problemas críticos de concorrência e paralelismo.

---

## 🚀 Sobre o Projeto

Este repositório documenta a evolução de uma aplicação de venda de ingressos dividida em duas fases principais:

1. **Fase 1 (O MVP Inicial):** Um CRUD simples e direto para gerenciamento de eventos e compra de bilhetes, focado na entrega rápida de valor.
2. **Fase 2 (O Cenário de Produção / *Flash Sale*):** Uma mudança de escopo realista onde milhares de usuários tentam comprar os últimos ingressos em simultâneo, forçando a implementação de estratégias avançadas de engenharia de software.

---

## ⚙️ Desafios Técnicos Abordados

Na Fase 2, o sistema simula os principais gargalos enfrentados por sistemas corporativos em produção:

* **Concorrência e Paralelismo (*Race Conditions*):**
* *Problema:* Múltiplas requisições simultâneas tentavam comprar o último ingresso disponível, resultando em "venda dupla" e estoque negativo.
* *Solução:* Implementação de transações de banco de dados com níveis de isolamento adequados e controle de concorrência (otimista/pessimista).


* **Pool de Conexões do Banco de Dados:**
* *Problema:* Sob picos de acesso repentinos, a aplicação esgotava o limite de conexões do banco, gerando falhas em cascata.
* *Solução:* Configuração, monitoramento e ajuste fino do *pool* de conexões (*min/max connections*, *idle timeout* e *acquire timeout*).


* **Refatoração e Limpeza de Código:**
* *Problema:* O código inicial monolítico e acoplado tornou-se insustentável para gerenciar regras de negócio complexas de pagamento e concorrência.
* *Solução:* Reestruturação do código aplicando separação de responsabilidades, desacoplamento de camadas e preparação para filas de processamento em *background*.



---

## 🛠️ Tecnologias Sugeridas

* **Backend:** Node.js, TypeScript, Express ou NestJS *(adaptável à stack de sua preferência)*
* **Banco de Dados:** PostgreSQL (com suporte a transações robustas)
* **Gerenciamento de Conexões:** `pg` pool ou Prisma / TypeORM
* **Testes de Carga:** k6 ou Autocannon

---

## 📦 Arquitetura do Repositório (Estrutura Inicial)

```text
ticketflow/
├── src/
│   ├── @core/          # Regras de negócio e entidades de domínio
│   ├── infra/          # Configuração de banco de dados, repositórios e pool de conexões
│   ├── presentation/   # Controladores de rotas e adaptadores HTTP
│   └── app.ts          # Inicialização da aplicação
├── tests/              # Testes unitários e de carga
├── docker-compose.yml  # Configuração de ambiente local (Banco de dados)
└── README.md

```

---

## 🏃‍♂️ Como Executar o Projeto Localmente

### Pré-requisitos

* Node.js instalado
* Docker e Docker Compose (para subir o banco de dados)

### Passos:

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/ticketflow.git
cd ticketflow

```


2. **Suba o banco de dados via Docker:**
```bash
docker-compose up -d

```


3. **Instale as dependências:**
```bash
npm install

```


4. **Execute a aplicação em modo de desenvolvimento:**
```bash
npm run dev

```



---

## 🧪 Simulando o Ambiente de Produção (Testes de Carga)

Para testar o comportamento do **Pool de Conexões** e a resolução de **Concorrência** na Fase 2, utilize a ferramenta de testes de carga configurada:

```bash
# Exemplo de comando utilizando k6 para simular 5.000 usuários simultâneos
k6 run tests/load-test.js

```

npm run start:dev          # Inicia com banco em memória
npm run prisma:push       # Sincroniza schema
npm run test              # Roda testes com banco em memória
npm run prisma:studio     # Visualiza dados (UI web)