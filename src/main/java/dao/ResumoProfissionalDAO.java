package dao;

import dto.ResumoProfissionalDTO;
import java.sql.*;
import util.Conexao;


public class ResumoProfissionalDAO {
    public void inserir(ResumoProfissionalDTO dto, int idCurriculo) {
        String sql = "INSERT INTO ResumoProfissional (id_curriculo, descricao_ResumoProfissional) VALUES (?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurriculo);
            stmt.setString(2, dto.getDescricao());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}