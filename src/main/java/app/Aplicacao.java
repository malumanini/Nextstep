package app;

import static spark.Spark.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dao.*;
import dto.CurriculoDTO;
import model.Usuario;

import java.util.*;

public class Aplicacao {
    public static void main(String[] args) {
        port(4567);
        staticFiles.location("/public"); 

        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        UsuarioDAO usuarioDAO = new UsuarioDAO();
        CurriculoDAO curriculoDAO = new CurriculoDAO();
        

        // 🔒 Filtro global: protege páginas e impede cache
        before((req, res) -> {
            String path = req.pathInfo();

            // Páginas que exigem login
            List<String> paginasProtegidas = Arrays.asList(
                "/admin.html", "/cadastro.html", "/capacitacao.html",
                "/conta.html", "/gerador_curriculo.html", "/index.html",
                "/meus_curriculos.html", "/planos.html"
            );

            Usuario logado = req.session().attribute("usuarioLogado");

            // Redireciona se não estiver logado
            if (paginasProtegidas.contains(path) && logado == null) {
                res.redirect("/login.html");
                halt();
            }

            // Impede cache de tudo (importante para o logout funcionar direito)
            res.header("Cache-Control", "no-store, no-cache, must-revalidate, private");
            res.header("Pragma", "no-cache");
            res.header("Expires", "0");
        });


        // Cadastro
        post("/cadastro", (req, res) -> {
            res.type("application/json");
            Usuario u = gson.fromJson(req.body(), Usuario.class);
            u.setPlano("gratuito");
            usuarioDAO.inserir(u);
            return gson.toJson(Map.of("status","ok","id", u.getId()));
        });

        // Login
        post("/login", (req, res) -> {
            res.type("application/json");
            Usuario dados = gson.fromJson(req.body(), Usuario.class);
            Usuario u = usuarioDAO.autenticar(dados.getEmail(), dados.getSenha());
            if (u != null) {
                req.session(true).attribute("usuarioLogado", u);
                return gson.toJson(u);
            } else {
                res.status(401);
                return gson.toJson(Map.of("error","Email ou senha incorretos!"));
            }
        });

        // Logout
        get("/logout", (req, res) -> {
            req.session().invalidate(); // encerra completamente a sessão
            res.header("Cache-Control", "no-store, no-cache, must-revalidate, private");
            res.redirect("/login.html");
            return null;
        });

        // =======================================================
        // 📄 Endpoints de Currículo 
        // =======================================================
        post("/curriculo", (req, res) -> {
            res.type("application/json");
            CurriculoDTO dto = gson.fromJson(req.body(), CurriculoDTO.class);

            int idGerado = curriculoDAO.cadastrarCurriculo(dto);

            if (idGerado > 0) {
                res.status(201);
                return gson.toJson(Map.of("status", "ok", "mensagem", "Currículo criado com sucesso!", "idCurriculo", idGerado));
            } else {
                res.status(500);
                return gson.toJson(Map.of("status", "erro", "mensagem", "Falha ao cadastrar currículo"));
            }
        });
        

        // Health check
        get("/health", (req, res) -> "OK");
    }
}