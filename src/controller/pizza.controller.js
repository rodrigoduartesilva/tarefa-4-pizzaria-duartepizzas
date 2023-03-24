const pizzaService = require('../service/pizza.service');

const findPizzaByIdController = async (req, res) => {
    try {
        const pizza = await pizzaService.findPizzaByIdService(req.params.id);

        if (!pizza) {
            return res.status(404).send({ message: 'Sabor de pizza não localizado em nossa base de dados.' });
        }

        return res.status(200).send(pizza);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const findAllPizzasController = async (req, res) => {
    try {
        if (await pizzaService.findAllPizzasService() == '') {
            return res.status(404).send('Não há pizzas cadastradas em nossa base de dados.');
        } else {
            return res.status(200).send(await pizzaService.findAllPizzasService());
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const createPizzaController = async (req, res) => {
    try {

        if (req.body.categorias === undefined) {
            req.body.categorias = { default: undefined }
        };

        const corpo = {
            ...req.body,
            userId: req.userId,
        }

        return res.status(201).send(await pizzaService.createPizzaService(corpo));
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const updatePizzaController = async (req, res) => {
    try {
        const updateId = await pizzaService.updatePizzaService(req.params.id);

        if (updateId == null) {
            return res.status(404).send({ message: `A pizza com o Id ${req.params.id} não foi localizado em nossa base de dados.` });
        } else {
            return res.status(200).send(await pizzaService.updatePizzaService(updateId, req.body));
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const deletePizzaController = async (req, res) => {
    try {
        const deletedPizza = await pizzaService.deletePizzaService(req.params.id);

        if (deletedPizza == null) {
            return res.status(404).send({ message: `Sabor de pizza não localizado em nossa base de dados.` });
        } else {
            return res.status(200).send({ message: `Sabor de pizza deletado com sucesso.` });
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const addCategoriaPizzaController = async (req, res) => {
    try {
        const categoria = await pizzaService.addCategoriaPizzaService(req.params.id, req.body);
        return res.status(200).send(categoria);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const removeCategoriaPizzaController = async (req, res) => {
    try {
        const categoriaRm = await pizzaService.removeCategoriaPizzaService(req.params.id, req.body);

        let found = false;

        categoriaRm.value.categorias.map((valor, chave) => {
            if (valor._id == req.body._id) {
                found = true;
            }
        });

        if (found) {
            return res.status(200).send({ message: `Categoria deletada com sucesso.` });
        } else {
            return res.status(404).send({ message: `Categoria não adicionada ao sabor de pizza informada em nossa base de dados.` });
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

module.exports = {
    findPizzaByIdController,
    findAllPizzasController,
    createPizzaController,
    updatePizzaController,
    deletePizzaController,
    addCategoriaPizzaController,
    removeCategoriaPizzaController
}