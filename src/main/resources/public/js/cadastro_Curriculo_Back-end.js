document.getElementById("curriculoForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = {
      nome: document.getElementById("nome").value,
      titulo: document.getElementById("titulo").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      linkedin: document.getElementById("linkedin").value,
      portfolio: document.getElementById("portfolio").value,
      resumo: document.getElementById("resumo").value,
      telefone: document.getElementById("telefone").value,
      telefone: document.getElementById("telefone").value,
      telefone: document.getElementById("telefone").value,
      telefone: document.getElementById("telefone").value,
      telefone: document.getElementById("telefone").value,
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