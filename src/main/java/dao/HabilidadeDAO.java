package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.Habilidade;

public class HabilidadeDAO {
    private Connection conn;

    public HabilidadeDAO(){
        try{
            conn = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/curriculoDB", 
                "postgres", 
                "123"
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void inserir(Habilidade h){
        String sql = "INSERT INTO Habilidade (id_usuario, nome) VALUES (?, ?)";
        try (PreparedStatement st = conn.prepareStatement(sql)) {
            st.setInt(1, h.getIdUsuario());
            st.setString(2, h.getNome());
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    public List<Habilidade> listarPorUsuario(int idUsuario) {
        List<Habilidade> lista = new ArrayList<>();
        String sql = "SELECT * FROM Habilidade WHERE id_usuario = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)){

            stmt.setInt(1, idUsuario);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Habilidade h = new Habilidade();
                h.setId(rs.getInt("id"));
                h.setIdUsuario(rs.getInt("id_usuario"));
                h.setNome(rs.getString("nome"));
                lista.add(h);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public boolean atualizar(Habilidade h){
        String sql = "UPDATE Habilidade SET nome = ? WHERE id = ?";
        try(PreparedStatement st = conn.prepareStatement(sql)){
            st.setString(1, h.getNome());
            st.setInt(2, h.getId());
            return st.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

}