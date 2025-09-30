package app;

import static spark.Spark.*;

import com.google.gson.Gson;
import dao.UsuarioDAO;
import model.Usuario;

public class Aplicacao {
    public static void main(String[] args) {
        port(4567);

        // Spark vai servir automaticamente os arquivos de src/main/resources/static e templates
        staticFiles.location("/public"); // htmls (opcional, mas pode usar)
       

        UsuarioDAO usuarioDAO = new UsuarioDAO();
        Gson gson = new Gson();

        // Cadastro
        post("/cadastro", (req, res) -> {
            Usuario u = gson.fromJson(req.body(), Usuario.class);
            usuarioDAO.inserir(u);
            res.status(201);
            return "Usuário cadastrado com sucesso!";
        });

        // Login
        post("/login", (req, res) -> {
            Usuario dados = gson.fromJson(req.body(), Usuario.class);
            Usuario u = usuarioDAO.autenticar(dados.getEmail(), dados.getSenha());
            if (u != null) {
                req.session().attribute("usuarioLogado", u);
                u.setSenha(null);
                return gson.toJson(u);
            } else {
                res.status(401);
                return "Email ou senha incorretos!";
            }
        });

        // Dashboard protegido
        get("/dashboard", (req, res) -> {
            Usuario u = req.session().attribute("usuarioLogado");
            if (u == null) {
                res.redirect("/login.html");
                return null;
            }
            res.type("text/html");
            return "<h1>Bem-vindo, " + u.getNome() + "!</h1>";
        });
    }
}