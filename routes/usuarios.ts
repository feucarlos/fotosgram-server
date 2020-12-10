import { Router, Request, Response } from "express";
import { Usuario } from "../models/usuario.model";
import bcrypt from "bcrypt";

const userRoutes = Router();

// Login
userRoutes.post("/login", (req: Request, res: Response)=> {
    const body = req.body;

    Usuario.findOne({ email: body.email }, (err, userDb) => {
        if ( err ) throw err;

        if (!userDb) {
            return res.json({
                ok: false,
                mensaje: "Usuario o contraseña incorrectos"
            });
        }

        if ( userDb.compararPassword(body.password) ){
            res.json({
                ok: true,
                token: "JKAHSDFLIU8WNCUIAALSKJDDU8"
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
        res.json({
            ok: true,
            user
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
            
        })
    });

});


export default userRoutes;