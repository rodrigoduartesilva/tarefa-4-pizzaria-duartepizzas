const router = require('express').Router();

const pizzaController = require('../controller/pizza.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validaPizza, validaId } = require('../middleware/validacao.middleware');

router.get('/find/:id', authMiddleware, validaId, pizzaController.findPizzaByIdController);
router.get('/findAll', authMiddleware, pizzaController.findAllPizzasController);

router.post('/create', authMiddleware, validaPizza, pizzaController.createPizzaController);
router.post('/addCategoria/:id', authMiddleware, validaId, pizzaController.addCategoriaPizzaController);

router.put('/update/:id', authMiddleware, validaId, validaPizza, pizzaController.updatePizzaController);

router.delete('/delete/:id', authMiddleware, validaId, pizzaController.deletePizzaController);
router.delete('/removeCategoria/:id', authMiddleware, pizzaController.removeCategoriaPizzaController);

module.exports = router;