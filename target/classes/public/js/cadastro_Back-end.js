document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      senha: document.getElementById("password").value
    };
    const res = await fetch("/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });
    if (res.ok) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "index.html";
    } else {
      alert("Erro ao cadastrar usuário!");
    }
});