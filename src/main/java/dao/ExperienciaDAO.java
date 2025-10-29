package dao;

import dto.ExperienciaDTO;
import java.sql.*;
import util.Conexao;

public class ExperienciaDAO {
    public void inserir(ExperienciaDTO dto, int idCurriculo) {
        String sql = "INSERT INTO ExperienciaProfissional (idCurriculo, empresa, cargo, dataInicio, dataFim, descricao) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurriculo);
            stmt.setString(2, dto.getEmpresa());
            stmt.setString(3, dto.getCargo());
            stmt.setDate(4, Date.valueOf(dto.getDataInicio()));
            stmt.setDate(5, dto.getDataFim() != null ? Date.valueOf(dto.getDataFim()) : null);
            stmt.setString(6, dto.getDescricao());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
