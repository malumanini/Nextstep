package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.ExperienciaProfissional;
import util.Conexao;

public class ExperienciaProfissionalDAO {
    
    public void inserir(ExperienciaProfissional e) {
        String sql = "INSERT INTO ExperienciaProfissional (id_usuario, empresa, cargo, data_inicio, data_fim, descricao) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, e.getIdUsuario());
            ps.setString(2, e.getEmpresa());
            ps.setString(3, e.getCargo());
            ps.setDate(4, e.getDataInicio());
            if (e.getDataFim() != null) ps.setDate(5, e.getDataFim()); else ps.setNull(5, Types.DATE);
            ps.setString(6, e.getDescricao());
            ps.executeUpdate();
        } catch (SQLException ex) { ex.printStackTrace(); }
    }

    public List<ExperienciaProfissional> listarPorUsuario(int idUsuario) {
        List<ExperienciaProfissional> lista = new ArrayList<>();
        String sql = "SELECT * FROM ExperienciaProfissional WHERE id_usuario = ? ORDER BY data_inicio DESC";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, idUsuario);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                ExperienciaProfissional e = new ExperienciaProfissional();
                e.setId(rs.getInt("id"));
                e.setIdUsuario(rs.getInt("id_usuario"));
                e.setEmpresa(rs.getString("empresa"));
                e.setCargo(rs.getString("cargo"));
                e.setDataInicio(rs.getDate("data_inicio"));
                e.setDataFim(rs.getDate("data_fim"));
                e.setDescricao(rs.getString("descricao"));
                lista.add(e);
            }
        } catch (SQLException ex) { ex.printStackTrace(); }
        return lista;
    }

    public boolean atualizar(ExperienciaProfissional ep){
        String sql = "UPDATE ExperienciaProfissional SET empresa = ?, cargo = ?, data_inicio = ?, data_fim = ?, descricao = ? WHERE id = ? ";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, ep.getEmpresa());
            ps.setString(2, ep.getCargo());
            ps.setDate(3, ep.getDataInicio());
            ps.setDate(4, ep.getDataFim());
            ps.setString(2, ep.getDescricao());
            ps.setInt(5, ep.getId());
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}