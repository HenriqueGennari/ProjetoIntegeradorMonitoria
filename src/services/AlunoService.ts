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
        const dadosAlunos = await this._alunoRespository.create(dados)

        return dadosAlunos;
    }
}


export default AlunosService 