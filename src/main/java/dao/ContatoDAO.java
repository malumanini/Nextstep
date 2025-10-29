package dao;

import dto.ContatoDTO;
import util.Conexao;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class ContatoDAO {
    public void inserir(ContatoDTO contato, int idCurriculo) {
        String sql = "INSERT INTO Contatos (id_curriculo, nome, email, telefone, titulo_profissional, link_linkedin, link_portifolio) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurriculo);
            stmt.setString(2, contato.getNome());
            stmt.setString(3, contato.getEmail());
            stmt.setString(4, contato.getTelefone());
            stmt.setString(5, contato.getTituloProfissional());
            stmt.setString(6, contato.getLinkLinkedin());
            stmt.setString(7, contato.getLinkPortifolio());
            stmt.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}