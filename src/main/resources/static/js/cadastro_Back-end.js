document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
    };
    const res = await fetch("/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });
    const msg = await res.text();
    alert(msg);
});