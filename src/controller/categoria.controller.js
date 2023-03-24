const categoriaService = require('../service/categoria.service');

const findCategoriaByIdController = async (req, res) => {
    try {
        const categoria = await categoriaService.findCategoriaByIdService(req.params.id);

        if (!categoria) {
            return res.status(404).send({ message: `A categoria com o Id ${req.params.id} não foi localizado em nossa base de dados.` });
        }

        return res.status(200).send(categoria);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` })
    }
}

const findAllCategoriaController = async (req, res) => {
    try {
        if (await categoriaService.findAllCategoriaService() == '') {
            return res.status(404).send('Não há categorias ativas em nossa base de dados.');
        } else {
            return res.status(200).send(await categoriaService.findAllCategoriaService());
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` })
    }
}

const createCategoriaController = async (req, res) => {
    try {
        return res.status(201).send(await categoriaService.createCategoriaService(req.body));
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` })
    }
}

const updateCategoriaController = async (req, res) => {
    try {
        const updateId = await categoriaService.updateCategoriaService(req.params.id);

        if (updateId == null) {
            return res.status(404).send({ message: `A categoria com o Id ${req.params.id} não foi localizado em nossa base de dados.` });
        } else {
            return res.status(200).send(await categoriaService.updateCategoriaService(updateId, req.body));
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` })
    }
}

const deleteCategoriaController = async (req, res) => {
    try {
        const deletedCategoria = await categoriaService.deleteCategoriaService(req.params.id);

        if (deletedCategoria == null) {
            return res.status(404).send({ message: `Categoria não localizada em nossa base de dados.` });
        } else {
            return res.status(200).send({ message: `Categoria deletada com sucesso.` });
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` })
    }
}

module.exports = {
    findCategoriaByIdController,
    findAllCategoriaController,
    createCategoriaController,
    updateCategoriaController,
    deleteCategoriaController
}