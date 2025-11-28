package dao;

import dto.ResumoProfissionalDTO;
import util.Conexao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ResumoProfissionalDAO {

    public void inserir(ResumoProfissionalDTO dto, int idCurriculo) {
        String sql = "INSERT INTO ResumoProfissional (idCurriculo, descricao) VALUES (?, ?)";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            stmt.setString(2, dto.getDescricao());
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public List<ResumoProfissionalDTO> listarPorCurriculo(int idCurriculo) {
        List<ResumoProfissionalDTO> lista = new ArrayList<>();
        String sql = "SELECT * FROM ResumoProfissional WHERE idCurriculo = ?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                ResumoProfissionalDTO r = new ResumoProfissionalDTO();
                r.setId(rs.getInt("id"));
                r.setDescricao(rs.getString("descricao"));
                lista.add(r);
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return lista;
    }

     public ResumoProfissionalDTO buscarPorCurriculo(int idCurriculo) {

        String sql = "SELECT * FROM ResumoProfissional WHERE idCurriculo = ?";
        ResumoProfissionalDTO r = null;

        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurriculo);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                r = new ResumoProfissionalDTO();
                r.setId(rs.getInt("id"));
                r.setDescricao(rs.getString("descricao"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return r;
    }

    public void atualizar(ResumoProfissionalDTO dto) {

        String sql = "UPDATE ResumoProfissional SET descricao=? WHERE id=?";

        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, dto.getDescricao());
            stmt.setInt(2, dto.getId());

            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deletar(int idCurriculo) {
        String sql = "DELETE FROM ResumoProfissional WHERE idCurriculo = ?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }
}