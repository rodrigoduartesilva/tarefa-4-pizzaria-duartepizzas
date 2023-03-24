const pedidoService = require('../service/pedido.service');

const findPedidoByIdController = async (req, res) => {
    try {
        const pedido = await pedidoService.findPedidoByIdService(req.params.id);

        if (!pedido) {
            return res.status(404).send({ message: `O pedido com o Id ${req.params.id} não foi localizado em nossa base de dados.` });
        }

        return res.status(200).send(pedido);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const findAllPedidosController = async (req, res) => {
    try {
        if (await pedidoService.findAllPedidosService() == '') {
            return res.status(404).send('Não há pedidos ativos em nossa base de dados.');
        } else {
            return res.status(200).send(await pedidoService.findAllPedidosService());
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const createPedidoController = async (req, res) => {
    try {
        const corpo = {
            ...req.body,
            userId: req.userId
        }
        return res.status(201).send(await pedidoService.createPedidoService(corpo));
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const deletePedidoController = async (req, res) => {
    try {
        const deletedPedido = await pedidoService.deletePedidoService(req.params.id);

        if (deletedPedido == null) {
            return res.status(404).send({ message: `O pedido com o Id ${req.params.id} não foi localizado em nossa base de dados.` });
        } else {
            return res.status(200).send({ message: `Pedido deletado com sucesso.` });
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const updateStatusPedidoController = async (req, res) => {
    try {
        const statusPedido = await pedidoService.updateStatusPedidoService(req.params.id);

        if (statusPedido == null) {
            return res.status(404).send({ message: `O pedido com o Id ${req.params.id} não foi localizado em nossa base de dados.` });
        } else {
            return res.status(200).send(statusPedido);
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

module.exports = {
    findPedidoByIdController,
    findAllPedidosController,
    createPedidoController,
    deletePedidoController,
    updateStatusPedidoController
}