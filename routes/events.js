const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validate-campos');
const { getEventos, getEvento, crearEvento, acutalizarEvento, deleteEvento } = require('../controllers/eventsController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validarJWT); //le digo que todas las rutas tengan validacion de token

//todas /api/events


router.get('/', getEventos);


router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    ],
    validarCampos,
    crearEvento
);


router.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    ],
    validarCampos,
    acutalizarEvento
);


router.delete('/:id', deleteEvento);



module.exports = router;