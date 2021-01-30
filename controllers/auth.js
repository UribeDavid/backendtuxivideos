const { response } = require('express');
const fs = require('fs');

const signIn = (req, res = response) => {
    try {
        const signInData = req.body;

        const usuarios = JSON.parse(fs.readFileSync('usuarios.json'));

        const user = usuarios.find(user => user.email == signInData.email );

        if (!user) {
            return res.status(404).json({
                status: {
                    ok: false,
                    cod: 404
                },
                message: 'Cliente no encontrado'
            });
        } else if ( user.password != signInData.password ) {
            return res.status(404).json({
                status: {
                    ok: false,
                    cod: 404
                },
                message: 'Correo o contraseña incorrecto(s)'
            });
        }

        res.status(200).json({
            status: {
                ok: true,
                code: 200
            },
            message: 'LoggedIn',
            user
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            status: {
                ok: false,
                cod: 500
            },
            message: 'Error interno del servidor'
        });
    }
}

const signUp = (req, res = response) => {
    try {
        const datosUser = req.body;

        const usuarios = JSON.parse(fs.readFileSync('usuarios.json'));

        const existe = usuarios.find( user => {
            return user.id == datosUser.id
        } );

        if (existe) {
            return res.status(404).json({
                status: {
                    ok: false,
                    cod: 404
                },
                message: 'Cliente ya existe'
            })
        }

        usuarios.push(datosUser)

        fs.writeFileSync('usuarios.json', JSON.stringify(usuarios));

        res.status(201).json({
            status: {
                ok: true,
                code: 201
            },
            message: 'Cliente creado de forma exitosa',
            user: datosUser
        });

    } catch (error) {
        console.log(error)

        res.status(500).json({
            status: {
                ok: false,
                cod: 500
            },
            message: 'Error interno del servidor'
        });
    }
}

module.exports = {
    signIn,
    signUp
}