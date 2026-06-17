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

eventEmmiter.on("Monitoria:Atualizada", async (payload) => {
    try {
        const dadosAuditoria = {
            usuarioId: payload.usuarioId,
            acao: payload.acao,
            entidade: payload.entidade,
            entidadeId: payload.entidadeId,
            detalhes: payload.detalhes // as alterações que mudaram
        };

        await auditoriaRepository.createAuditoria(dadosAuditoria);
    } catch (err: any) {
        console.log(err.message);
    }

    console.log("[Auditoria] Evento Monitoria:Atualizada recebido");
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

eventEmmiter.on("Aluno:Atualizado", async (payload) => {
    try {
        const dadosAuditoria = {
            usuarioId: payload.usuarioId,
            acao: payload.acao,
            entidade: payload.entidade,
            entidadeId: payload.entidadeId,
            detalhes: payload.detalhes // as alterações que mudaram
        };

        await auditoriaRepository.createAuditoria(dadosAuditoria);
    } catch (err: any) {
        console.log(err.message);
    }

    console.log("[Auditoria] Evento Aluno:Update recebido");
});

eventEmmiter.on("Inscricao:Criada", async (payload) => {
    try {
        const dadosAuditoria = {
            usuarioId: payload.usuarioId,
            acao: "CRIAR_INSCRICAO",
            entidade: "Inscricao",
            entidadeId: payload.inscricaoId,
            detalhes: payload.detalhes // alunoId e monitoriaId
        };

        await auditoriaRepository.createAuditoria(dadosAuditoria);
    } catch (err: any) {
        console.log(err.message);
    }

    console.log("[Auditoria] Evento Inscricao:Criada recebido");
});

eventEmmiter.on("Inscricao:Removida", async (payload) => {
    try {
        const dadosAuditoria = {
            usuarioId: payload.usuarioId,
            acao: "REMOVER_INSCRICAO",
            entidade: "Inscricao",
            entidadeId: payload.inscricaoId,
            detalhes: payload.detalhes // alunoId e monitoriaId
        };

        await auditoriaRepository.createAuditoria(dadosAuditoria);
    } catch (err: any) {
        console.log(err.message);
    }

    console.log("[Auditoria] Evento Inscricao:Removida recebido");
});