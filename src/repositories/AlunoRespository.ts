import type { Alunos } from "../models/Alunos.js";
import { v4 as uuidv4 } from 'uuid'

class AlunoRepository{
    private alunos : Alunos[] = []

    constructor(){
        this.alunos = [
            {
                id : "b2bc1346-36f8-4865-9661-deafc4f0f6c8",
                password : "12345678",
                nome : "Henrique",
                email : "rique@gmail.com",
                telefone : "614453234"
            },
            {
                id : "b2bc1346-36f8-4865-9661-deafc4f0f6c2",
                password : "12345678",
                nome : "Fernando",
                email : "fernando@gmail.com",
                telefone : "614453234"
            },
        ]
    }

    async getAll() : Promise<Alunos[]>{
        return this.alunos;
    }
    async getById(id : string) : Promise <Alunos | null>{
        const idAluno = this.alunos.find((item) => item.id === id )

        if (!idAluno){
            return null
        }

        return idAluno;
    }
    async create(dados : Alunos) : Promise <Alunos> {
        
        dados.id = uuidv4();
        const alunosDados = this.alunos.push(dados);

        return dados;
    }
}


export default AlunoRepository;