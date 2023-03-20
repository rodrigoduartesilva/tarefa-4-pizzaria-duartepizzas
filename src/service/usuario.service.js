const Usuario = require('../model/Usuario');

const findUserByIdService = (id) => {
    return Usuario.findById(id);
}

const findAllUsersService = () => {
    return Usuario.find();
}

const createUserService = (body) => {
    return Usuario.create(body);
}

const updateUserService = (id, body) => {
    return Usuario.findByIdAndUpdate(id, body, { returnDocument: 'after' });
}

const removeUserService = (id) => {
    return Usuario.findByIdAndRemove(id);
}

const addUserAddressService = (id, endereco) => {
    return Usuario.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $push: {
                enderecos: endereco
            }
        },
        {
            rawResult: true,
        }
    );
}

const removeUserAddressService = (id, addressId) => {
    return Usuario.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $pull: {
                enderecos: {
                    _id: addressId
                }
            }
        },
        {
            rawResult: true,
        }
    );
}

const addUserFavPizzaService = (id, pizzas) => {

}

const removeUserFavPizzaService = (pizzas) => {

}

const addUserFavBebidaService = (id, bebidas) => {

}

const removeUserFavBebidaService = (bebidas) => {

}

module.exports = {
    findUserByIdService,
    findAllUsersService,
    createUserService,
    updateUserService,
    removeUserService,
    addUserAddressService,
    removeUserAddressService,
    addUserFavPizzaService,
    removeUserFavPizzaService,
    addUserFavBebidaService,
    removeUserFavBebidaService
}