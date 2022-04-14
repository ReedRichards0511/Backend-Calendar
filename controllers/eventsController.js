const { response } = require('express');


const getEventos = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Todos los eventos traidos'
    });
};




const crearEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Evento creado'
    });
};

const acutalizarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Evento actualizado'
    });
};

const deleteEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Evento eliminado'
    });
};

module.exports ={
    getEventos,
    crearEvento,
    acutalizarEvento,
    deleteEvento
}