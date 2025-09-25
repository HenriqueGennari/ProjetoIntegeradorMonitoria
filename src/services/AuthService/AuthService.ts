import { Aluno } from "../../generated/prisma"
import AlunoPrismaRepository from "../../repositories/Prisma/AlunoPrismaRepository"
import bcrypt from "bcrypt"

class AuthService{

    constructor(private _alunoPrismaRepository : AlunoPrismaRepository){}

    async validateUser(email : string, senha : string){

        const user = await this.existeUser(email) // verifica se o usuário existe

        const senhaValida = await bcrypt.compare(senha, user.senha)

        if(!user || !senhaValida){
             // verifica se a senha está certa
            throw new Error ("CREDENCIAIS_INVALIDAS");
        }

        return user;

    }

    async existeUser(email : string) : Promise<Aluno>{
        const user = await this._alunoPrismaRepository.findByEmail(email)
        
        if (!user){
            throw new Error ("USUARIO_INEXISTENTE")
        }

        return user;
    }
}
 
export default AuthService;