const router = require('express').Router();

const bebidaController = require('../controller/bebida.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validaBebida, validaId } = require('../middleware/validacao.middleware');

router.get('/find/:id', authMiddleware, validaId, bebidaController.findBebidaByIdController);
router.get('/findAll', authMiddleware, bebidaController.findAllBebidasController);

router.post('/create', authMiddleware, validaBebida, bebidaController.createBebidaController);
router.post('/addCategoria/:id', authMiddleware, validaId, bebidaController.addCategoriaBebidaController);

router.put('/update/:id', authMiddleware, validaId, validaBebida, bebidaController.updateBebidaController);

router.delete('/delete/:id', authMiddleware, validaId, bebidaController.deleteBebidaController);
router.delete('/removeCategoria/:id', authMiddleware, bebidaController.removeCategoriaBebidaController);

module.exports = router;