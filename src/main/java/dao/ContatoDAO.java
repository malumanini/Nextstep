package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.Contato;
import util.Conexao;

public class ContatoDAO {
    
    public void inserir(Contato c) {
        String sql = "INSERT INTO Contatos (id_usuario, telefone, titulo_profissional, link_linkedin, link_portifolio) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, c.getIdUsuario());
            ps.setString(2, c.getTelefone());
            ps.setString(3, c.getTituloProfissional());
            ps.setString(4, c.getLinkLinkedin());
            ps.setString(5, c.getLinkPortfolio());
            ps.executeUpdate();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public List<Contato> listarPorUsuario(int idUsuario) {
        List<Contato> lista = new ArrayList<>();
        String sql = "SELECT * FROM Contatos WHERE id_usuario = ? ";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, idUsuario);
            ResultSet rs = ps.executeQuery();
            
            while (rs.next()) {
                    Contato c = new Contato();
                    c.setId(rs.getInt("id"));
                    c.setIdUsuario(rs.getInt("id_usuario"));
                    c.setTelefone(rs.getString("telefone"));
                    c.setTituloProfissional(rs.getString("titulo_profissional"));
                    c.setLinkLinkedin(rs.getString("link_linkedin"));
                    c.setLinkPortfolio(rs.getString("link_portifolio"));
                    lista.add(c);
                }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public boolean atualizar(Contato c){
        String sql = "UPDATE Contatos SET telefone = ?, titulo_profissional = ?, link_linkedin = ?, link_portifolio = ?, WHERE id = ?";
       try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, c.getTelefone());
            ps.setString(2, c.getTituloProfissional());
            ps.setString(2, c.getLinkLinkedin());
            ps.setString(2, c.getLinkPortfolio());
            ps.setInt(5, c.getId());
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public Contato buscarPorUsuario(int idUsuario) {
        String sql = "SELECT * FROM Contatos WHERE id_usuario = ?";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, idUsuario);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                Contato c = new Contato();
                c.setId(rs.getInt("id"));
                c.setIdUsuario(rs.getInt("id_usuario"));
                c.setTelefone(rs.getString("telefone"));
                c.setTituloProfissional(rs.getString("titulo_profissional"));
                c.setLinkLinkedin(rs.getString("link_linkedin"));
                c.setLinkPortfolio(rs.getString("link_portifolio"));
                return c;
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return null;
    }
}