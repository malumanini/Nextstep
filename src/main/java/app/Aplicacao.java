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

        // =======================================================
        // 🔒 Filtro global: protege páginas e impede cache
        // =======================================================
        before((req, res) -> {
            String path = req.pathInfo();

            // Páginas que exigem login
            List<String> paginasProtegidas = Arrays.asList(
                "/admin.html", "/cadastro.html", "/capacitacao.html",
                "/conta.html", "/gerador_curriculo.html", "/index.html",
                "/meus_curriculos.html", "/planos.html"
            );

            Usuario logado = req.session().attribute("usuarioLogado");

            if (paginasProtegidas.contains(path) && logado == null) {
                res.redirect("/login.html");
                halt();
            }

            // Impede cache de tudo
            res.header("Cache-Control", "no-store, no-cache, must-revalidate, private");
            res.header("Pragma", "no-cache");
            res.header("Expires", "0");
        });

        // =======================================================
        // 👤 Cadastro, Login e logout de Usuário
        // =======================================================
        post("/cadastro", (req, res) -> {
            res.type("application/json");
            Usuario u = gson.fromJson(req.body(), Usuario.class);
            u.setPlano("gratuito");
            usuarioDAO.inserir(u);
            return gson.toJson(Map.of("status", "ok", "id", u.getId()));
        });

        post("/login", (req, res) -> {
            res.type("application/json");
            Usuario dados = gson.fromJson(req.body(), Usuario.class);
            Usuario u = usuarioDAO.autenticar(dados.getEmail(), dados.getSenha());
            if (u != null) {
                req.session(true).attribute("usuarioLogado", u);
                return gson.toJson(u);
            } else {
                res.status(401);
                return gson.toJson(Map.of("error", "Email ou senha incorretos!"));
            }
        });

        get("/logout", (req, res) -> {
            req.session().invalidate();
            res.header("Cache-Control", "no-store, no-cache, must-revalidate, private");
            res.redirect("/login.html");
            return null;
        });

        // =======================================================
        // 📄 Endpoints de Currículo
        // =======================================================

        // 🟢 Criar currículo
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

        // 🔵 Retorna as informações do currículo
        get("/curriculo/id/:id", (req, res) -> {
            res.type("application/json");
            int idCurriculo = Integer.parseInt(req.params(":id"));
            CurriculoDTO dto = curriculoDAO.buscarPorId(idCurriculo);
            if (dto == null) {
                res.status(404);
                return gson.toJson(Map.of("erro", "Currículo não encontrado"));
            }
            return gson.toJson(dto);
        });

        // 🔵 Listar currículos de um usuário
        get("/curriculo/:idUsuario", (req, res) -> {
            res.type("application/json");
            int idUsuario = Integer.parseInt(req.params(":idUsuario"));
            return gson.toJson(curriculoDAO.listarPorUsuario(idUsuario));
        });

        // 🟠 Editar currículo (PUT)
        put("/curriculo/:id", (req, res) -> {
            res.type("application/json");
            int idCurriculo = Integer.parseInt(req.params(":id"));
            CurriculoDTO dto = gson.fromJson(req.body(), CurriculoDTO.class);
            dto.setId(idCurriculo); // garante que o ID do currículo seja passado ao DAO

            try {
                curriculoDAO.editar(dto);
                res.status(200);
                return gson.toJson(Map.of("status", "ok", "mensagem", "Currículo atualizado com sucesso!"));
            } catch (Exception e) {
                res.status(500);
                e.printStackTrace();
                return gson.toJson(Map.of("status", "erro", "mensagem", "Erro ao atualizar currículo"));
            }
        });

        // 🔴 Deletar currículo
        delete("/curriculo/:id", (req, res) -> {
            res.type("application/json");
            int idCurriculo = Integer.parseInt(req.params(":id"));

            try {
                curriculoDAO.deletar(idCurriculo);
                res.status(200);
                return gson.toJson(Map.of("status", "ok", "mensagem", "Currículo excluído com sucesso!"));
            } catch (Exception e) {
                res.status(500);
                e.printStackTrace();
                return gson.toJson(Map.of("status", "erro", "mensagem", "Erro ao excluir currículo"));
            }
        });

        // ✅ Health check
        get("/health", (req, res) -> "OK");
    }
}