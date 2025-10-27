package dao;

import model.Idiomas;
import util.Conexao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class IdiomasDAO {

    public void inserir(Idiomas i) {
        String sql = "INSERT INTO Idioma  (id_usuario, nome) VALUES (?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, i.getIdUsuario());
            ps.setString(2, i.getNome());
            ps.executeUpdate();
        } catch (SQLException ex) { ex.printStackTrace(); }
    }

    public List<Idiomas> listarPorUsuario(int idUsuario) {
        List<Idiomas> lista = new ArrayList<>();
        String sql = "SELECT * FROM Idioma WHERE id_usuario = ? ORDER BY data_inicio DESC";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, idUsuario);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Idiomas i = new Idiomas();
                i.setId(rs.getInt("id"));
                i.setIdUsuario(rs.getInt("id_usuario"));
                i.setNome(rs.getString("nome"));
                lista.add(i);
            }
        } catch (SQLException ex) { ex.printStackTrace(); }
        return lista;
    }

    public boolean atualizar(Idiomas i){
        String sql = "UPDATE Idioma SET nome = ? WHERE id = ? ";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(2, i.getNome());
            ps.setInt(5, i.getId());
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    
}
