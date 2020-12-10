"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRoutes = express_1.Router();
// Login
userRoutes.post("/login", (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userDb) => {
        if (err)
            throw err;
        if (!userDb) {
            return res.json({
                ok: false,
                mensaje: "Usuario o contraseña incorrectos"
            });
        }
        if (userDb.compararPassword(body.password)) {
            res.json({
                ok: true,
                token: "JKAHSDFLIU8WNCUIAALSKJDDU8"
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: "Usuario o contraseña incorrectos"
            });
        }
    });
});
// Crear usuario
userRoutes.post("/create", (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    usuario_model_1.Usuario.create(user).then(userDB => {
        res.json({
            ok: true,
            user
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = userRoutes;
