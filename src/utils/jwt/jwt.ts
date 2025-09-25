import  jwt, { SignOptions }  from "jsonwebtoken"
import AlunoPrismaRepository from "../../repositories/Prisma/AlunoPrismaRepository";

import "dotenv/config"; 


const alunoPrismaRepository = new AlunoPrismaRepository();

export const generateJWT = async (aluno : {id : string, email : string, nome : string}, expiresIn : string): Promise <string> =>{
    
    const secret : string = process.env.JWT_SECRET || "default";
    const expiraEm = process.env.JWT_EXPIRES_IN;

    // const alunoBanco = await alunoPrismaRepository.findByEmail(aluno.email)

    const payloadDados = {
        id : aluno.id,
        nome : aluno.nome,
        email :aluno.email
    }


    const option : SignOptions = {
        expiresIn : expiresIn as SignOptions["expiresIn"]
        //aqui eu forço o Ts a aceitar o tipo do expiresIn criado por mim como se fosse o mesmo expiresIn do próprio signOpitons. Então estou dizendo: confia em mim, é do mesmo tipo!
    }

    const token = jwt.sign(payloadDados, secret, option)

    return token;
};