package dao;

import dto.IdiomasDTO;
import java.sql.*;
import util.Conexao;

public class IdiomaDAO {
    public void inserir(IdiomasDTO dto, int idCurriculo) {
        String sql = "INSERT INTO Idioma (id_curriculo, nome) VALUES (?, ?)";
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
