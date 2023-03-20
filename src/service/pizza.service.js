const Pizza = require('../model/Pizza');

const findPizzaByIdService = (id) => {
    return Pizza.findById(id);
}

const findAllPizzasService = () => {
    return Pizza.find();
}

const createPizzaService = (body) => {
    return Pizza.create(body);
}

const updatePizzaService = (id, body) => {
    return Pizza.findByIdAndUpdate(id, body, { returnDocument: 'after' });
}

const deletePizzaService = (id) => {
    return Pizza.findByIdAndRemove(id);
}

const addCategoriaPizzaService = (id, categoria) => {
    return Pizza.findOneAndUpdate(
        {
            _id: id
        },
        {
            $push: {
                categoria: {
                    _id: categoria._id,
                    createdAt: categoria.createdAt
                },
            },
        },
        {
            rawResult: true,
        }
    );
}

const removeCategoriaPizzaService = (categoria) => {
    return Pizza.findOneAndUpdate(
        {
            _id: categoria.id,
        },
        {
            $pull: {
                categoria: {
                    _id: categoria.idCategoria,
                },
            },
        },
        {
            rawResult: true,
        }
    );
}

module.exports = {
    findPizzaByIdService,
    findAllPizzasService,
    createPizzaService,
    updatePizzaService,
    deletePizzaService,
    addCategoriaPizzaService,
    removeCategoriaPizzaService
}