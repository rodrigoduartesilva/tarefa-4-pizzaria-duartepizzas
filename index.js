const express = require('express');
require('dotenv').config();
const connectToDatabase = require('./src/database/database');//Arquivo de conexão com o databasse

const usuario = require('./src/router/usuario.router');//Arquivo de rota do usuário
const auth = require('./src/router/auth.router');//Arquivo de rota de autenticação
const pizza = require('./src/router/pizza.router');//Arquivo de rota do produto pizza
const categoria = require('./src/router/categoria.router');//Arquivo de rota da categoria
const carrinho = require('./src/router/carrinho.router');//Arquivo de rota do carrinho

const app = express();

const port = 3000;

app.use(express.json());

connectToDatabase();//Função de conexão com o database

app.use('/usuario', usuario);//Chamando as rotas do usuário
app.use('/auth', auth);//Chamando a rota de autenticação
app.use('/pizza', pizza);//Chamando a rota do produto pizza
app.use('/categoria', categoria);//Chamando a rota da categoria
app.use('/carrinho', carrinho);//Chamando a rota do carrinho

app.get('/', (req, res) => {
    res.send({
        message: 'Bem-vindo ao APP da Duarte Pizzaria'
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});