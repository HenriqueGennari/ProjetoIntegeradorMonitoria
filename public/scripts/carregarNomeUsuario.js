
async function carregarUsuario() {
    const token = localStorage.getItem('token');
    
    if (!token) return window.location.href = 'login.html';

    try {
        const res = await fetch('/home', {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (!res.ok) {
            localStorage.removeItem('token');
            
            return window.location.href = 'login.html';
        }

        const data = await res.json();
        
        document.getElementById('usuarioNome').innerText = data.nome;

    } catch (err) {
        localStorage.removeItem('token');
        window.alert("DEU ERRO")
        window.location.href = 'login.html';
    }
}

carregarUsuario();

