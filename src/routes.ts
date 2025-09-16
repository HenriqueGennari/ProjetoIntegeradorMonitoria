import {Router} from "express" 
import AlunoController from "./controllers/AlunoController.js";

const alunoController = new AlunoController();

const routes = Router();


routes.get("/alunos" , alunoController.getAll)
routes.get("/alunos/:id" , alunoController.getById)
routes.post("/alunos/" , alunoController.create)
routes.put("/alunos/:id" , alunoController.update)
routes.delete("/alunos/:id" , alunoController.delete)


export default routes