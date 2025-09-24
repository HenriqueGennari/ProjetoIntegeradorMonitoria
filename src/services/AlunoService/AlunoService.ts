import type { Alunos } from "../../models/Alunos";
import type AlunoPrismaRepository from "../../repositories/Prisma/AlunoPrismaRepository";


class AlunosService{

    // constructor(private _alunoRespository : AlunoRepository){}
    constructor(private _alunoPrismaRepository: AlunoPrismaRepository){}

    async getAll() : Promise<Alunos[]>{
        const alunosDados = await this._alunoPrismaRepository.getAll()

        return alunosDados;
    }
    
    async create(dados : Alunos) : Promise<Alunos>{
        
        const emailAluno = await this._alunoPrismaRepository.findByEmail(dados.email);


        if (emailAluno) {
            throw new Error ("EMAIL_EXISTE")
        } 

        const dadosAlunos = await this._alunoPrismaRepository.create(dados)

        return dadosAlunos;
    }
    async getById(id : string) : Promise <Alunos>{
        const alunoDados = await this._alunoPrismaRepository.getById(id)

        if (!alunoDados){
            throw new Error ("Aluno não cadastrado no banco de dados!")
        }

        return alunoDados;
    }

    async update(id : string, dados : Alunos) : Promise <Alunos>{
        const alunoDados = await this._alunoPrismaRepository.update(id, dados)

        if (!alunoDados){
            throw new Error ("Aluno não encontrado!")
        }

        return alunoDados;
    }
    async delete(id : string) : Promise <Alunos>{
        const alunoDados = await this._alunoPrismaRepository.delete(id)

        if (!alunoDados){
            throw new Error ("Esse aluno não existe!")
        }

        return alunoDados;
    }
}


export default AlunosService