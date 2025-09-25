import { Request, Response } from "express";
import AuthService from "../../services/AuthService/AuthService";
import AlunoPrismaRepository from "../../repositories/Prisma/AlunoPrismaRepository";
import { generateJWT } from "../../utils/jwt/jwt";


const authService = new AuthService(new AlunoPrismaRepository());

class LoginController{

    async login(Req : Request, Res : Response){

        try {            

            const dados = Req.body

            if (!dados.email || !dados.senha){
                return Res.json({erro : "Os dados devem ser preenchidos!"})
            }

            const user = await authService.validateUser(dados.email, dados.senha)

            const token = await generateJWT({id : user.id, nome : user.nome, email : user.email} , "1h"); // o validateUser retorna o usuário do banco ( acessar authService para ver código)
            
            Res.status(200).json({user, token})


        } catch (err : any) {
            if(err.message === "CREDENCIAIS_INVALIDAS"){
                return Res.status(401).json({ erro: "CREDENCIAIS_INVALIDAS" });
            }
            if(err.message === "USUARIO_INEXISTENTE"){
                return Res.status(401).json({ erro: "USUARIO_INEXISTENTE" });
            }
            return Res.status(500).json({ erro: "ERRO_INTERNO" });
        }

        

    }
}

export default LoginController;