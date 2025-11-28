document.addEventListener("DOMContentLoaded", () => {
  const aprimorarResumoBtn = document.getElementById("aprimorar-resumo");
  const avaliarAtsBtn = document.getElementById("avaliar-ats-btn");
  const scoreModal = document.getElementById("ats-score-modal");
  const fecharModalBtn = document.getElementById("fechar-modal-ats");
  const statusMessage = document.getElementById("ia-status-message"); // Elemento para feedback de Aprimorar

  // Função auxiliar para coletar todos os dados do formulário
  const coletarDadosCurriculo = () => {
    const resumo = document.getElementById("descricao_resumo").value;

    const experienciasItens = [
      ...document.querySelectorAll("#experiencia-lista .item-experiencia"),
    ];
    const experiencias = experienciasItens.map((item) => ({
      empresa: item.querySelector('input[name="empresa"]').value,
      cargo: item.querySelector('input[name="cargo"]').value,
      dataInicio: item.querySelector('input[name="dataInicio"]').value,
      dataFim: item.querySelector('input[name="dataFim"]').value,
      descricao: item.querySelector('textarea[name="descricao"]').value,
    }));

    const formacoesItens = [
      ...document.querySelectorAll("#formacao-lista .item-formacao"),
    ];
    const formacao = formacoesItens.map((item) => ({
      instituicao: item.querySelector('input[name="instituicao"]').value,
      curso: item.querySelector('input[name="curso"]').value,
      dataInicio: item.querySelector('input[name="dataInicio"]').value,
      dataFim: item.querySelector('input[name="dataFim"]').value,
    }));

    const habilidades = [
      ...document.querySelectorAll("#habilidades-lista input[name='nome']"),
    ].map((h) => h.value);

    const idiomas = [
      ...document.querySelectorAll("#idiomas-lista input[name='nome']"),
    ].map((i) => i.value);

    return {
      resumo,
      experiencias,
      habilidades,
      formacao,
      idiomas,
    };
  };

  // Função auxiliar para cor do Score (UX)
  const getScoreColor = (score) => {
    if (score >= 75) return "#28a745"; // Verde
    if (score >= 50) return "#ffc107"; // Amarelo
    return "#dc3545"; // Vermelho
  };

  // Função auxiliar para gerenciar o feedback visual de Aprimoramento
  const setStatus = (text, type) => {
    statusMessage.textContent = text;
    statusMessage.className = `ia-message ia-message--${type}`;
    if (type === "success") {
      setTimeout(() => {
        statusMessage.textContent = "";
        statusMessage.className = "ia-message";
      }, 5000);
    }
  };

  // =========================================================================
  // LÓGICA 1: APRIMORAR RESUMO
  // =========================================================================
  if (aprimorarResumoBtn) {
    aprimorarResumoBtn.addEventListener("click", async () => {
      const dados = coletarDadosCurriculo();

      if (!dados.resumo) {
        setStatus(
          "Preencha o Resumo Profissional antes de aprimorar.",
          "error"
        );
        return;
      }

      const botao = aprimorarResumoBtn;
      botao.disabled = true;
      botao.innerText = "Analisando com IA...";
      setStatus("Processando e otimizando o resumo...", "loading");

      try {
        const resposta = await fetch("http://localhost:7000/aprimorar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumo: dados.resumo,
            experiencias: dados.experiencias, // Arrays são serializados para JSON aqui
            habilidades: dados.habilidades.join(", "),
            formacao: dados.formacao,
            idiomas: dados.idiomas.join(", "),
          }),
        });

        if (!resposta.ok) {
          const erroServidor = await resposta.json();
          throw new Error(
            erroServidor.texto || "Erro desconhecido no servidor."
          );
        }

        const json = await resposta.json();

        if (json.sucesso) {
          document.getElementById("descricao_resumo").value = json.texto;
          setStatus("Resumo aprimorado com sucesso!", "success");
        } else {
          throw new Error(json.texto || "Falha na geração pela IA.");
        }
      } catch (error) {
        console.error("Erro no aprimoramento:", error);
        setStatus(`Falha: ${error.message}. Verifique o console.`, "error");
      } finally {
        botao.disabled = false;
        botao.innerText = "Aprimorar com IA";
      }
    });
  }

  // =========================================================================
  // LÓGICA 2: AVALIAR SCORE ATS
  // =========================================================================

  if (avaliarAtsBtn) {
    avaliarAtsBtn.addEventListener("click", async (event) => {
      
      event.preventDefault();

      const dados = coletarDadosCurriculo();

      const scoreLoader = document.getElementById("score-loader");
      const scoreValue = document.getElementById("score-value");
      const scoreLabel = document.getElementById("score-label");
      const feedbackArea = document.getElementById("ats-feedback-area");
      const dicasLista = document.getElementById("dicas-lista");

      // 1. Exibir Modal e Loading
      dicasLista.innerHTML = "";
      feedbackArea.classList.add("hidden");
      scoreValue.classList.add("hidden");
      scoreLabel.textContent = "Analisando 12 critérios...";
      scoreLoader.classList.remove("hidden");
      scoreModal.style.display = "flex";

      try {
        // 2. Chamada ao endpoint de avaliação
        const resposta = await fetch("http://localhost:7000/avaliar-ats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        });

        if (!resposta.ok) {
          const erroServidor = await resposta.json();
          throw new Error(
            erroServidor.texto || "Erro de servidor ao avaliar ATS."
          );
        }

        const json = await resposta.json();

        if (json.score && json.dicas) {
          // 3. Atualizar o Modal com a Resposta
          scoreLoader.classList.add("hidden");
          scoreValue.textContent = `${json.score}%`;
          scoreValue.style.color = getScoreColor(json.score);
          scoreValue.classList.remove("hidden");
          scoreLabel.textContent = "Score de Compatibilidade Final";

          // Inserir dicas
          json.dicas.forEach((dica) => {
            const li = document.createElement("li");
            li.textContent = dica;
            dicasLista.appendChild(li);
          });

          feedbackArea.classList.remove("hidden");
        } else {
          throw new Error(
            "Resposta incompleta da IA. Score não pôde ser gerado."
          );
        }
      } catch (error) {
        // 4. Tratamento de Erro
        scoreLoader.classList.add("hidden");
        scoreLabel.textContent = "Falha na Avaliação";
        document.getElementById(
          "ats-feedback-area"
        ).innerHTML = `<p class="ia-message--error">❌ ${error.message}</p>`;
        document.getElementById("ats-feedback-area").classList.remove("hidden");
        console.error("Erro na avaliação ATS:", error);
      }
    });
  }

  // Lógica para fechar o modal
  if (fecharModalBtn) {
    fecharModalBtn.addEventListener("click", () => {
      scoreModal.style.display = "none";
    });
  }
});
