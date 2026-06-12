import { getAuthHeaders } from "../utils/getAuthHeaders.js";

const tabelaBody = document.querySelector("#tabelaAuditoria tbody");
const statTotal = document.getElementById("statTotal");

function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatarDetalhes(detalhes) {
    if (!detalhes) return "-";

    if (typeof detalhes === "object") {
        const partes = [];
        if (detalhes.nome) partes.push(`Nome: ${detalhes.nome}`);
        if (detalhes.data) partes.push(`Data: ${new Date(detalhes.data).toLocaleString("pt-BR")}`);
        if (detalhes.monitorId) partes.push(`Monitor: ${detalhes.monitorId}`);
        return partes.length ? partes.join(" | ") : JSON.stringify(detalhes);
    }

    return String(detalhes);
}

async function carregarAuditoria() {
    tabelaBody.innerHTML = '<tr><td colspan="6">Carregando registros...</td></tr>';

    try {
        const response = await fetch("/auditorias", {
            headers: getAuthHeaders(),
            credentials: "same-origin",
        });

        if (!response.ok) {
            throw new Error("Erro ao carregar auditoria");
        }

        const registros = await response.json();
        statTotal.textContent = registros.length;
        renderizarTabela(registros);
    } catch (err) {
        tabelaBody.innerHTML = `<tr><td colspan="6">Erro: ${err.message}</td></tr>`;
    }
}

function renderizarTabela(registros) {
    if (registros.length === 0) {
        tabelaBody.innerHTML = '<tr><td colspan="6">Nenhum registro encontrado.</td></tr>';
        return;
    }

    tabelaBody.innerHTML = registros.map((registro) => `
        <tr>
            <td>${formatarData(registro.criadoEm)}</td>
            <td>${registro.usuarioId}</td>
            <td>${registro.acao}</td>
            <td>${registro.entidade}</td>
            <td>${registro.entidadeId}</td>
            <td>${formatarDetalhes(registro.detalhes)}</td>
        </tr>
    `).join("");
}

carregarAuditoria();
