package dao;

import dto.HabilidadeDTO;
import util.Conexao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class HabilidadeDAO {

    public void inserir(HabilidadeDTO dto, int idCurriculo) {
        String sql = "INSERT INTO Habilidade (idCurriculo, nome) VALUES (?, ?)";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            stmt.setString(2, dto.getNome());
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public List<HabilidadeDTO> listarPorCurriculo(int idCurriculo) {
        List<HabilidadeDTO> lista = new ArrayList<>();
        String sql = "SELECT * FROM Habilidade WHERE idCurriculo = ?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                HabilidadeDTO h = new HabilidadeDTO();
                h.setId(rs.getInt("id"));
                h.setNome(rs.getString("nome"));
                lista.add(h);
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return lista;
    }

    public void editar(HabilidadeDTO dto, int id) {
        String sql = "UPDATE Habilidade SET nome = ? WHERE id = ?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, dto.getNome());
            stmt.setInt(2, id);
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public void deletar(int id) {
        String sql = "DELETE FROM Habilidade WHERE id = ?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }
}