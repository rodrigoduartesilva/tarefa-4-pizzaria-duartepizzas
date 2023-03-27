const express = require('express');
require('dotenv').config();
const cors = require('cors');

const connectToDatabase = require('./src/database/database');//Arquivo de conexão com o databasse

const usuario = require('./src/router/usuario.router');//Arquivo de rota do usuário
const auth = require('./src/router/auth.router');//Arquivo de rota de autenticação
const pizza = require('./src/router/pizza.router');//Arquivo de rota do produto pizza
const bebida = require('./src/router/bebida.router');//Arquivo de rota do produto bebida
const categoria = require('./src/router/categoria.router');//Arquivo de rota da categoria
const carrinho = require('./src/router/carrinho.router');//Arquivo de rota do carrinho
const pedido = require('./src/router/pedido.router');//Arquivo de rota do pedido
const docs = require('./src/router/docs.router');//Arquivo de rota do docs

const app = express();

const port = 3000;

app.use(express.json());
app.use(cors(
    {
        origin: ["localhost:3001", "localhost:3002"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
));

connectToDatabase();//Função de conexão com o database

app.use('/usuario', usuario);//Chamando as rotas do usuário
app.use('/auth', auth);//Chamando a rota de autenticação
app.use('/pizza', pizza);//Chamando a rota do produto pizza
app.use('/bebida', bebida);//Chamando a rota do produto bebida
app.use('/categoria', categoria);//Chamando a rota da categoria
app.use('/carrinho', carrinho);//Chamando a rota do carrinho
app.use('/pedido', pedido);//Chamando a rota do pedido
app.use('/docs', docs);//Chamando a rota do docs

app.get('/', (req, res) => {
    res.send({
        message: 'Bem-vindo ao APP da Duarte Pizzaria'
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});