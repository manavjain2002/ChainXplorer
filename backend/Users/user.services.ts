const { UserSchema } = require('./user.schema')
const { UserInterface } = require('./user.interface')
require('dotenv').config();

export class UserServices {

    async findUser(data: any) : Promise<typeof UserInterface>{
        return await UserSchema.findAll(data);
    }

    async findUserByEmail (email: string) : Promise<typeof UserInterface> {
        return await UserSchema.findOne({ email });
    }
    
    async findUserByName (username: string) : Promise<typeof UserInterface> {
        return await UserSchema.findOne({ username });
    }

    async findUserByWalletAddress (walletAddress: string) : Promise<typeof UserInterface> {
        return await UserSchema.findOne({ walletAddress });
    }

    async findUserById (id: number) : Promise<typeof UserInterface> {
        return await UserSchema.findOne({ _id: id });
    }
    
    async createUser (data: typeof UserInterface) : Promise<typeof UserInterface> {
        return await UserSchema.create(data)
    }

    async updateUser(id: number, data: typeof UserInterface) : Promise<typeof UserInterface> {
        return await UserSchema.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteUser(id: number) : Promise<typeof UserInterface> {
        return await UserSchema.findByIdAndDelete(id);
    }
    
}