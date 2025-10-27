package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.FormacaoAcademica;
import util.Conexao;

public class FormacaoAcademicaDAO {

    public void inserir(FormacaoAcademica f) {
        String sql = "INSERT INTO FormacaoAcademica (id_usuario, instituicao, curso, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, f.getIdUsuario());
            ps.setString(2, f.getInstituicao());
            ps.setString(3, f.getCurso());
            ps.setDate(4, f.getDataInicio());
            if (f.getDataFim() != null) ps.setDate(5, f.getDataFim()); else ps.setNull(5, Types.DATE);
            ps.executeUpdate();
        } catch (SQLException ex) { ex.printStackTrace(); }
    }

    public List<FormacaoAcademica> listarPorUsuario(int idUsuario) {
        List<FormacaoAcademica> lista = new ArrayList<>();
        String sql = "SELECT * FROM FormacaoAcademica WHERE id_usuario = ? ORDER BY data_inicio DESC";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, idUsuario);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                FormacaoAcademica f = new FormacaoAcademica();
                f.setId(rs.getInt("id"));
                f.setIdUsuario(rs.getInt("id_usuario"));
                f.setInstituicao(rs.getString("instituicao"));
                f.setCurso(rs.getString("curso"));
                f.setDataInicio(rs.getDate("data_inicio"));
                f.setDataFim(rs.getDate("data_fim"));
                lista.add(f);
            }
        } catch (SQLException ex) { ex.printStackTrace(); }
        return lista;
    }

    public boolean atualizar(FormacaoAcademica fa){
        String sql = "UPDATE FormacaoAcademica SET intituicao = ?, curso = ?, data_inicio = ?, data_fim = ? WHERE id = ? ";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, fa.getInstituicao());
            ps.setString(2, fa.getCurso());
            ps.setDate(3, fa.getDataInicio());
            ps.setDate(4, fa.getDataFim());
            ps.setInt(5, fa.getId());
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}