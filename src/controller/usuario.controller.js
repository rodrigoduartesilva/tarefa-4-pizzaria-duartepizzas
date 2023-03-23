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

        if (req.body.pizzas_fav === undefined) {
            req.body.pizzas_fav = { default: undefined }
        };

        if (req.body.bebida_fav === undefined) {
            req.body.bebida_fav = { default: undefined };
        }

        return res.status(201).send(await userService.createUserService(req.body));
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const updateUserController = async (req, res) => {
    try {
        return res.send(await userService.updateUserService(req.params.id, req.body));
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const removeUserController = async (req, res) => {
    try {
        const deletedUser = await userService.removeUserService(req.params.id);

        if (deletedUser == null) {
            res.status(404).send({ message: `Usuário não localizado em nossa base de dados.` });
        } else {
            res.status(200).send({ message: `Usuário deletado com sucesso.` });
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const addUserAddressController = async (req, res) => {
    try {
        const endereco = await userService.addUserAddressService(req.params.id, req.body);

        if (endereco.value == null) {
            res.status(400).send({ message: `Algo deu errado com o endereço, tente novamente.` });
        } else {
            res.status(201).send({ message: `Endereço adicionado com sucesso.` });
        }

    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const removeUserAddressController = async (req, res) => {
    try {
        const endereco = await userService.removeUserAddressService(req.body.id, req.body.addressId);
        let found = false;

        endereco.value.enderecos.map((valor, chave) => {
            if (valor._id == req.body.addressId) {
                found = true;
            }
        });

        if (found) {
            res.status(200).send({ message: `Endereço removido com sucesso.` });
        } else {
            res.status(400).send({ message: `O endereço não consta na base de dados para o Id ${req.body.id} informado, tente novamente.` });
        }
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const addUserFavPizzaController = async (req, res) => {
    try {
        res.status(201).send(await userService.addUserFavPizzaService(req.params.id, req.body));
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente.` });
    }
}

const removeUserFavPizzaController = async (req, res) => {
    try {
        res.status(201).send(await userService.removeUserFavPizzaService(req.params.id, req.body));
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