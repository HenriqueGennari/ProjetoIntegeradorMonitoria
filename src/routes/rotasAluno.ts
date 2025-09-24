import {Router} from "express" 
import AlunoController from "../controllers/AlunoController/AlunoController";
import LoginController from "../controllers/LoginController/LoginController";


const alunoController = new AlunoController();
const loginController = new LoginController();


const routes = Router();

// routes.get("/alunos/cadastrar" , alunoController.getPageCadastrar)

routes.get("/alunos" , alunoController.getAll)
routes.get("/aluno/:id" , alunoController.getById)
routes.post("/aluno" , alunoController.create)
routes.put("/aluno/:id" , alunoController.update)
routes.delete("/aluno/:id" , alunoController.delete)


routes.post("/login", loginController.login)

// routes.get("/", homeController.getHome)

export default routes