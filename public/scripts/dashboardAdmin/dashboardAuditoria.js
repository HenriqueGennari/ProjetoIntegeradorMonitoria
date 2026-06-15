import { getAuthHeaders } from "../utils/getAuthHeaders.js";

const tbody = document.getElementById("corpoTabelaAuditoria");
const buscaInput = document.getElementById("buscaAuditoria");
const filtroDataInput = document.getElementById("filtroDataAuditoria");

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

function formatarDataISO(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
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

        // detalhes de inscrição/desinscrição
        if (detalhes.aluno) partes.push(`Aluno: ${detalhes.aluno}`);
        if (detalhes.monitoria) partes.push(`Monitoria: ${detalhes.monitoria}`);

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
        filtrarRegistros();
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
    const dataFiltro = filtroDataInput.value;

    const filtrados = registrosCache.filter((registro) => {
        const nomeUsuario = (registro.usuario?.nome || "").toLowerCase();
        const acao = (registro.acao || "").toLowerCase();
        const entidade = (registro.entidade || "").toLowerCase();
        const entidadeId = (registro.entidadeId || "").toLowerCase();

        const correspondeTermo = nomeUsuario.includes(termo) ||
            acao.includes(termo) ||
            entidade.includes(termo) ||
            entidadeId.includes(termo);

        let correspondeData = true;
        if (dataFiltro) {
            const dataRegistro = new Date(registro.criadoEm);
            const dataRegistroStr = formatarDataISO(dataRegistro);
            correspondeData = dataRegistroStr === dataFiltro;
        }

        return correspondeTermo && correspondeData;
    });

    renderizarTabela(filtrados);
}

// Define a data atual como padrão no filtro
filtroDataInput.value = formatarDataISO(new Date());

buscaInput?.addEventListener("input", filtrarRegistros);
filtroDataInput?.addEventListener("change", filtrarRegistros);

carregarAuditoria();
