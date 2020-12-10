import Server from "./classes/server";
import userRoutes from "./routes/usuarios";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const server = new Server();


// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );



// Rutas de la app
server.app.use("/user", userRoutes);

// Conectar DB
mongoose.connect("mongodb://localhost:27017/fotosgram", {
    useNewUrlParser: true, useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log("Base de datos ONLINE");
    
})



// Levantar express
console.log(`Servidor corriendo en puerto ${ server.port }`);
server.start( ()=> {
    
} )