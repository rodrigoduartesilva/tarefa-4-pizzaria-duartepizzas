const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
    nome: { type: String, unique: true, required: true },
    descricao: { type: String, required: true },
    precoUnitario: { type: Number, required: true },
    imagem: { type: String, required: true },
    codigoBarra: { type: Number, unique: true, required: true },
    categorias: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, required: false, unique: false, ref: 'categorias' },
            createdAt: { type: Date, required: true, default: Date.now() }
        },
    ],
});

const Pizza = mongoose.model('pizzas', PizzaSchema);

module.exports = Pizza;