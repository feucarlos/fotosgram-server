import { Schema, model, Document } from "mongoose"

const usuariosSchema = new Schema({
    nombre: {
      type: String,
        required: [true, "En nombre es necesario" ]
    },
    avatar: {
        type: String,
        default: "av-1.png"
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El email es necesario"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    }
}); 

interface IUsuario extends Document{
    nombre: string,
    email: string,
    password: string,
    avatar: string
};

export const Usuario = model<IUsuario>("Usuario", usuariosSchema );
