import { Aluno } from "../../generated/prisma"
import AlunoPrismaRepository from "../../repositories/Prisma/AlunoPrismaRepository"

class AuthService{

    constructor(private _alunoPrismaRepository : AlunoPrismaRepository){}

    async validateUser(email : string, senha : string){
        const user = await this.existeUser(email)

        if(!user ||user.senha !== senha){
            throw new Error ("CREDENCIAIS_INVALIDAS");
        }

        return user;

    }

    private async existeUser(email : string) : Promise<Aluno>{
        const user = await this._alunoPrismaRepository.findByEmail(email)
        
        if (!user){
            throw new Error ("USUARIO_INEXISTENTE")
        }

        return user;
    }
}
 
export default AuthService;