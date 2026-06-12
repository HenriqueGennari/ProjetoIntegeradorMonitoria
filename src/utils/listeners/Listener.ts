import AuditoriaPrismaRepository from "../../repositories/Prisma/AuditoriaPrismaRepository.js";
import { eventEmmiter } from "../events/Evento.js";

const auditoriaRepository = new AuditoriaPrismaRepository();

eventEmmiter.on("Monitoria:Criada", async (payload) => {
    try {
        const dadosAuditoria = {
            usuarioId: payload.usuarioId,
            acao: "CRIAR_MONITORIA",
            entidade: "Monitoria",
            entidadeId: payload.monitoriaId,
            detalhes: payload.monitoria // nome, data e monitor
        };

        await auditoriaRepository.createAuditoria(dadosAuditoria);
    } catch (err: any) {
        console.log(err.message);
    }

    console.log("[Auditoria] Evento Monitoria:Criada recebido");
});

eventEmmiter.on("Aluno:Login", async (payload) => {
    try {
        const dadosAuditoria = {
            usuarioId: payload.usuarioId,
            acao: payload.acao,
            entidade: payload.entidade,
            entidadeId: payload.entidadeId,
            detalhes: payload.detalhes // email e matricula
        };

        await auditoriaRepository.createAuditoria(dadosAuditoria);
    } catch (err: any) {
        console.log(err.message);
    }

    console.log("[Auditoria] Evento Aluno:Login recebido");
});