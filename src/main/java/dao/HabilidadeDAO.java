package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.Habilidade;
import util.Conexao;

public class HabilidadeDAO {

    public void inserir(Habilidade h) {
        String sql = "INSERT INTO Habilidade (id_usuario, nome) VALUES (?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, h.getIdUsuario());
            ps.setString(2, h.getNome());
            ps.executeUpdate();
        } catch (SQLException ex) { ex.printStackTrace(); }
    }

    public List<Habilidade> listarPorUsuario(int idUsuario) {
        List<Habilidade> lista = new ArrayList<>();
        String sql = "SELECT * FROM Habilidade WHERE id_usuario = ?";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, idUsuario);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Habilidade h = new Habilidade();
                h.setId(rs.getInt("id"));
                h.setIdUsuario(rs.getInt("id_usuario"));
                h.setNome(rs.getString("nome"));
                lista.add(h);
            }
        } catch (SQLException ex) { ex.printStackTrace(); }
        return lista;
    }

    public boolean atualizar(Habilidade h){
        String sql = "UPDATE Habilidade SET nome = ? WHERE id = ?";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, h.getNome());
            ps.setInt(2, h.getId());
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

}