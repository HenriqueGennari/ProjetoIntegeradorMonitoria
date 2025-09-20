import {Router} from "express" 
import AlunoController from "./controllers/AlunoController";
import HomeController from "./controllers/HomeController";

const alunoController = new AlunoController();
const homeController = new HomeController();

const routes = Router();

// routes.get("/alunos/cadastrar" , alunoController.getPageCadastrar)

routes.get("/alunos" , alunoController.getAll)
routes.get("/aluno/:id" , alunoController.getById)
routes.post("/aluno" , alunoController.create)
routes.put("/aluno/:id" , alunoController.update)
routes.delete("/aluno/:id" , alunoController.delete)

// routes.get("/", homeController.getHome)

export default routes