# Gerador de Relatórios

Aplicação fullstack que demonstra o padrão de projeto **Factory Method**. O sistema gera relatórios nos formatos PDF, HTML e JSON a partir de dados fornecidos pelo usuário, com pré-visualização em tempo real no navegador.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | React 18, Vite, TypeScript |
| Backend | Node.js, Express, TypeScript |
| Padrão | Factory Method |

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (incluído com o Node.js)

## Instalação

Clone o repositório e instale as dependências de cada camada separadamente.

```bash
git clone <https://github.com/RianWeber13/ReportGenerator>
cd report-generator
```

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

## Executando o projeto

O backend e o frontend precisam rodar ao mesmo tempo, cada um em um terminal separado.

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
O servidor inicia em `http://localhost:3001`.

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
A aplicação abre em `http://localhost:5173`.

## Como usar

1. Acesse `http://localhost:5173` no navegador.
2. No painel **Configuração** (esquerda):
   - Selecione o **formato** do relatório: PDF, HTML ou JSON.
   - Preencha o **Título** e o **Destinatário**.
   - Adicione os **campos** desejados clicando em `+ Adicionar Campo` — cada campo tem um rótulo e um valor.
   - Use o botão `×` para remover campos.
3. Clique em **Gerar Relatório**.
4. O resultado aparece no painel **Pré-visualização** (direita):
   - **PDF** — exibe os dados formatados e permite expandir a saída bruta.
   - **HTML** — renderiza o relatório como uma página dentro de um iframe.
   - **JSON** — exibe o objeto estruturado em bloco de código.

## Estrutura do projeto

```
report-generator/
├── backend/
│   └── src/
│       ├── index.ts               # Servidor Express
│       └── reports/
│           ├── Report.ts          # Interface do produto
│           ├── ReportFactory.ts   # Creator (Factory)
│           ├── PDFReport.ts       # Produto concreto
│           ├── HTMLReport.ts      # Produto concreto
│           └── JSONReport.ts      # Produto concreto
└── frontend/
    └── src/
        ├── App.tsx                # Componente raiz e lógica principal
        ├── types.ts               # Tipos compartilhados
        └── components/
            ├── ReportPreview.tsx  # Simple Factory de previews
            ├── PDFPreviewer.tsx
            ├── HTMLPreviewer.tsx
            └── JSONPreviewer.tsx
```

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/generate` | Gera o relatório. Recebe `{ type, data }` e retorna `{ format, content }`. |
| `GET` | `/formats` | Retorna os formatos suportados: `["pdf", "html", "json"]`. |

**Exemplo de requisição:**
```json
POST /generate
{
  "type": "json",
  "data": {
    "title": "Relatório Mensal",
    "name": "João Silva",
    "items": [
      { "label": "Departamento", "value": "Engenharia" },
      { "label": "Status", "value": "Concluído" }
    ]
  }
}
```
