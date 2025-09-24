
const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.email || !data.senha) {
        mensagem.textContent = "Preencha todos os campos!";
        mensagem.style.color = "red";
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        // trata todos os erros enviados pelo backend
        if (result.erro) {
            switch (result.erro) {
                case "CREDENCIAIS_INVALIDAS":
                case "USUARIO_INEXISTENTE":
                    mensagem.textContent = "Email ou senha incorretos!";
                    break;
                case "DADOS_INCOMPLETOS":
                    mensagem.textContent = "Preencha todos os campos!";
                    break;
                default:
                    mensagem.textContent = "Erro ao tentar logar!";
            }
            mensagem.style.color = "red";
            return; // impede o redirecionamento
        }

        // se chegou aqui, login válido
        window.location.href = "sucesso.html";

    } catch (err) {
        mensagem.textContent = "Erro de rede ou servidor!";
        mensagem.style.color = "red";
    }
});
