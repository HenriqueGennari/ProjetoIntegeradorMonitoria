import express from "express";
import dotenv from "dotenv"
import routes from "./routes.js";

dotenv.config();

const server = express();


server.use(express.json());
server.use(express.urlencoded({extended : true}))

server.use(routes);

server.listen(process.env.PORT, () => {
    console.log(`Server rodando na porta ${process.env.PORT}`)
})