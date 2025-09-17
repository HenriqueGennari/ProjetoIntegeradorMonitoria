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
    async findByEmail(email : string) : Promise <Alunos | null>{
        const emailAluno = this.alunos.find((item) => item.email === email)

        if (!emailAluno){
            return null
        } 

        return emailAluno;

    }
    async create(dados : Alunos) : Promise <Alunos> {
        
        dados.id = uuidv4();
        const alunosDados = this.alunos.push(dados);

        return dados;
    }
    async update(id : string, dados : Alunos) : Promise <Alunos | null>{
        console.log(id)
        const index = this.alunos.findIndex((item) => item.id === id)

        if (index == -1){
            return null
        } //findIndex retorna o indice, se retornar -1 é pq não há correspondências

        this.alunos[index] = dados
        dados.id = id // receber id no json e permitir atualização múltipla

        return dados;
    }
    async delete(id : string) : Promise <Alunos[] | null> {
        const index = this.alunos.findIndex((item) => item.id === id)

        if (index == -1) {
            return null
        }

        console.log(index)

        const alunoDeletado = this.alunos.splice(index,1)

        console.log(alunoDeletado)

        return alunoDeletado;
    }   
}


export default AlunoRepository;