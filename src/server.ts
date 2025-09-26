// import express from "express";
import dotenv from "dotenv"
import routes from "./routes/rotasAluno";
import { Request, Response } from "express";

const express = require('express');
const cors = require('cors');

const server = express();

dotenv.config();

server.use(cors()); 

// const path = require("path");

// const viewsPath = path.join(__dirname, "views");

server.use(express.static("public")); //arquivos html

server.use(express.json());
server.use(express.urlencoded({extended : true}))


// server.set("views", viewsPath);
// server.set('view engine', 'ejs');
// server.use(express.static(viewsPath));

server.get("/", (req : Request, res : Response) => {
    res.redirect("/cadastro.html");
});

server.use(routes);

const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});
