const bebidaService = require('../service/bebida.service');

const findBebidaByIdController = async (req, res) => {
    try {
        res.send(await bebidaService.findBebidaByIdService(req.params.id));
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const findAllBebidasController = async (req, res) => {
    try {
        res.send(await bebidaService.findAllBebidasService());
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const createBebidaController = async (req, res) => {
    try {

        if (req.body.categorias === undefined) {
            req.body.categorias = { default: undefined }
        };

        const corpo = {
            ...req.body,
            userId: req.userId,
        }

        res.status(201).send(await bebidaService.createBebidaService(corpo));
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const updateBebidaController = async (req, res) => {
    try {
        res.send(await bebidaService.updateBebidaService(req.params.id, req.body));
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const deleteBebidaController = async (req, res) => {
    try {
        res.send(await bebidaService.deleteBebidaService(req.params.id));
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const addCategoriaBebidaController = async (req, res) => {
    try {
        const categoria = await bebidaService.addCategoriaBebidaService(req.params.id, req.body);
        res.status(200).send(categoria);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const removeCategoriaBebidaController = async (req, res) => {
    try {
        const categoria = await bebidaService.removeCategoriaBebidaService(req.params.id, req.body);
        res.status(200).send(categoria);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

module.exports = {
    findBebidaByIdController,
    findAllBebidasController,
    createBebidaController,
    updateBebidaController,
    deleteBebidaController,
    addCategoriaBebidaController,
    removeCategoriaBebidaController
}