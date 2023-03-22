const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario.controller');

const authMiddleware = require('../middleware/auth.middleware');
const { validaUsuario } = require('../middleware/validacao.middleware');

//Rotas GET
router.get('/findById/:id', authMiddleware, usuarioController.findUserByIdController);
router.get('/findAll', authMiddleware, usuarioController.findAllUsersController);

//Rotas POST
router.post('/create', validaUsuario, usuarioController.createUserController);
router.post('/addAddress/:id', authMiddleware, usuarioController.addUserAddressController);
router.post('/addFavPizza/:id', authMiddleware, usuarioController.addUserFavPizzaController);
router.post('/addFavBebida/:id', authMiddleware, usuarioController.addUserFavBebidaController);

//Rotas PUT
router.put('/update/:id', authMiddleware, validaUsuario, usuarioController.updateUserController);

//Rotas DELETE
router.delete('/remove/:id', authMiddleware, usuarioController.removeUserController);
router.delete('/removeAddress', authMiddleware, usuarioController.removeUserAddressController);
router.delete('/removeFavPizza/:id', authMiddleware, usuarioController.removeUserFavPizzaController);
router.delete('/removeFavBebida/:id', authMiddleware, usuarioController.removeUserFavBebidaController);

module.exports = router;