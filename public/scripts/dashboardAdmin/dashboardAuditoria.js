import { getAuthHeaders } from "../utils/getAuthHeaders.js";

const tbody = document.getElementById("corpoTabelaAuditoria");
const buscaInput = document.getElementById("buscaAuditoria");

let registrosCache = [];

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

        // detalhes de criação de monitoria
        if (detalhes.nome) partes.push(`Nome: ${detalhes.nome}`);
        if (detalhes.data) partes.push(`Data: ${new Date(detalhes.data).toLocaleString("pt-BR")}`);
        if (detalhes.monitorId) partes.push(`Monitor: ${detalhes.monitorId}`);

        // detalhes de login
        if (detalhes.email) partes.push(`Email: ${detalhes.email}`);
        if (detalhes.matricula) partes.push(`Matrícula: ${detalhes.matricula}`);

        return partes.length ? partes.join(" | ") : JSON.stringify(detalhes);
    }

    return String(detalhes);
}

async function carregarAuditoria() {
    tbody.innerHTML = `<tr><td colspan="6" class="sem-dados">Carregando...</td></tr>`;

    try {
        const response = await fetch("/auditorias", {
            headers: getAuthHeaders(),
            credentials: "same-origin",
        });

        if (!response.ok) {
            throw new Error("Erro ao carregar auditoria");
        }

        const registros = await response.json();
        registrosCache = registros;
        renderizarTabela(registros);
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="6" class="sem-dados">Erro: ${err.message}</td></tr>`;
    }
}

function renderizarTabela(registros) {
    if (!registros || registros.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="sem-dados">Nenhum registro encontrado</td></tr>`;
        return;
    }

    tbody.innerHTML = registros.map((registro) => `
        <tr>
            <td>${formatarData(registro.criadoEm)}</td>
            <td>${registro.usuario?.nome || registro.usuarioId}</td>
            <td>${registro.acao}</td>
            <td>${registro.entidade}</td>
            <td>${registro.entidadeId}</td>
            <td>${formatarDetalhes(registro.detalhes)}</td>
        </tr>
    `).join("");
}

function filtrarRegistros() {
    const termo = buscaInput.value.toLowerCase();

    const filtrados = registrosCache.filter((registro) => {
        const nomeUsuario = (registro.usuario?.nome || "").toLowerCase();
        const acao = (registro.acao || "").toLowerCase();
        const entidade = (registro.entidade || "").toLowerCase();
        const entidadeId = (registro.entidadeId || "").toLowerCase();

        return nomeUsuario.includes(termo) ||
            acao.includes(termo) ||
            entidade.includes(termo) ||
            entidadeId.includes(termo);
    });

    renderizarTabela(filtrados);
}

buscaInput?.addEventListener("input", filtrarRegistros);

carregarAuditoria();
