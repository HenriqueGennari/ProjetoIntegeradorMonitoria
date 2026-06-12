import { prisma } from "./client.js";

interface DadosAuditoria {
  usuarioId: string;
  acao: string;
  entidade: string;
  entidadeId: string;
  detalhes: any;
}

class AuditoriaPrismaRepository {
  // retorna todos os registros da tabela
  async getAll() {
    return await prisma.auditoria.findMany({
      orderBy: {
        criadoEm: "desc",
      },
    });
  }

  // cria log de auditoria de criação de monitoria
  async createMonitoria(payload: DadosAuditoria) {
    const auditoria = await prisma.auditoria.create({
      data: {
        usuarioId: payload.usuarioId,
        acao: payload.acao,
        entidade: payload.entidade,
        entidadeId: payload.entidadeId,
        detalhes: payload.detalhes,
      },
    });

    return auditoria;
  }
}

export default AuditoriaPrismaRepository;
