package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.ResumoProfissional;
import util.Conexao;

public class ResumoProfissionalDAO {
    
    public void inserir(ResumoProfissional r) {
        String sql = "INSERT INTO ResumoProfissional (id_usuario, descricao) VALUES (?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, r.getIdUsuario());
            ps.setString(2, r.getDescricao());
            ps.executeUpdate();
        } catch (SQLException ex) { ex.printStackTrace(); }
    }

    public List<ResumoProfissional> listarPorUsuario(int idUsuario) {
        List<ResumoProfissional> lista = new ArrayList<>();
        String sql = "SELECT * FROM ResumoProfissional WHERE id_usuario = ? ORDER BY data_inicio DESC";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, idUsuario);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                ResumoProfissional r = new ResumoProfissional();
                r.setId(rs.getInt("id"));
                r.setIdUsuario(rs.getInt("id_usuario"));
                r.setDescricao(rs.getString("descricao"));
                lista.add(r);
            }
        } catch (SQLException ex) { ex.printStackTrace(); }
        return lista;
    }

    public boolean atualizar(ResumoProfissional r){
        String sql = "UPDATE ResumoProfissional SET descricao = ? WHERE id = ? ";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, r.getDescricao());
            ps.setInt(5, r.getId());
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
