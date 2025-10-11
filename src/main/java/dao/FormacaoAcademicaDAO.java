package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.FormacaoAcademica;

public class FormacaoAcademicaDAO {
    private Connection conn;

    public FormacaoAcademicaDAO(){
        try{
            conn = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/curriculoDB",
                "postgres",
                "123"
                );
        } catch(Exception e){
            e.printStackTrace();
        }
    }

    public void inserir(FormacaoAcademica fa){
        String sql = "INSERT INTO FormacaoAcademica (id_usuario, intituicao, curso, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement st = conn.prepareStatement(sql)) {
            st.setInt(1, fa.getIdUsuario());
            st.setString(2, fa.getInstituicao());
            st.setString(3, fa.getCurso());
            st.setDate(4, fa.getDataInicio());
            st.setDate(5, fa.getDataFim());
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    public List<FormacaoAcademica> listarPorUsuario(int idUsuario) {
        List<FormacaoAcademica> lista = new ArrayList<>();
        String sql = "SELECT * FROM FormacaoAcademica WHERE id_usuario = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)){

            stmt.setInt(1, idUsuario);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                FormacaoAcademica fa = new FormacaoAcademica();
                fa.setId(rs.getInt("id"));
                fa.setIdUsuario(rs.getInt("id_usuario"));
                fa.setInstituicao(rs.getString("intituicao"));
                fa.setCurso(rs.getString("curso"));
                fa.setDataInicio(rs.getDate("data_inicio"));
                fa.setDataFim(rs.getDate("data_fim"));
                lista.add(fa);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public boolean atualizar(FormacaoAcademica fa){
        String sql = "UPDATE FormacaoAcademica SET intituicao = ?, curso = ?, data_inicio = ?, data_fim = ? WHERE id = ? ";
        try (PreparedStatement st = conn.prepareStatement(sql)) {
            st.setString(1, fa.getInstituicao());
            st.setString(2, fa.getCurso());
            st.setDate(3, fa.getDataInicio());
            st.setDate(4, fa.getDataFim());
            st.setInt(5, fa.getId());
            return st.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}