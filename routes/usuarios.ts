import { Router, Request, Response } from "express";
import { Usuario } from "../models/usuario.model";
import bcrypt from "bcrypt";
import Token from "../classes/token";

const userRoutes = Router();

// Login
userRoutes.post("/login", (req: Request, res: Response)=> {
    const body = req.body;

    Usuario.findOne({ email: body.email }, (err, userDB) => {
        if ( err ) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: "Usuario o contraseña incorrectos"
            });
        }

        if ( userDB.compararPassword(body.password) ){
            
            const userToken = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            
            res.json({
                ok: true,
                token: userToken
            });

        } else {
            return res.json({
                ok: false,
                mensaje: "Usuario o contraseña incorrectos"
            });
        }
    })
});

// Crear usuario
userRoutes.post("/create", (req: Request, res: Response)=> {

    const user = {
        nombre  : req.body.nombre,
        email   : req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar  : req.body.avatar
    }

    Usuario.create(user).then( userDB => {

        const userToken = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,
            token: userToken
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
            
        })
    });

});

// Actualizar usuario
userRoutes.post('/update', (req: Request, res: Response) => {
    res.json({
        ok: true
    });

});



export default userRoutes;