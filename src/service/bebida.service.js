const Bebida = require('../model/Bebida');

const findBebidaByIdService = (id) => {
    return Bebida.findById(id);
}

const findAllBebidasService = () => {
    return Bebida.find();
}

const createBebidaService = (body) => {
    return Bebida.create(body);
}

const updateBebidaService = (id, body) => {
    return Bebida.findByIdAndUpdate(id, body, { returnDocument: 'after' });
}

const deleteBebidaService = (id) => {
    return Bebida.findByIdAndRemove(id);
}

const addCategoriaBebidaService = (id, categoria) => {
    return Bebida.findOneAndUpdate(
        {
            _id: id
        },
        {
            $push: {
                categorias: {
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

const removeCategoriaBebidaService = (id, categoria) => {
    return Bebida.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $pull: {
                categorias: {
                    _id: categoria._id,
                },
            },
        },
        {
            rawResult: true,
        }
    );
}

module.exports = {
    findBebidaByIdService,
    findAllBebidasService,
    createBebidaService,
    updateBebidaService,
    deleteBebidaService,
    addCategoriaBebidaService,
    removeCategoriaBebidaService
}