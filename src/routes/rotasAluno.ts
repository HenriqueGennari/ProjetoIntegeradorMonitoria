import {Router} from "express" 
import express from "express";
import path from "path";
import { Response, Request } from "express";

import AlunoController from "../controllers/AlunoController/AlunoController";
import LoginController from "../controllers/LoginController/LoginController";

import { authMiddleware } from "../middlewares/authMiddleware";
import { AuthRequest } from "../middlewares/authMiddleware"; // pegando a interface do authMiddleware para a rota que irá mostrar o nome do usuário


const alunoController = new AlunoController();
const loginController = new LoginController();

const routes = Router();

routes.use(express.static(path.join(__dirname, "..", "public"))); 

routes.get("/alunos" , alunoController.getAll)
routes.get("/aluno/:id" , alunoController.getById)
routes.post("/aluno" , alunoController.create)  // rota que o cadastro.html irá dar fetch
routes.put("/aluno/:id" , alunoController.update)
routes.delete("/aluno/:id" , alunoController.delete)


routes.post("/login", loginController.login)

routes.get("/home", authMiddleware, (req : AuthRequest, res : Response) => {
  res.json({ nome: req.user?.nome });
});

// routes.get("/", homeController.getHome)

export default routes