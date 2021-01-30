/* 
    Ruta: /api/v1/catalog/movies
*/
const { Router } = require('express');

const { getCatalogo, reservar } = require('../controllers/catalogo');

const router = Router();

router.get( '/movies', getCatalogo);

router.post( '/book', reservar);

module.exports = router;