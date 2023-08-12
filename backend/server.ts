import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDb } from './config/dbConnection';
const port = process.env.PORT;
import cors from "cors";

const app = express();
connectDb().then(() => {
    console.log('Connected to DB');
});

const corsOptions: object = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))
app.use(express.json());
app.use("/api/users", require("./Users/user.route"));

app.listen(port, () => {
    console.log("Server running on port ", port);
})