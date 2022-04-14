const { Router } = require('express');
const { getEventos, getEvento, crearEvento, acutalizarEvento, deleteEvento } = require('../controllers/eventsController');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(validarJWT); //le digo que todas las rutas tengan validacion de token

//todas /api/events


router.get('/', getEventos);


router.post('/', crearEvento);


router.put('/:id', acutalizarEvento);


router.delete('/:id', deleteEvento);



module.exports = router;