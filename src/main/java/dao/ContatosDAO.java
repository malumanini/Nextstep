package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.Contatos;

public class ContatosDAO {
    private Connection conn;

    public ContatosDAO(){
        try{
            conn = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/curriculoDB",
                "postgres",
                "123"
            );
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    public void inserir(Contatos c){
        String sql = "INSERT INTO Contatos (id_usuario, telefone, titulo_profissional, link_linkedin, link_portifolio) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement st = conn.prepareStatement(sql)){
            st.setInt(1, c.getIdUsuario());
            st.setString(1, c.getTelefone());
            st.setString(1, c.getTituloProfissional());
            st.setString(1, c.getLinkedin());
            st.setString(1, c.getPortifolio());
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    public List<Contatos> listarPorUsuario(int idUsuario) {
        List<Contatos> lista = new ArrayList<>();
        String sql = "SELECT * FROM Contatos WHERE id_usuario = ? ";
        try (PreparedStatement stmt = conn.prepareStatement(sql)){
            
            stmt.setInt(1, idUsuario);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                    Contatos c = new Contatos();
                    c.setId(rs.getInt("id"));
                    c.setIdUsuario(rs.getInt("id_usuario"));
                    c.setTelefone(rs.getString("telefone"));
                    c.setTituloProfissional(rs.getString("titulo_profissional"));
                    c.setLinkedin(rs.getString("link_linkedin"));
                    c.setPortifolio(rs.getString("link_portifolio"));
                    lista.add(c);
                }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public boolean atualizar(Contatos c){
        String sql = "UPDATE Contatos SET telefone = ?, titulo_profissional = ?, link_linkedin = ?, link_portifolio = ?, WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(sql)) {
            st.setString(1, c.getTelefone());
            st.setString(2, c.getTituloProfissional());
            st.setString(2, c.getLinkedin());
            st.setString(2, c.getPortifolio());
            st.setInt(5, c.getId());
            return st.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}