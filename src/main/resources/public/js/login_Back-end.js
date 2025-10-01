document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const credenciais = {
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value
    };
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credenciais)
    });
    if (res.ok) {
      const usuario = await res.json();
      alert("Bem-vindo " + usuario.nome);
      window.location.href = "index.html";
    } else {
      alert("Email ou senha incorretos!");
    }
});