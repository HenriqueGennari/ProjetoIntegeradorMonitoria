import type { Alunos } from "../models/Alunos.js";
import type AlunoRepository from "../repositories/AlunoRespository.js";


class AlunosService{

    constructor(private _alunoRespository : AlunoRepository){}

    async getAll() : Promise<Alunos[]>{
        const alunosDados = await this._alunoRespository.getAll()

        return alunosDados;
    }
    async getById(id : string) : Promise <Alunos>{
        const alunoDados = await this._alunoRespository.getById(id)

        if (!alunoDados){
            throw new Error ("Aluno não cadastrado no banco de dados!")
        }

        return alunoDados;
    }
    async create(dados : Alunos) : Promise<Alunos>{
        const emailAluno = await this._alunoRespository.findByEmail(dados.email);

        if (emailAluno) {
            throw new Error ("Email já cadastrado!")
        } 

        const dadosAlunos = await this._alunoRespository.create(dados)

        return dadosAlunos;
    }
    async update(id : string, dados : Alunos) : Promise <Alunos>{
        const alunoDados = await this._alunoRespository.update(id, dados)

        if (!alunoDados){
            throw new Error ("Aluno não encontrado!")
        }

        return alunoDados;
    }
    async delete(id : string) : Promise <Alunos[]>{
        const alunoDados = await this._alunoRespository.delete(id)

        if (!alunoDados){
            throw new Error ("Esse aluno não existe!")
        }

        return alunoDados;
    } 
}


export default AlunosService