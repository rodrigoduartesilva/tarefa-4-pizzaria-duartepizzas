const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario.controller');

const authMiddleware = require('../middleware/auth.middleware');
const { validaUsuario, validaId } = require('../middleware/validacao.middleware');

//Rotas GET
router.get('/findById/:id', authMiddleware, validaId, usuarioController.findUserByIdController);
router.get('/findAll', authMiddleware, usuarioController.findAllUsersController);

//Rotas POST
router.post('/create', validaUsuario, usuarioController.createUserController);
router.post('/addAddress/:id', authMiddleware, validaId, usuarioController.addUserAddressController);
router.post('/addFavPizza/:id', authMiddleware, validaId, usuarioController.addUserFavPizzaController);
router.post('/addFavBebida/:id', authMiddleware, validaId, usuarioController.addUserFavBebidaController);

//Rotas PUT
router.put('/update/:id', authMiddleware, validaId, validaUsuario, usuarioController.updateUserController);

//Rotas DELETE
router.delete('/remove/:id', authMiddleware, validaId, usuarioController.removeUserController);
router.delete('/removeAddress', authMiddleware, usuarioController.removeUserAddressController);
router.delete('/removeFavPizza/:id', authMiddleware, validaId, usuarioController.removeUserFavPizzaController);
router.delete('/removeFavBebida/:id', authMiddleware, validaId, usuarioController.removeUserFavBebidaController);

module.exports = router;