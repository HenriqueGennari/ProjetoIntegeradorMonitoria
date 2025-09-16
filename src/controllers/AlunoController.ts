import type { Request, Response } from "express";
import AlunosService from "../services/AlunoService.js";
import AlunoRepository from "../repositories/AlunoRespository.js";

const alunoService = new AlunosService(new AlunoRepository());

class AlunoController{


    async getAll(Req : Request, Res : Response) {
        try {
            const alunosDados = await alunoService.getAll();

            Res.status(200).json(alunosDados)

        } catch (err : any) {
            Res.status(400).json({error : err.message})
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
    async create(Req : Request, Res : Response){
        try {
            const dados = Req.body;

            if(!dados.nome || !dados.password || !dados.email){
                Res.json("Os dados não foram preenchidos corretamente");
            }

            const dadosAlunos = await alunoService.create(dados)

            Res.status(200).json(dadosAlunos);
            
        } catch (err : any) {
            Res.status(400).json({error : err.message})
        }
    }
    async update(Req : Request, Res : Response){
        try {
            
        } catch (err : any) {
            Res.status(400).json({error : err.message})
        }
    }
    async delete(Req : Request, Res : Response){
        try {
            
        } catch (err : any) {
            Res.status(400).json({error : err.message})
        }
    }
}


export default AlunoController;