// Impede que o usuário volte para a página via cache do navegador após logout
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        window.location.reload();
    }
});

// Aguarda o carregamento completo do DOM antes de buscar elementos
document.addEventListener("DOMContentLoaded", () => {
    const logoutLink = document.getElementById("logoutLink");

    if (logoutLink) {
        logoutLink.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                await fetch("/logout");

                // ✅ Limpa dados do localStorage após logout
                localStorage.removeItem("idUsuario");
                localStorage.removeItem("nomeUsuario");

                // ✅ Redireciona para o login
                window.location.replace("login.html");
            } catch (error) {
                console.error("Erro ao realizar logout:", error);
            }
        });
    }
});