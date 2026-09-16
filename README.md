# 💰 Personal Finance App

> Aplicação Full Stack para controle financeiro pessoal, desenvolvida com React, JavaScript, Tailwind CSS, FastAPI, Python e SQLite.

🚧 **Status: Em desenvolvimento**

---

## 📌 Visão Geral

O **Personal Finance App** é uma aplicação web desenvolvida para facilitar o controle das finanças pessoais, permitindo registrar receitas e despesas, organizar transações por categorias, acompanhar metas financeiras e visualizar um resumo da situação financeira através de um dashboard.

O projeto está sendo desenvolvido como uma aplicação **Full Stack**, com frontend e backend separados e comunicação através de uma API REST.

Além da implementação das funcionalidades, o projeto tem como objetivo praticar conceitos de:

- Desenvolvimento Full Stack
- APIs REST
- Separação de responsabilidades
- Organização de código
- Persistência de dados
- Validação de informações
- Integração entre frontend e backend

---

## 🎯 Objetivo

Criar uma aplicação simples e organizada que permita ao usuário:

- Registrar receitas e despesas
- Organizar transações por categorias
- Acompanhar metas financeiras
- Visualizar receitas, despesas e saldo
- Gerenciar transações recorrentes
- Centralizar as informações financeiras em um dashboard

O projeto também serve como aplicação prática dos conhecimentos adquiridos em **JavaScript, React, Python e desenvolvimento de APIs**.

---

## 🚧 Status do Projeto

O projeto encontra-se **em desenvolvimento**.

As principais funcionalidades da aplicação já foram implementadas e estão sendo testadas e refinadas.

### Atualmente implementado

- ✅ Estrutura Full Stack
- ✅ API REST com FastAPI
- ✅ Integração React ↔ FastAPI
- ✅ Banco de dados SQLite
- ✅ Modelos utilizando SQLAlchemy
- ✅ Cadastro e gerenciamento de categorias
- ✅ Cadastro de receitas e despesas
- ✅ Edição de transações
- ✅ Exclusão de transações
- ✅ Consulta de transações
- ✅ Controle de metas financeiras
- ✅ Atualização e exclusão de metas
- ✅ Acompanhamento do progresso das metas
- ✅ Dashboard financeiro
- ✅ Cálculo de receitas
- ✅ Cálculo de despesas
- ✅ Cálculo do saldo
- ✅ Transações recorrentes
- 🚧 Refinamento da aplicação
- 🚧 Correções e melhorias de integração
- 🚧 Evolução da interface

---

## ✨ Funcionalidades

### 💵 Controle de Transações

A aplicação permite registrar diferentes tipos de movimentações financeiras.

Cada transação possui informações como:

- Título
- Valor
- Tipo da transação
- Categoria

É possível realizar operações de:

- Criar
- Consultar
- Atualizar
- Excluir

transações.

---

### 🏷️ Categorias

As transações podem ser organizadas através de categorias.

A aplicação possui suporte ao gerenciamento das categorias utilizadas para classificar as movimentações financeiras.

---

### 🎯 Metas Financeiras

O sistema permite criar metas financeiras e acompanhar sua evolução.

Cada meta pode possuir informações como:

- Título
- Valor objetivo
- Valor atual
- Data objetivo
- Descrição
- Status de conclusão

O sistema também permite atualizar e excluir metas.

---

### 🔄 Transações Recorrentes

O projeto possui uma estrutura específica para trabalhar com **transações recorrentes**, permitindo organizar operações financeiras que se repetem periodicamente.

Essa funcionalidade faz parte da evolução do sistema para um controle financeiro mais completo.

---

### 📊 Dashboard

A aplicação possui um dashboard responsável por apresentar um resumo da situação financeira.

Entre as informações disponibilizadas estão:

- Total de receitas
- Total de despesas
- Saldo
- Informações relacionadas às metas financeiras

O objetivo é permitir uma visualização rápida da situação financeira do usuário.

---

## 🏗️ Arquitetura

A aplicação utiliza uma arquitetura separando frontend e backend.

```text
┌──────────────────────────────┐
│          Frontend            │
│                              │
│ React + JavaScript           │
│ Tailwind CSS                 │
└──────────────┬───────────────┘
               │
               │ HTTP / REST API
               ▼
┌──────────────────────────────┐
│           Backend            │
│                              │
│ FastAPI + Python             │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        Camada de Serviço     │
│                              │
│ Regras de negócio            │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Repository Layer       │
│                              │
│ Acesso aos dados             │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       SQLite + SQLAlchemy    │
│                              │
│ Persistência dos dados       │
└──────────────────────────────┘
```

---

## 🧩 Organização do Backend

O backend foi estruturado buscando separar responsabilidades entre as diferentes camadas da aplicação.

```text
backend/
│
└── app/
    │
    ├── database/
    │
    ├── models/
    │
    ├── repositories/
    │
    ├── routes/
    │
    ├── schemas/
    │
    ├── services/
    │
    └── main.py
```

### Responsabilidade das camadas

### Routes

Responsáveis por receber as requisições HTTP e disponibilizar os endpoints da API.

### Services

Concentram regras de negócio e validações da aplicação.

### Repositories

Responsáveis pelas operações relacionadas ao acesso aos dados.

### Models

Representam as entidades utilizadas pela aplicação e sua estrutura no banco de dados.

### Schemas

Definem estruturas utilizadas para validação e entrada/saída de dados da API.

### Database

Responsável pela configuração da conexão e sessão do banco de dados.

---

## 🔄 Fluxo da Aplicação

Um exemplo de fluxo para criação de uma transação:

```text
Usuário
   │
   ▼
React
   │
   │ HTTP POST
   ▼
FastAPI Route
   │
   ▼
Service
   │
   ├── Validação
   │
   └── Regras de negócio
   │
   ▼
Repository
   │
   ▼
SQLAlchemy
   │
   ▼
SQLite
```

Após a operação, a resposta retorna pelo mesmo fluxo até o frontend.

---

## 🛠️ Tecnologias
### Frontend
- React
- JavaScript
- Tailwind CSS
- Vite

### Backend
- Python
- FastAPI
- SQLAlchemy

### Banco de Dados
- SQLite

### Desenvolvimento
- Git
- GitHub
- API REST
- HTTP
- JSON

## 🖥️ Interface

A aplicação possui uma interface desenvolvida em React e estilizada utilizando Tailwind CSS.

A interface está sendo construída de forma modular, permitindo a evolução gradual das telas e componentes conforme novas funcionalidades são implementadas.

> 📸 Screenshots da aplicação serão adicionados conforme a interface for finalizada.
---

## 🚀 Como Executar
### Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

- Node.js
- npm
- Python
- pip

### 1. Clonar o repositório

```text
git clone https://github.com/rapha0311/personal-finance-app.git
```
```text
cd personal-finance-app
```
---

### 2. Configurar o Backend

Entre na pasta do backend:

```text
cd backend
```

Crie um ambiente virtual:
```text
python -m venv venv
```

Ative o ambiente virtual no Windows:
```text
.\venv\Scripts\Activate.ps1
```

Instale as dependências:
```text
pip install -r requirements.txt
```

Execute a API:
```text
uvicorn app.main:app --reload
```

A API estará disponível em:
```text
http://127.0.0.1:8000
```

A documentação interativa do FastAPI pode ser acessada em:
```text
http://127.0.0.1:8000/docs
```

---

### 3. Executar o Frontend

Em outro terminal, entre na pasta do frontend:
```text
cd frontend
```

Instale as dependências:
```text
npm install
```

Execute a aplicação:
```text
npm run dev
```

O frontend estará disponível no endereço apresentado pelo Vite, normalmente:
```text
http://localhost:5173
```

---

## 🧪 Testes e Validações

Durante o desenvolvimento, as funcionalidades do backend estão sendo testadas através da API e da integração com o frontend.

Entre os testes realizados estão:

- Criação de transações
- Atualização de transações
- Exclusão de transações
- Consulta de transações
- Criação de categorias
- Criação de metas
- Atualização de metas
- Exclusão de metas
- Consulta do progresso das metas
- Cálculo de receitas
- Cálculo de despesas
- Cálculo do saldo
- Comunicação entre React e FastAPI
- Persistência dos dados no SQLite
- Validação de regras de negócio

Novos testes e refinamentos serão adicionados durante a evolução do projeto.

---

## 🔮 Próximas Evoluções

Entre as próximas etapas planejadas estão:

- Finalizar o refinamento das funcionalidades existentes
- Melhorar a interface do dashboard
- Aprimorar a experiência do usuário
- Revisar e consolidar o modelo do banco de dados
- Expandir o controle de transações recorrentes
- Melhorar validações
- Adicionar novos indicadores financeiros
- Melhorar a documentação da API
- Adicionar testes automatizados
- Refinar a responsividade da aplicação

---

## 📚 Objetivos de Aprendizado

Este projeto está sendo utilizado para consolidar conhecimentos em:

- Desenvolvimento de aplicações Full Stack
- React
- JavaScript
- Python
- FastAPI
- APIs REST
- SQLAlchemy
- SQLite
- Arquitetura em camadas
- Separação de responsabilidades
- Regras de negócio
- Integração frontend/backend
- Git e GitHub

---

## 📌 Limitações Atuais

Como o projeto ainda está em desenvolvimento, algumas funcionalidades e aspectos da aplicação continuam sendo refinados.

O objetivo neste momento é priorizar uma implementação clara e funcional antes de adicionar novas complexidades.

---

## 👨‍💻 Autor

Raphael Alves Ferreira

Desenvolvimento de soluções em Automação Industrial, IoT e sistemas de software.
