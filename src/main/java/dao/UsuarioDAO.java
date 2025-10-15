package dao;

import model.Usuario;
import util.Conexao;
import java.sql.*;
import org.mindrot.jbcrypt.BCrypt;

public class UsuarioDAO {

    public void inserir(Usuario u) {
        String sql = "INSERT INTO Usuario (nome, email, senha, plano) VALUES (?, ?, ?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            String hash = BCrypt.hashpw(u.getSenha(), BCrypt.gensalt());
            ps.setString(1, u.getNome());
            ps.setString(2, u.getEmail());
            ps.setString(3, hash);
            ps.setString(4, u.getPlano() == null ? "gratuito" : u.getPlano());
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) u.setId(rs.getInt(1));
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public Usuario autenticar(String email, String senhaDigitada) {
        String sql = "SELECT id, nome, email, senha, plano FROM Usuario WHERE email = ?";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                String hash = rs.getString("senha");
                if (BCrypt.checkpw(senhaDigitada, hash)) {
                    Usuario u = new Usuario();
                    u.setId(rs.getInt("id"));
                    u.setNome(rs.getString("nome"));
                    u.setEmail(rs.getString("email"));
                    u.setSenha(hash); // cuidado: NÃO enviar isso para frontend em produção
                    u.setPlano(rs.getString("plano"));
                    return u;
                }
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public Usuario buscarPorId(int id) {
        String sql = "SELECT id, nome, email, plano FROM Usuario WHERE id = ?";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Usuario u = new Usuario();
                u.setId(rs.getInt("id"));
                u.setNome(rs.getString("nome"));
                u.setEmail(rs.getString("email"));
                u.setPlano(rs.getString("plano"));
                return u;
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return null;
    }
}