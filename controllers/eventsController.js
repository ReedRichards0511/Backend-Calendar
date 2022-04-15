const { response } = require('express');
const EventoModel = require('../models/EventoModel');



const getEventos = async (req, res = response) => {

    const eventos = await EventoModel.find().populate('user', 'name');

    res.status(200).json({
        eventos,
        ok: true,
        msg: 'Consulta exitosa',
    });
};


const crearEvento = async (req, res = response) => {

    const eventInput = req.body;
    const evento = new EventoModel(eventInput);

    try {

        evento.user = req.uid;

        const newEvent = await evento.save();

        res.status(201).json({
            evento: newEvent,
            msg: 'Evento creado',
            ok: true,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const acutalizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await EventoModel.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        if (evento.user.toString() !== uid) {

            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para actualizar este evento'
            });
        }


        const newEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await EventoModel.findOneAndUpdate(eventoId, newEvento, { new: true });

        res.status(200).json({
            evento: eventoActualizado,
            ok: true,
            msg: 'Evento actualizado',
        });




    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


};

const deleteEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await EventoModel.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        if (evento.user.toString() !== uid) {

            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para eliminar este evento'
            });
        }


        await EventoModel.findByIdAndDelete(eventoId);

        res.status(200).json({
            ok: true,
            msg: 'Evento eliminado exitosamente',
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};




module.exports = {
    getEventos,
    crearEvento,
    acutalizarEvento,
    deleteEvento
}