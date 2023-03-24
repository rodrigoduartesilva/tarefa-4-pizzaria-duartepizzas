const bebidaService = require('../service/bebida.service');

const findBebidaByIdController = async (req, res) => {
    try {
        const bebida = await bebidaService.findBebidaByIdService(req.params.id);

        if (!bebida) {
            return res.status(404).send({ message: 'Bebida não localizado em nossa base de dados.' });
        }

        return res.status(200).send(bebida);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const findAllBebidasController = async (req, res) => {
    try {
        if (await bebidaService.findAllBebidasService() == '') {
            return res.status(404).send('Não há bebidas cadastradas em nossa base de dados.');
        } else {
            return res.status(200).send(await bebidaService.findAllBebidasService());
        }
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

        return res.status(201).send(await bebidaService.createBebidaService(corpo));
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const updateBebidaController = async (req, res) => {
    try {
        const updateId = await bebidaService.updateBebidaService(req.params.id);

        if (updateId == null) {
            return res.status(404).send({ message: `A bebida com o Id ${req.params.id} não foi localizado em nossa base de dados.` });
        } else {
            return res.status(200).send(await bebidaService.updateBebidaService(updateId, req.body));
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const deleteBebidaController = async (req, res) => {
    try {
        const deletedBebida = await bebidaService.deleteBebidaService(req.params.id);

        if (deletedBebida == null) {
            return res.status(404).send({ message: `Bebida não localizada em nossa base de dados.` });
        } else {
            return res.status(200).send({ message: `Bebida deletada com sucesso.` });
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const addCategoriaBebidaController = async (req, res) => {
    try {
        const categoria = await bebidaService.addCategoriaBebidaService(req.params.id, req.body);
        return res.status(200).send(categoria);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const removeCategoriaBebidaController = async (req, res) => {
    try {
        const categoriaRm = await bebidaService.removeCategoriaBebidaService(req.params.id, req.body);

        let found = false;

        categoriaRm.value.categorias.map((valor, chave) => {
            if (valor._id == req.body._id) {
                found = true;
            }
        });

        if (found) {
            return res.status(200).send({ message: `Categoria deletada com sucesso.` });
        } else {
            return res.status(404).send({ message: `Categoria não adicionada a bebida informada em nossa base de dados.` });
        }
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