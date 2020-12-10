import { Router, Request, Response } from "express";


const userRoutes = Router();

userRoutes.get("/prueba", (req: Request, res: Response)=> {
    res.json({
        ok: true,
        mensaje: "Todo funciona bien"
    })
});

export default userRoutes;