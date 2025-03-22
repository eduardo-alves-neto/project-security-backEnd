# API de Clientes e Colaboradores

API REST com autenticação e CRUD de clientes e colaboradores, desenvolvida com Node.js, Express e MongoDB.

## Requisitos

- Node.js
- MongoDB
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto
- Adicione as seguintes variáveis:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/api-clientes
JWT_SECRET=sua_chave_secreta_aqui
```

4. Inicie o servidor:
```bash
npm run dev
```

## Endpoints

### Autenticação

- `POST /api/auth/registro` - Registro de novo usuário
- `POST /api/auth/login` - Login de usuário
- `GET /api/auth/perfil` - Buscar perfil do usuário (requer autenticação)

### Clientes

- `GET /api/clientes` - Listar todos os clientes (requer autenticação)
- `GET /api/clientes/:id` - Buscar cliente por ID (requer autenticação)
- `POST /api/clientes` - Criar novo cliente (requer autenticação)
- `PUT /api/clientes/:id` - Atualizar cliente (requer autenticação)
- `DELETE /api/clientes/:id` - Excluir cliente (requer autenticação)

### Colaboradores

- `GET /api/colaboradores` - Listar todos os colaboradores (requer autenticação de admin)
- `GET /api/colaboradores/:id` - Buscar colaborador por ID (requer autenticação de admin)
- `POST /api/colaboradores` - Criar novo colaborador (requer autenticação de admin)
- `PUT /api/colaboradores/:id` - Atualizar colaborador (requer autenticação de admin)
- `DELETE /api/colaboradores/:id` - Excluir colaborador (requer autenticação de admin)

## Autenticação

Para acessar as rotas protegidas, inclua o token JWT no header da requisição:
```
Authorization: Bearer seu_token_jwt
```

## Exemplo de Uso

1. Registre um usuário:
```bash
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@exemplo.com", "senha": "123456", "nome": "Admin", "role": "admin"}'
```

2. Faça login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@exemplo.com", "senha": "123456"}'
```

3. Use o token retornado para acessar as rotas protegidas:
```bash
curl http://localhost:3000/api/clientes \
  -H "Authorization: Bearer seu_token_jwt"
``` 