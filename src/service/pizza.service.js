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

module.exports = {
    findPizzaByIdService,
    findAllPizzasService,
    createPizzaService,
    updatePizzaService,
    deletePizzaService
}