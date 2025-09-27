// import express from "express";
import dotenv from "dotenv"
import routes from "./routes/rotasAluno";
import { Request, Response } from "express";


dotenv.config();

const express = require('express');
const cors = require("cors");
const server = express();

/*server.use(cors({
  origin: "https://projetointegeradormonitoria-1.onrender.com", // seu frontend no Render
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));*/

server.use(cors({
  origin: true
})); 

server.use(express.static("public")); //arquivos html
server.use(express.json());
server.use(express.urlencoded({extended : true}))


server.get("/", (req : Request, res : Response) => {
    res.redirect("/cadastro.html");
});

server.use(routes);

const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});
