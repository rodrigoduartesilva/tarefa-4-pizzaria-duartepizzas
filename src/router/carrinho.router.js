const router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const { validaCarrinho, validaId } = require('../middleware/validacao.middleware');

const carrinhoController = require('../controller/carrinho.controller');

router.get('/find/:id', authMiddleware, validaId, carrinhoController.findCarrinhoByIdController);
router.get('/findAll', authMiddleware, carrinhoController.findAllCarrinhosController);

router.post('/create', authMiddleware, validaCarrinho, carrinhoController.createCarrinhoController);

router.put('/update/:id', authMiddleware, validaId, validaCarrinho, carrinhoController.updateCarrinhoController);

router.delete('/delete/:id', authMiddleware, validaId, carrinhoController.deleteCarrinhoController);

module.exports = router;