import { PrismaClient } from "../../generated/prisma/client";
import type { Alunos } from "../../models/Alunos";

const prisma = new PrismaClient()


class AlunoPrismaRepository{
    async getAll() : Promise <Alunos[]>{
        const alunos = await prisma.aluno.findMany();

        return alunos;

    }
    async findByEmail(email : string) : Promise <Alunos | null>{
        const alunoEmail = await prisma.aluno.findFirst({
            where : {
                email : email
            }
        })

        return alunoEmail;
    }
    async getById(id : string) : Promise <Alunos | null>{
        const alunoEmail = await prisma.aluno.findFirst({
            where : {
                id : id
            }
        })

        return alunoEmail;
    }
    async create(data : Alunos) : Promise <Alunos>{
       
        const novoAluno = await prisma.aluno.create({
            data
        })
        console.log(novoAluno)
        return novoAluno;
    }
    async update(id : string, data : Alunos) : Promise <Alunos | null>{
        const alunoAtualizado = await prisma.aluno.update({
            data, where : {
                id : id
            }
        })

        return alunoAtualizado;

    }
    async delete(id : string) : Promise <Alunos>{
        const alunoApagado = await prisma.aluno.delete({
            where : {
                id : id
            }
        })

        return alunoApagado;
    }
}




export default AlunoPrismaRepository;