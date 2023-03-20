const router = require('express').Router();

const pizzaController = require('../controller/pizza.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/find/:id', authMiddleware, pizzaController.findPizzaByIdController);
router.get('/findAll', authMiddleware, pizzaController.findAllPizzasController);

router.post('/create', authMiddleware, pizzaController.createPizzaController);

router.put('/update/:id', authMiddleware, pizzaController.updatePizzaController);

router.delete('/delete/:id', authMiddleware, pizzaController.deletePizzaController);

module.exports = router;