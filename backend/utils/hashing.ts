const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

export class Utils {
    async hashPassword (password : string) : Promise<String> {
        return await bcrypt.hash(password, 10);
    }
    
    async verifyPassword (password1 : string, password2 : string) : Promise<Boolean> {
        return await bcrypt.compare(password1, password2);
    }

    createJwtToken(username: string, email: string, id: number) : any {
        return jwt.sign({
            user: {
                username: username,
                email: email,
                id: id
            },
        }, 
        process.env.ACCESS_TOKEN,
        { expiresIn: process.env.JWT_EXPIRY_TIME }
        );
    }
    
}


