const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario.controller');

//Rotas GET
router.get('/findById/:id', usuarioController.findUserByIdController);
router.get('/findAll', usuarioController.findAllUsersController);

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
router.delete('/removeFavPizza', usuarioController.removeUserFavPizzaController);
router.delete('/removeFavBebida', usuarioController.removeUserFavBebidaController);

module.exports = router;