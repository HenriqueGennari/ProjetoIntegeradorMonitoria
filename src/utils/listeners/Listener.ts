import { eventEmmiter } from "../events/Evento.js";

eventEmmiter.on("Monitoria:Criada", (payload) => {
    try {
        const dadosAuditoria = {
            /*usuarioId
            acao
            entidade
            entidadeId
            detalhes
            created_at*/
        }
    } catch (error) {
        
    }
  console.log("[Auditoria] Evento Monitoria:Criada recebido", payload);
});