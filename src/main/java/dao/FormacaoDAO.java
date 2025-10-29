package dao;

import dto.FormacaoDTO;
import java.sql.*;
import util.Conexao;

public class FormacaoDAO {
    public void inserir(FormacaoDTO dto, int idCurriculo) {
        String sql = "INSERT INTO FormacaoAcademica (idCurriculo, instituicao, curso, dataInicio, dataFim) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurriculo);
            stmt.setString(2, dto.getInstituicao());
            stmt.setString(3, dto.getCurso());
            stmt.setDate(4, Date.valueOf(dto.getDataInicio()));
            stmt.setDate(5, dto.getDataFim() != null ? Date.valueOf(dto.getDataFim()) : null);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
