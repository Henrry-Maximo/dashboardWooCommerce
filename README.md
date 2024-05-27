# Dashboard de Pedidos

- Este projeto é um dashboard de pedidos desenvolvido com React no frontend, Node.js no backend e MySQL (MariDB) no banco de dados. Ele permite visualizar pedidos em tempo real, cadastro de usuários e autenticação de usuários via Token.

# Tecnologias:

- Frontend:
React
Axios
React Icons
Date-fns
React Bootstrap

- Backend:
Node.js
Express.js
JWT (JSON Web Tokens)
bcrypt
Express Validator
MySQL2
WooCommerce REST API (para integração com WooCommerce)

Ferramentas de Desenvolvimento:
Prettier (para formatação de código)
Nodemon (para reiniciar o servidor automaticamente durante o desenvolvimento)
dotenv (para carregar variáveis de ambiente a partir de um arquivo .env)
Cors (para habilitar CORS no backend)

# Instalação

Clone o repositório:
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>

Instale as dependências do frontend:
cd frontend
npm install

Instale as dependências do backend:
cd ../backend
npm install

Iniciar o servidor de desenvolvimento:
npm run dev

Gerar a build de produção:
npm run build

Iniciar o servidor com Nodemon (aplicação no ar):
npm run dev

- Após gerar a build do frontend, você pode iniciar a aplicação utilizando o PM2 e o Serve.

# Estrutura do Projeto
Frontend: Contém os componentes React, rotas, estilos e assets.
Backend: Contém as rotas da API, controladores, modelos e configuração de banco de dados.
Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias, como a configuração do banco de dados e chaves secretas.

# Exemplo de configuração para o backend
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta

# Imagem do Dashboard: 
![image](https://github.com/Henrry-Maximo/dashboardWooCommerce/assets/99754637/bf44cef2-881f-4967-85c2-37ec03a3ee1b)

