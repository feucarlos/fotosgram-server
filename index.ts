import Server from "./classes/server";
import userRoutes from "./routes/usuarios";
import postRoutes from "./routes/post";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';

const server = new Server();


// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// Fileupload
server.app.use( fileUpload() );

// Rutas de la app
server.app.use("/user", userRoutes);
server.app.use("/posts", postRoutes);


// Conectar DB
mongoose.connect("mongodb://localhost:27017/fotosgram", {
    useNewUrlParser: true, useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log("Base de datos ONLINE");
    
})




// Levantar express
console.log(`Servidor corriendo en puerto ${ server.port }`);
server.start( ()=> {} )
