package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import org.mindrot.jbcrypt.BCrypt;

import model.Usuario;

public class UsuarioDAO {
    private Connection conn;

    public UsuarioDAO() {
        try {
            conn = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/produtoServices",
                "postgres",
                "123"
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void inserir(Usuario u) {
        String sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
        try (PreparedStatement st = conn.prepareStatement(sql)) {
            String senhaHash = BCrypt.hashpw(u.getSenha(), BCrypt.gensalt());
            st.setString(1, u.getNome());
            st.setString(2, u.getEmail());
            st.setString(3, senhaHash);
            st.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Usuario> listar() {
        List<Usuario> lista = new ArrayList<>();
        String sql = "SELECT * FROM usuario ORDER BY id";
        try (Statement st = conn.createStatement()) {
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                lista.add(new Usuario(
                    rs.getInt("id"),
                    rs.getString("nome"),
                    rs.getString("email"),
                    null,
                    rs.getString("plano")
                ));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return lista;
    }

    public Usuario buscar(int id) {
        String sql = "SELECT * FROM usuario WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(sql)) {
            st.setInt(1, id);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                return new Usuario(
                    rs.getInt("id"),
                    rs.getString("nome"),
                    rs.getString("email"),
                    null,
                    rs.getString("plano")
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean atualizar(Usuario u) {
        String sql = "UPDATE usuario SET nome = ?, email = ?, senha = ?, plano = ? WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(sql)) {
            st.setString(1, u.getNome());
            st.setString(2, u.getEmail());
            st.setString(3, u.getSenha());
            st.setString(4, u.getPlano());
            st.setInt(5, u.getId());
            return st.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deletar(int id) {
        String sql = "DELETE FROM usuario WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(sql)) {
            st.setInt(1, id);
            return st.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public Usuario autenticar(String email, String senhaDigitada) {
        String sql = "SELECT * FROM usuario WHERE email = ?";
        try (PreparedStatement st = conn.prepareStatement(sql)) {
            st.setString(1, email);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                String senhaHash = rs.getString("senha");
                if (BCrypt.checkpw(senhaDigitada, senhaHash)) {
                    return new Usuario(
                        rs.getInt("id"),
                        rs.getString("nome"),
                        rs.getString("email"),
                        null, // não expor hash
                        rs.getString("plano")
                    );
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}