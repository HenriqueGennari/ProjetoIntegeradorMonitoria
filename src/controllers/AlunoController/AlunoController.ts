import type { Request, Response } from "express";
import AlunosService from "../../services/AlunoService/AlunoService";
import AlunoPrismaRepository from "../../repositories/Prisma/AlunoPrismaRepository";

const alunoService = new AlunosService(new AlunoPrismaRepository());

class AlunoController{


    async getAll(Req : Request, Res : Response) {
        try {
            const alunosDados = await alunoService.getAll();

            Res.status(200).json(alunosDados)

        } catch (err : any) {
            Res.status(400).json({error : err.message})
        }
    }
    async create(Req : Request, Res : Response){
        try {
            const dados = Req.body;

            if(!dados.nome || !dados.senha || !dados.email){
                Res.json("Os dados não foram preenchidos corretamente");
            }

            const dadosAlunos = await alunoService.create(dados)


            Res.status(200).json(dadosAlunos);
            
        } catch (err : any) {
            if (err.message === "EMAIL_EXISTE") {
                return Res.status(400).json({ erro: "EMAIL_EXISTE" });
            }
            return Res.status(500).json({ erro: "ERRO_INTERNO" });
        }
    }
    
    async getById(Req : Request, Res : Response){
        try {
            const {id} = Req.params;

            if (!id){
                Res.json("ID OBRIGATÓRIO CHAMPS")
            }

            const alunosDados = await alunoService.getById(id)

            Res.status(200).json(alunosDados)

        } catch (err : any) {
            Res.status(400).json({error : err.message})
        }
    }

    async update(Req : Request, Res : Response){
        try {
            const {id} = Req.params
            const dados = Req.body

            if (!dados || !id){
                Res.status(400).json("Dados e id obrigatórios!")
            }

            const alunoDados = await alunoService.update(id, dados)


            Res.status(200).json(alunoDados)
        } catch (err : any) {
            Res.status(400).json({error : err.message})
        }
    }
    async delete(Req : Request, Res : Response){
        try {

            const {id} = Req.params

            if (!id){
                Res.status(400).json("Aluno não cadastrado no banco de dados.")
            }

            const alunoDados = await alunoService.delete(id)

            Res.status(200).json(alunoDados)
            
        } catch (err : any) {
            Res.status(400).json({error : err.message})
        }
    }

    /*async getPageCadastrar(Req : Request, Res : Response) {
        Res.render("aluno");
    }*/
}


export default AlunoController;