package app;

import static spark.Spark.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dao.*;
import dto.*;
import model.*;
import util.Conexao;

import java.time.LocalDate;
import java.sql.Date;
import java.util.*;

public class Aplicacao {
    public static void main(String[] args) {
        port(4567);
        staticFiles.location("/public"); 

        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        UsuarioDAO usuarioDAO = new UsuarioDAO();
        ContatoDAO contatoDAO = new ContatoDAO();
        ExperienciaProfissionalDAO expDAO = new ExperienciaProfissionalDAO();
        FormacaoAcademicaDAO formacaoDAO = new FormacaoAcademicaDAO();
        HabilidadeDAO habilidadeDAO = new HabilidadeDAO();
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

        // Currículo (POST)
        

        // Currículo completo (GET)
        get("/curriculo/:idUsuario", (req, res) -> {
            res.type("application/json");
            int idUsuario = Integer.parseInt(req.params(":idUsuario"));
            Usuario u = usuarioDAO.buscarPorId(idUsuario);
            if (u == null) {
                res.status(404);
                return gson.toJson(Map.of("error","Usuario não encontrado"));
            }

            Contato contato = new ContatoDAO().buscarPorUsuario(idUsuario);
            List<ExperienciaProfissional> experiencias = new ExperienciaProfissionalDAO().listarPorUsuario(idUsuario);
            List<FormacaoAcademica> formacoes = new FormacaoAcademicaDAO().listarPorUsuario(idUsuario);
            List<Habilidade> habilidades = new HabilidadeDAO().listarPorUsuario(idUsuario);

            Map<String, Object> result = new HashMap<>();
            result.put("usuario", u);
            result.put("contato", contato);
            result.put("experiencias", experiencias);
            result.put("formacoes", formacoes);
            result.put("habilidades", habilidades);
            return gson.toJson(result);
        });

        // Dashboard (rota protegida)
        get("/dashboard", (req, res) -> {
            Usuario u = req.session().attribute("usuarioLogado");
            if (u == null) {
                res.redirect("/login.html");
                return null;
            }
            res.type("application/json");
            return gson.toJson(Map.of("mensagem", "Bem-vindo " + u.getNome()));
        });

        // Health check
        get("/health", (req, res) -> "OK");
    }
}