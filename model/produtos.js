const mongoose = require('mongoose');//Puxando o mongoose
const Schema = mongoose.Schema; // declarando o Schema
const produtosSchema = new Schema({ // criando um novo Schema para o produto
    nome:{type: String, required: true, unique: true},
    valor:{type: Number, required: true},
    created: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Produtos', produtosSchema); // exportando o model
