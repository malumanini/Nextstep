package controller;

import com.google.gson.Gson;
import com.sun.net.httpserver.*;
import dao.CurriculoDAO;
import dto.CurriculoDTO;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class CurriculoController implements HttpHandler {

    private final Gson gson = new Gson();

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        // Permitir apenas método POST
        if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(405, -1); // 405 Method Not Allowed
            return;
        }

        // Lê o corpo da requisição
        InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);
        CurriculoDTO curriculo = gson.fromJson(reader, CurriculoDTO.class);

        // Chama o DAO
        CurriculoDAO dao = new CurriculoDAO();
        int idGerado = dao.cadastrarCurriculo(curriculo);

        String resposta;
        if (idGerado > 0) {
            resposta = gson.toJson("Currículo cadastrado com sucesso! ID: " + idGerado);
            enviarResposta(exchange, 200, resposta);
        } else {
            resposta = gson.toJson("Erro ao cadastrar currículo.");
            enviarResposta(exchange, 500, resposta);
        }
    }

    private void enviarResposta(HttpExchange exchange, int statusCode, String resposta) throws IOException {
        byte[] bytes = resposta.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }
}