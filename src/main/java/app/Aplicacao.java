package app;

import static spark.Spark.*;

import java.nio.file.Files;
import java.nio.file.Paths;

import com.google.gson.Gson;
import dao.UsuarioDAO;
import model.Usuario;

public class Aplicacao {
    public static void main(String[] args) {
        port(4567);
        UsuarioDAO usuarioDAO = new UsuarioDAO();
        Gson gson = new Gson();

        // Rota de cadastro
        post("/cadastro", (req, res) -> {
            Usuario u = gson.fromJson(req.body(), Usuario.class);
            usuarioDAO.inserir(u);
            res.status(201);
            return "Usuário cadastrado com sucesso!";
        });

        // Rota de login
        post("/login", (req, res) -> {
            Usuario dados = gson.fromJson(req.body(), Usuario.class);
            Usuario u = usuarioDAO.autenticar(dados.getEmail(), dados.getSenha());
            if (u != null) {
                return gson.toJson(u);
            } else {
                res.status(401);
                return "Email ou senha incorretos!";
            }
        });

        // Método para redirecionar o usuário caso esteja logado
        get("/dashboard", (req, res) -> {
            Usuario u = req.session().attribute("usuarioLogado");
            if (u == null) {
                res.redirect("/login");
                return null;
            }
            res.type("text/html");
            return new String(Files.readAllBytes(Paths.get("src/main/resources/templates/dashboard.html")));
        });

        get("/cadastro", (req, res) -> {
            res.type("text/html");
            return new String(Files.readAllBytes(Paths.get("src/main/resources/templates/cadastro.html")));
        });

        get("/login", (req, res) -> {
            res.type("text/html");
            return new String(Files.readAllBytes(Paths.get("src/main/resources/templates/login.html")));
        });

    }
}