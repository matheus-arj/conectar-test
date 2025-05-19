# 🚀 API de Gerenciamento de Usuários

API construída com **NestJS**, utilizando **JWT** para autenticação e controle de acesso baseado em **roles** (`ADMIN` e `USER`). Permite cadastro, login e gerenciamento de usuários com segurança e boas práticas.

---

## ⚙️ Tecnologias

- [NestJS](https://nestjs.com/)
- TypeORM + PostgreSQL
- JWT (JSON Web Token)
- Bcrypt
- Docker
- Class Validator / Class Transformer
- Swagger

---

## 📦 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/matheus-arj/conectar-test.git
cd conectar-test
```

### 2. Instalar as dependências

```
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo .env na raiz com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
JWT_SECRET="GfR8hEylzUmxnVcZhAC67ooLRbXuIIe2jt2kXgrqRJKkmVtOeYt3ENYqGxR8Y+KjEYuUWIc2MESLJGhG1gJwtQ==""
```

### 4. Subir o ambiente com Docker

```
docker-compose up -d
```

### 5. Executando as migrations e seeds

Rodar Migrations
Para aplicar as migrations e atualizar o banco de dados com as últimas alterações do schema, execute:

```
npm run db:migrate
```

Rodar Seed para criar usuário ADMIN
Para criar um usuário ADMIN inicial, execute o script seed:

```
npx ts-node src/seeds/create-admin.ts
```

Importante:

- Verifique se as variáveis de ambiente (.env) estão configuradas corretamente, especialmente as credenciais do banco de dados (DB_USERNAME, DB_PASSWORD, DB_HOST, etc).

- O script irá verificar se o usuário ADMIN já existe para evitar duplicatas.

#### Este comando cria um usuário com as seguintes credenciais:

- Email: admin@email.com
- Senha: 12345678admin
- Role: ADMIN

### 6. Rodar a aplicação

🧰 Modos de Teste
Você pode testar esta API de duas formas:

✅ 1. Testar somente a API
Se quiser testar diretamente usando ferramentas como Postman, basta seguir os passos de instalação e rodar a API com:

```
npm run start:dev
```

As rotas estão disponíveis em:
http://localhost:3000

🖥️ 2. Subir junto com o Front-end
Se preferir uma interface gráfica para interagir com a API, clone e rode o projeto front-end conectart-test-front:

```
git clone https://github.com/matheus-arj/conectar-test-front.git
cd conectart-test-front
npm install
npm run dev
```

A interface estará disponível em:
http://localhost:5173 (ou conforme indicado no terminal)

Certifique-se de que a API (conectart-test) esteja rodando antes de iniciar o front.

## 🛡️ Segurança

Senhas são hasheadas com Bcrypt

JWT é utilizado para autenticação (Bearer Token)

Rotas protegidas com @UseGuards(JwtAuthGuard, RolesGuard)

Controle de acesso por @Roles(UserRoleEnum.ADMIN)

## 📊 Auditoria (Audit)

A funcionalidade de auditoria permite registrar ações importantes dos usuários na plataforma (como login) e identificar usuários inativos — ou seja, aqueles que não acessam a plataforma há um determinado número de dias.

### 🔍 Listar usuários inativos

Retorna uma lista com os IDs dos usuários que não fizeram login nos últimos 30 dias (ou o número de dias informado via query param).

### 📥 Requisição

```
GET /audit/inactive-users
```

Parâmetros de Query (opcional):
| Parâmetro | Tipo | Descrição | Padrão |
| --------- | ------ | ------------------------- | ------ |
| `days` | number | Dias desde o último login | `30` |

### 📝 Registro de auditoria (interno)

Sempre que um usuário realiza login com sucesso, um registro é criado na tabela audits com os campos:

| Campo       | Tipo   | Descrição                    |
| ----------- | ------ | ---------------------------- |
| `id`        | UUID   | Identificador único          |
| `userId`    | UUID   | ID do usuário autenticado    |
| `action`    | string | Ação executada (ex: "LOGIN") |
| `createdAt` | Date   | Data e hora do evento        |

### Swagger

Para visualizar a documentação Swagger, acesse:
http://localhost:3000/api
