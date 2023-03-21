const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario.controller');

const authMiddleware = require('../middleware/auth.middleware');

//Rotas GET
router.get('/findById/:id', authMiddleware, usuarioController.findUserByIdController);
router.get('/findAll', authMiddleware, usuarioController.findAllUsersController);

//Rotas POST
router.post('/create', usuarioController.createUserController);
router.post('/addAddress/:id', usuarioController.addUserAddressController);
router.post('/addFavPizza/:id', usuarioController.addUserFavPizzaController);
router.post('/addFavBebida/:id', usuarioController.addUserFavBebidaController);

//Rotas PUT
router.put('/update/:id', usuarioController.updateUserController);

//Rotas DELETE
router.delete('/remove/:id', usuarioController.removeUserController);
router.delete('/removeAddress', usuarioController.removeUserAddressController);
router.delete('/removeFavPizza/:id', usuarioController.removeUserFavPizzaController);
router.delete('/removeFavBebida/:id', usuarioController.removeUserFavBebidaController);

module.exports = router;