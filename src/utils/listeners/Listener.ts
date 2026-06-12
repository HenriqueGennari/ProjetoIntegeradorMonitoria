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

        const salvarAuditoria = await auditoriaRepository.createMonitoria(dadosAuditoria);
    } catch (err: any) {
        console.log(err.message);
    }

    console.log("[Auditoria] Evento Monitoria:Criada recebido", payload);
});