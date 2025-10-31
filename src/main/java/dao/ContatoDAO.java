package dao;

import dto.ContatoDTO;
import util.Conexao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ContatoDAO {

    public void inserir(ContatoDTO contato, int idCurriculo) {
        String sql = "INSERT INTO Contatos (idCurriculo, nome, email, telefone, tituloProfissional, linkLinkedin, linkPortifolio) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            stmt.setString(2, contato.getNome());
            stmt.setString(3, contato.getEmail());
            stmt.setString(4, contato.getTelefone());
            stmt.setString(5, contato.getTituloProfissional());
            stmt.setString(6, contato.getLinkLinkedin());
            stmt.setString(7, contato.getLinkPortifolio());
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public List<ContatoDTO> listarPorCurriculo(int idCurriculo) {
        List<ContatoDTO> lista = new ArrayList<>();
        String sql = "SELECT * FROM Contatos WHERE idCurriculo = ?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                ContatoDTO c = new ContatoDTO();
                c.setNome(rs.getString("nome"));
                c.setEmail(rs.getString("email"));
                c.setTelefone(rs.getString("telefone"));
                c.setTituloProfissional(rs.getString("tituloProfissional"));
                c.setLinkLinkedin(rs.getString("linkLinkedin"));
                c.setLinkPortifolio(rs.getString("linkPortifolio"));
                lista.add(c);
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return lista;
    }

    public void editar(ContatoDTO contato, int idCurriculo) {
        String sql = "UPDATE Contatos SET nome=?, email=?, telefone=?, tituloProfissional=?, linkLinkedin=?, linkPortifolio=? WHERE idCurriculo=?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, contato.getNome());
            stmt.setString(2, contato.getEmail());
            stmt.setString(3, contato.getTelefone());
            stmt.setString(4, contato.getTituloProfissional());
            stmt.setString(5, contato.getLinkLinkedin());
            stmt.setString(6, contato.getLinkPortifolio());
            stmt.setInt(7, idCurriculo);
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public void deletar(int idCurriculo) {
        String sql = "DELETE FROM Contatos WHERE idCurriculo = ?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }
}