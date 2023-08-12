const { mongoose } = require('mongoose');
export async function connectDb() : Promise<any> {
    try{
        await mongoose.connect(process.env.CONNECTION_STRING);
    } catch(error: any)  {
        console.error(error);
        process.exit(1);
    }
}

module.exports={connectDb}