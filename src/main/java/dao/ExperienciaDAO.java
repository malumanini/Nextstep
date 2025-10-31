package dao;

import dto.ExperienciaDTO;
import util.Conexao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ExperienciaDAO {

    public void inserir(ExperienciaDTO dto, int idCurriculo) {
        String sql = "INSERT INTO ExperienciaProfissional (idCurriculo, empresa, cargo, dataInicio, dataFim, descricao) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            stmt.setString(2, dto.getEmpresa());
            stmt.setString(3, dto.getCargo());
            stmt.setString(4, dto.getDataInicio());
            stmt.setString(5, dto.getDataFim());
            stmt.setString(6, dto.getDescricao());
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public List<ExperienciaDTO> listarPorCurriculo(int idCurriculo) {
        List<ExperienciaDTO> lista = new ArrayList<>();
        String sql = "SELECT * FROM ExperienciaProfissional WHERE idCurriculo = ?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                ExperienciaDTO e = new ExperienciaDTO();
                e.setEmpresa(rs.getString("empresa"));
                e.setCargo(rs.getString("cargo"));
                e.setDataInicio(rs.getString("dataInicio"));
                e.setDataFim(rs.getString("dataFim"));
                e.setDescricao(rs.getString("descricao"));
                lista.add(e);
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return lista;
    }

    public void editar(ExperienciaDTO dto, int id) {
        String sql = "UPDATE ExperienciaProfissional SET empresa=?, cargo=?, dataInicio=?, dataFim=?, descricao=? WHERE id = ?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, dto.getEmpresa());
            stmt.setString(2, dto.getCargo());
            stmt.setString(3, dto.getDataInicio());
            stmt.setString(4, dto.getDataFim());
            stmt.setString(5, dto.getDescricao());
            stmt.setInt(6, id);
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public void deletar(int id) {
        String sql = "DELETE FROM ExperienciaProfissional WHERE id = ?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }
}
