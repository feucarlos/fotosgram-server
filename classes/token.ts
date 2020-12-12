import jwt from 'jsonwebtoken';

export default class Token {
    private static seed: string = 'seedpersonalizadogurc741127';
    private static caducidad: string = '3d';

    constructor(){}

    static getJwtToken( payload: any): string {
        return jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad});
    }

    static comprobarToken( userToken: string ) {

        return new Promise( (resolve, reject) => {
            
            jwt.verify( userToken, this.seed, (err, decoded ) => {
                if (err) {
                    // Token no válido
                    reject();
                } else{
                    // Token válido
                    resolve( decoded );
                }
            });
        });

    }

}