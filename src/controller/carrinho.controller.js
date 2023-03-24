const CarrinhoService = require('../service/carrinho.service');

const findCarrinhoByIdController = async (req, res) => {
    try {
        const carrinho = await CarrinhoService.findCarrinhoByIdService(req.params.id);

        if (!carrinho) {
            return res.status(404).send({ message: `O carrinho com o Id ${req.params.id} não foi localizado em nossa base de dados.` });
        }

        return res.status(200).send(carrinho);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` })
    }
}

const findAllCarrinhosController = async (req, res) => {
    try {
        if (await CarrinhoService.findAllCarrinhosService() == '') {
            return res.status(404).send('Não há carrinhos ativos em nossa base de dados.');
        } else {
            return res.status(200).send(await CarrinhoService.findAllCarrinhosService());
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` })
    }
}

const createCarrinhoController = async (req, res) => {
    try {
        const corpo = {
            ...req.body,
            userId: req.userId,
        }
        return res.status(201).send(await CarrinhoService.createCarrinhoService(corpo));
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` })
    }
}

const updateCarrinhoController = async (req, res) => {
    try {
        const updateId = await CarrinhoService.updateCarrinhoService(req.params.id);

        if (updateId == null) {
            return res.status(404).send({ message: `O carrinho com o Id ${req.params.id} não foi localizado em nossa base de dados.` });
        } else {
            return res.status(200).send(await CarrinhoService.updateCarrinhoService(updateId, req.body));
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` })
    }
}

const deleteCarrinhoController = async (req, res) => {
    try {
        const deletedCarrinho = await CarrinhoService.deleteCarrinhoService(req.params.id);

        if (deletedCarrinho == null) {
            return res.status(404).send({ message: `O carrinho com o Id ${req.params.id} não foi localizado em nossa base de dados.` });
        } else {
            return res.status(200).send({ message: `Carrinho deletado com sucesso.` });
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` })
    }
}

module.exports = {
    findCarrinhoByIdController,
    findAllCarrinhosController,
    createCarrinhoController,
    updateCarrinhoController,
    deleteCarrinhoController
}