import { Response, Router } from "express";
import { verificaToken } from "../middlewares/autenticacion";
import { Post } from "../models/post.model";


const postRoutes = Router();

// Obtener post por página
postRoutes.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = (pagina -1) * 10;

    const post  = await Post.find()
                            .sort({ _id: -1 })
                            .skip(skip)
                            .limit(10)
                            .populate('usuario', '-password')
                            .exec();

    res.json({
        ok: true,
        pagina,
        post
    });
});


// Crear Post
postRoutes.post('/', [verificaToken], (req: any, res: Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;

    Post.create(body).then(async postDB => {
        
        await  postDB.populate('usuario', '-password').execPopulate();
        
        res.json({
            ok: true,
            post: postDB
        });
        
    }).catch( err => {
        res.json( err );
    });
    
});


export default postRoutes;