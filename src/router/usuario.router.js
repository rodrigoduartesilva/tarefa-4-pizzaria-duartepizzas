const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario.controller');

router.get('/findById/:id');
router.get('/findAll');

router.post('/create');
router.post('/addAddress/:id');
router.post('/addFavPizza/:id');

router.put('/update/:id');

router.delete('/remove/:id');
router.delete('/removeAddress');
router.delete('/removeFavPizza');

module.exports = router;