# Tasks Backend

API REST para gerenciamento de tarefas, desenvolvida em Node.js com Express e PostgreSQL. O projeto oferece cadastro e autenticação de usuários, criação e consulta de tarefas, exclusão e alteração do status de conclusão.

## Requisitos

- Node.js e npm
- Docker Desktop com Docker Compose
- Portas `3000`, `5432` e `5050` livres

## Como executar

### 1. Instalar dependências

Na pasta `tasks-backend`, execute:

```bash
npm install
```

### 2. Configurar o segredo JWT

O arquivo `.env.local` é carregado diretamente pelo Node.js e não deve ser versionado. Crie-o na raiz do projeto com este formato:

```javascript
module.exports = {
  authSecret: 'troque-por-um-segredo-longo-e-aleatorio',
};
```

O arquivo existente no ambiente local já contém essa configuração. Em produção, use um segredo exclusivo e não utilize as credenciais padrão do Docker.

### 3. Iniciar o banco de dados

```bash
npm run start:db
```

Esse comando inicia, em segundo plano:

- PostgreSQL 16 em `localhost:5432`
- pgAdmin em `http://localhost:5050`

Na primeira inicialização, o volume `tasks-db-data` é criado. Os dados continuam disponíveis mesmo que os containers sejam parados.

### 4. Iniciar a API

```bash
npm start
```

A API ficará disponível em:

```text
http://localhost:3000
```

O script usa `nodemon`, portanto reinicia o servidor quando os arquivos do projeto são alterados.

Para parar os containers do banco:

```bash
npm run stop:db
```

Para remover também os dados persistidos:

```bash
docker compose down -v
```

## Migrations

As migrations do Knex são executadas automaticamente quando a conexão com o banco é criada. Elas criam:

- `users`: usuários e senhas com hash bcrypt
- `tasks`: descrição, datas, status e usuário proprietário

As tarefas são associadas ao usuário por `userId`. A API sempre filtra tarefas pelo usuário autenticado.

## API

Todas as requisições com JSON devem usar o header:

```http
Content-Type: application/json
```

### Criar usuário

```http
POST /signup
```

Corpo:

```json
{
  "name": "Maria",
  "email": "maria@example.com",
  "password": "senha-segura"
}
```

Retorno de sucesso: `204 No Content`.

### Autenticar usuário

```http
POST /signin
```

Corpo:

```json
{
  "email": "maria@example.com",
  "password": "senha-segura"
}
```

Resposta:

```json
{
  "name": "Maria",
  "email": "maria@example.com",
  "token": "eyJ..."
}
```

O token JWT expira em 7 dias. Envie-o nas rotas protegidas:

```http
Authorization: Bearer <token>
```

### Listar tarefas

```http
GET /tasks
GET /tasks?date=2026-09-06T23:59:59.000Z
```

Sem o parâmetro `date`, são retornadas as tarefas do usuário cuja data de estimativa seja até o fim do dia atual, ordenadas por `estimateAt`.

### Criar tarefa

```http
POST /tasks
Authorization: Bearer <token>
```

Corpo:

```json
{
  "desc": "Estudar Node.js",
  "estimateAt": "2026-09-07T18:00:00.000Z"
}
```

O `userId` é preenchido pelo servidor a partir do token. Retorno de sucesso: `204 No Content`.

### Excluir tarefa

```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

Retorno de sucesso: `204 No Content`.

### Alternar conclusão da tarefa

```http
PUT /tasks/:id/toggle
Authorization: Bearer <token>
```

Quando a tarefa está pendente, `doneAt` recebe a data atual. Quando já está concluída, `doneAt` volta a `null`. Retorno de sucesso: `204 No Content`.

## Acesso ao pgAdmin

Abra `http://localhost:5050` e use:

```text
E-mail: admin@admin.com
Senha: admin
```

Ao registrar o servidor PostgreSQL no pgAdmin, use:

```text
Host: db
Porta: 5432
Banco: tasks
Usuário: postgres
Senha: 123456
```

O host é `db` porque o pgAdmin se conecta ao PostgreSQL pela rede interna do Docker. A partir da máquina hospedeira, use `localhost`.

## Arquitetura

```text
index.js
  |-- config/db.js              Conexão Knex e execução das migrations
  |-- config/middlewares.js     JSON body parser e CORS
  |-- config/passport.js         Estratégia JWT e usuário autenticado
  |-- config/routes.js           Registro das rotas HTTP
  |-- api/auth.js                Login e emissão do JWT
  |-- api/user.js                Cadastro de usuários
  |-- api/tasks.js               Operações de tarefas
  |-- migrations/                Estrutura do banco de dados
  |-- knexfile.js                Configuração do PostgreSQL e do Knex
```

O `consign` carrega os módulos de configuração e da pasta `api` no objeto `app`. Os handlers usam `app.db` para acessar o banco e `req.user` para identificar o usuário validado pelo Passport.

## Bibliotecas principais

- **Express**: servidor HTTP e definição das rotas.
- **Consign**: carregamento e organização dos módulos da aplicação.
- **Knex**: query builder, conexão PostgreSQL e migrations.
- **pg**: driver do PostgreSQL para o Knex.
- **Passport** e **passport-jwt**: autenticação por token JWT.
- **jsonwebtoken**: criação dos tokens de autenticação.
- **bcrypt**: hash e comparação segura de senhas.
- **body-parser**: leitura de corpos JSON.
- **cors**: habilitação de requisições de diferentes origens.
- **Moment**: cálculo da data padrão usada na consulta de tarefas.
- **Nodemon**: reinicialização automática durante o desenvolvimento.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia a API com Nodemon |
| `npm run start:db` | Sobe PostgreSQL e pgAdmin em background |
| `npm run stop:db` | Para os containers sem remover o volume |

## Observações para produção

- Substitua o segredo JWT e as credenciais padrão do PostgreSQL/pgAdmin.
- Restrinja o CORS a origens conhecidas.
- Não publique `.env.local` nem credenciais em repositórios.
- Configure a conexão do banco por variáveis de ambiente e use HTTPS na API.