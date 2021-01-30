const { response } = require('express');
const fs = require('fs');

const getCatalogo = (req, res = response) => {
    try {
        const movies = JSON.parse(fs.readFileSync('catalogo.json'));

        res.status(200).json({
            status: {
                ok: true,
                code: 200
            },
            movies
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

const reservar = (req, res = response) => {
    try {
        
        const datosReserva = req.body;

        const movies = JSON.parse(fs.readFileSync('catalogo.json'));

        const movieAReservar = movies.find(i => i.id == datosReserva.movieId);

        // Si la pelicula no existe en el catalogo
        if (!movieAReservar) {
            return res.status(404).json({
                status: {
                    ok: false,
                    code: 404
                },
                message: 'No se encontró una pelicula con ese id'
            });
        }

        
        // Si se agotó el stock de la pelicula a reservar del catalogo
        if (movieAReservar.stock == 0) {
            return res.status(404).json({
                status: {
                    ok: false,
                    code: 404
                },
                message: 'No hay stock disponible'
            });
        }
        
        const indexMovieAReservar = movies.findIndex( i => i.id == datosReserva.movieId );

        movies[indexMovieAReservar].stock--;

        fs.writeFileSync('catalogo.json', JSON.stringify(movies));

        const reservas = JSON.parse(fs.readFileSync('reservas.json'));

        const reservada = reservas.find(reserva => reserva.userId == datosReserva.userId && reserva.movieId == datosReserva.movieId );

        // Si un mismo usuario ya la reservó anteriormente
        if (reservada) {
            return res.status(404).json({
                status: {
                    ok: false,
                    code: 404
                },
                message: 'Usted ya ha reservado esta pelicula'
            });
        }

        reservas.push(datosReserva);

        fs.writeFileSync('reservas.json', JSON.stringify(reservas) );

        res.status(200).json({
            status: {
                ok: true,
                code: 200
            },
            message: 'Petición exitosa'
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

module.exports = {
    getCatalogo,
    reservar
}