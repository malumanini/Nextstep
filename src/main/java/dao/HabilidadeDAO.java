package dao;

import dto.HabilidadeDTO;
import java.sql.*;
import util.Conexao;

public class HabilidadeDAO {
    public void inserir(HabilidadeDTO dto, int idCurriculo) {
        String sql = "INSERT INTO Habilidade (id_curriculo, nome) VALUES (?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurriculo);
            stmt.setString(2, dto.getNome());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
