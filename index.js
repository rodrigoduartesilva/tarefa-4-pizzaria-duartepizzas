const express = require('express');
const connectToDatabase = require('./src/database/database');//Arquivo de conexão com o databasse

const usuario = require('./src/router/usuario.router');//Arquivo de rota do usuário

const app = express();

const port = 3000;

app.use(express.json());

connectToDatabase();//Função de conexão com o database

app.use('/usuario', usuario);//Chamando as rotas do usuário

app.get('/', (req, res) => {
    res.send({
        message: 'Bem-vindo ao APP da Duarte Pizzaria'
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});