const userService = require('../service/usuario.service');


const findUserByIdController = async (req, res) => {
    try {
        const user = await userService.findUserByIdService(req.params.id);

        if (!user) {
            return res.status(404).send({ message: 'Usuário não localizado em nossa base de dados.' });
        }

        return res.status(200).send(user);

    } catch (err) {
        if (err.kind == 'ObjectId') {
            console.log(err.kind == 'ObjectId');
            return res.status(400).send({ message: `O id informado está incorreto, tente novamente.` });
        }

        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const findAllUsersController = async (req, res) => {
    try {
        return res.status(200).send(await userService.findAllUsersService());
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const createUserController = async (req, res) => {
    try {
        const body = req.body;
        if (!body.nome) {
            return res.status(400).send({ message: `O campo 'nome' precisa ser preenchido.` });
        }

        return res.status(201).send(await userService.createUserService(body));

    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const updateUserController = async (req, res) => {
    try {
        const body = req.body;
        if (!body.nome) {
            return res.status(400).send({ message: `O campo 'nome' precisa ser preenchido.` });
        }

        return res.send(await userService.updateUserService(req.params.id, body));

    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const removeUserController = async (req, res) => {
    try {
        const deletedUser = await userService.removeUserService(req.params.id);

        if (deletedUser.deletedCount > 0) {
            res.status(200).send({ message: `Usuário deletado com sucesso.` })
        } else {
            res.status(404).send({ message: `Usuário não localizado em nossa base de dados.` });
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const addUserAddressController = async (req, res) => {
    try {

    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const removeUserAddressController = async (req, res) => {
    try {

    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const addUserFavPizzaController = async (req, res) => {
    try {

    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const removeUserFavPizzaController = async (req, res) => {
    try {

    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const addUserFavBebidaController = async (req, res) => {
    try {

    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const removeUserFavBebidaController = async (req, res) => {
    try {

    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

module.exports = {
    findUserByIdController,
    findAllUsersController,
    createUserController,
    updateUserController,
    removeUserController,
    addUserAddressController,
    removeUserAddressController,
    addUserFavPizzaController,
    removeUserFavPizzaController,
    addUserFavBebidaController,
    removeUserFavBebidaController
}