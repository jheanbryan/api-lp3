const express = require('express'); // importando o express
const api = express(); // cria um servidor
require('dotenv').config(); // Importa o arquivo .env
const porta = process.env.PORTA_API; //Puxando a porta do .env
const produtosController = require('./controllers/produtos'); // Importando o controller
const enderecoBanco = process.env.URL_BD; //Puxando a url do .env
const mongoose = require('mongoose') //Puxando o mongoose

mongoose.connect(enderecoBanco)
mongoose.connection.on('connected', function() {
    console.log('Deu bom, entrei no banco')
})
api.listen(porta, function () {
    console.log('API rodando na porta ' + porta);
});

// GET -> pedir informação
// POST -> enviar informação (criar/cadastrar)
// PUT -> enviar informação (editar)
// DELETE -> deletar informação

api.get('/home', function(req, resp){
    resp.send({msg: 'Você está na home'})
});

api.get('/produtos', produtosController.listarProdutos);
api.post('/produto', produtosController.adicionarProduto);
api.delete('/produto', produtosController.removerProduto);
api.get('/buscar-produtos', produtosController.buscarProdutos);