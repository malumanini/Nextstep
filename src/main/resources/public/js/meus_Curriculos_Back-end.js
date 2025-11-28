document.addEventListener("DOMContentLoaded", async () => {
  const listaContainer = document.querySelector(".curriculos-lista");
  const idUsuario = localStorage.getItem("idUsuario");

  if (!idUsuario) {
    alert("Usuário não autenticado. Faça login novamente.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(`/curriculo/${idUsuario}` ,{
        method: "GET",
    });
    if (!response.ok) throw new Error("Erro ao buscar currículos");
    const curriculos = await response.json();

    listaContainer.innerHTML = ""; // limpa currículos estáticos

    if (curriculos.length === 0) {
      listaContainer.innerHTML = `<p>Nenhum currículo encontrado.</p>`;
      return;
    }

    curriculos.forEach((curriculo) => {
      const nome = curriculo.contato?.nome || "Sem nome";
      const cargo = curriculo.contato?.tituloProfissional || "Cargo não informado";
      const data = curriculo.dataCriacao?.replaceAll("-", "/") || "Data desconhecida";

      const card = document.createElement("div");
      card.classList.add("curriculo-card");
      card.innerHTML = `
        <div class="curriculo-info">
          <h3>${nome}</h3>
          <p>${cargo}</p>
          <span class="curriculo-data">Salvo em ${data}</span>
        </div>
        <div class="curriculo-acoes">
          <button class="btn btn-secondary" onclick="visualizarCurriculo(${curriculo.id})">Visualizar</button>
          <button class="btn btn-secondary" onclick="editarCurriculo(${curriculo.id})">Editar</button>
          <button class="btn btn-outline" onclick="excluirCurriculo(${curriculo.id})">Excluir</button>
        </div>
      `;

      listaContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Erro:", error);
    listaContainer.innerHTML = `<p>Erro ao carregar currículos.</p>`;
  }
});

// 🔹 Funções de ação (placeholders, implementaremos depois)
function visualizarCurriculo(id) {
  console.log("Visualizar currículo:", id);
  // redirecionar para página de visualização (implementaremos depois)
}

// Função de edição do currículo
function editarCurriculo(id) {
  window.location.href = `gerador_curriculo.html?id=${id}`;
}

function visualizarCurriculo(id) {
  window.location.href = `visualizar_curriculo.html?id=${id}`;
}

async function excluirCurriculo(id) {
  if (!confirm("Deseja realmente excluir este currículo?")) return;
  try {
    const resp = await fetch(`http://localhost:4567/curriculo/${id}`, {
      method: "DELETE"
    });
    if (resp.ok) {
      alert("Currículo excluído com sucesso!");
      location.reload();
    } else {
      alert("Erro ao excluir currículo.");
    }
  } catch (e) {
    console.error(e);
    alert("Erro de conexão com o servidor.");
  }
}
