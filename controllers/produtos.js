// Toda regra para os produtos ficam aqui
const produtos = require('../model/produtos'); //requerindo o produtos dentro do model, lá esta exportando o model(table)

exports.listarProdutos = (req, resp) => {
    produtos.find({}, (erro, dados) => {
        if(erro) {
           return resp.send({mensagem: '[ERRO]: Não foi possível listar os produtos!'});
        } else {
           return resp.send({mensagem: '[SUCESSO]: Produtos listados com sucesso!', dados: dados});
        }
    }
    );
}

exports.adicionarProduto = function(req, resp) {
    const novoProduto = req.query;
    if(!novoProduto.nome || !novoProduto.valor){
        resp.send({mensagem: '[ERRO]: Informar nome e preço!'});
    } else{
        produtos.create(novoProduto, (erro, dados) => {
            if(erro) // quando se tem uma linha do if é opcional usar {}, caso seja falso, não vai entrar e vai para a linha de baixo, na linha 23
                return resp.send({mensagem: '[ERRO]: Não foi possível adicionar o produto!'});
            return resp.send({mensagem: '[SUCESSO]: Produto adicionado com sucesso!', dados: dados});
        })
        resp.send({mensagem: '[SUCESSO]: Tudo certo!'});
    }
}

exports.removerProduto = function(req, resp){
    const produto = req.query;
    if(!produto.nome)
       return resp.send({mensagem: '[ERRO]: Informar nome do produto!'});
    produtos.findOneAndDelete({nome: produto.nome}, (erro, dados) =>{
        if(erro)
            return resp.send({mensagem: '[ERRO]: Na remoção'})
        if(dados != null)
            return resp.send({mensagem: '[SUCESSO]: Produto removido com sucesso!'})
        return resp.send({mensagem: '[ERRO]: produtos não existe.'})
    });
}

exports.buscarProdutos = function(req, resp){
    let  { consulta } = req.query;
    consulta = JSON.parse(consulta);
    produtos.find(consulta, (erro, dados) => {
        if(erro)
            return resp.send({mensagem: '[ERRO]: Não foi possível buscar o produto!'});
    }
    );
}