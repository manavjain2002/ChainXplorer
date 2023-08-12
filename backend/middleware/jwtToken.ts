const jwt = require('jsonwebtoken')
require('dotenv').config();

export function validateToken(req: any, res: any, next: any) : any {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1];
        try{
            jwt.verify(token, process.env.ACCESS_TOKEN, (err: any, decoded: any) => {
                if(err){
                    res.status(401).json({
                        message: "User not authorized"
                    });
                } 
    
                req.user = decoded.user;
                next();
            })
        } catch (e) {
            console.log(e);
        }
        
        if(!token){
            res.status(401).json({
                message: 'User not authorized or token is missing'
            });
        }
    }
}

module.exports = { validateToken } 