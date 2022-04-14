const { response } = require('express');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const { Usuario } = require('../models/UsuarioModel');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email: email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe con ese correo'
            });
        }

        usuario = new Usuario(req.body);

        //encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //generar JWT

        const token =  await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token,
            msg: 'Registro exitoso',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hubo un error, Por favor hable con el administrador',
        });
    }

}



const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email: email });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese correo'
            });
        }

        //confirmar los passwords

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        //generar token

        const token =  await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token,
            msg: 'Login exitoso',
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, Por favor hable con el administrador',
        });
    }

   
}


const revalidarToken = async(req, res = response) => {

    const uid= req.uid;
    const name= req.name;

    //generar nuevo JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}