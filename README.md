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
JWT_SECRET=uma_chave_bem_secreta
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=meubanco
```

### 4. Rodar a aplicação
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