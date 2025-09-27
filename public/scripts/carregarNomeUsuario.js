function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
}


function carregarUsuario() {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = 'login.html';

    const payload = parseJwt(token);
    if (!payload || !payload.nome) {
        localStorage.removeItem('token');
        return window.location.href = 'login.html';
    }

    document.getElementById('usuarioNome').innerText = payload.nome;
}

carregarUsuario();
