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
        post("/curriculo", (req, res) -> {
            res.type("application/json");
            CurriculoDTO dto = gson.fromJson(req.body(), CurriculoDTO.class);

            if (dto.getContato() == null || dto.getContato().getIdUsuario() == 0) {
                res.status(400);
                return gson.toJson(Map.of("error", "idUsuario obrigatório em contato"));
            }

            int idUsuario = dto.getContato().getIdUsuario();

            // Contato
            Contato contato = new Contato();
            contato.setIdUsuario(idUsuario);
            contato.setTelefone(dto.getContato().getTelefone());
            contato.setTituloProfissional(dto.getContato().getTituloProfissional());
            contato.setLinkLinkedin(dto.getContato().getLinkLinkedin());
            contato.setLinkPortfolio(dto.getContato().getLinkPortfolio());
            contatoDAO.inserir(contato);

            // Formações
            if (dto.getFormacoes() != null) {
                for (FormacaoDTO f : dto.getFormacoes()) {
                    FormacaoAcademica formacao = new FormacaoAcademica();
                    formacao.setIdUsuario(idUsuario);
                    formacao.setInstituicao(f.getInstituicao());
                    formacao.setCurso(f.getCurso());
                    if (f.getInicio() != null && !f.getInicio().isBlank()) {
                        formacao.setDataInicio(Date.valueOf(LocalDate.parse(f.getInicio())));
                    }
                    if (f.getFim() != null && !f.getFim().isBlank()) {
                        formacao.setDataFim(Date.valueOf(LocalDate.parse(f.getFim())));
                    }
                    formacaoDAO.inserir(formacao);
                }
            }

            // Experiências
            if (dto.getExperiencias() != null) {
                for (ExperienciaDTO e : dto.getExperiencias()) {
                    ExperienciaProfissional exp = new ExperienciaProfissional();
                    exp.setIdUsuario(idUsuario);
                    exp.setEmpresa(e.getEmpresa());
                    exp.setCargo(e.getCargo());
                    if (e.getInicio() != null && !e.getInicio().isBlank()) exp.setDataInicio(Date.valueOf(LocalDate.parse(e.getInicio())));
                    if (e.getFim() != null && !e.getFim().isBlank()) exp.setDataFim(Date.valueOf(LocalDate.parse(e.getFim())));
                    exp.setDescricao(e.getDescricao());
                    expDAO.inserir(exp);
                }
            }

            // Habilidades
            if (dto.getHabilidades() != null) {
                for (String h : dto.getHabilidades()) {
                    Habilidade hab = new Habilidade();
                    hab.setIdUsuario(idUsuario);
                    hab.setNome(h);
                    habilidadeDAO.inserir(hab);
                }
            }

            // Currículo
            Curriculo c = new Curriculo();
            c.setIdUsuario(idUsuario);
            c.setDataCriacao(Date.valueOf(LocalDate.now()));
            c.setModelo(null);
            c.setArquivoGerado(null);
            curriculoDAO.inserir(c);

            res.status(201);
            return gson.toJson(Map.of("status","ok","mensagem","Currículo salvo", "curriculoId", c.getId()));
        });

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