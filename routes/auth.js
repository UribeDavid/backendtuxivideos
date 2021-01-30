/* 
    Ruta: /api/v1/user
*/
const { Router } = require('express');

const { signIn, signUp } = require('../controllers/auth');

const router = Router();

router.post( '/login', signIn);

router.post( '/register', signUp);

module.exports = router;