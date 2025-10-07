package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.ExperienciaProfissional;

public class ExperienciaProfissionalDAO {
    private Connection conn;

    public ExperienciaProfissionalDAO() {
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

    public void inserir(ExperienciaProfissional ep){
        String sql = "INSERT INTO ExperienciaProfissional (id_usuario, empresa, cargo, data_inicio, data_fim, descricao) VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement st = conn.prepareStatement(sql)) {
            st.setInt(1, ep.getIdUsuario());
            st.setString(2, ep.getEmpresa());
            st.setString(3, ep.getCargo());
            st.setDate(4, ep.getDataInicio());
            st.setDate(5, ep.getDataFim());
            st.setString(6, ep.getDescricao());
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    public List<ExperienciaProfissional> listarPorUsuario(int idUsuario) {
        List<ExperienciaProfissional> lista = new ArrayList<>();
        String sql = "SELECT * FROM ExperienciaProfissional WHERE id_usuario = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)){

            stmt.setInt(1, idUsuario);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                ExperienciaProfissional ep = new ExperienciaProfissional();
                ep.setId(rs.getInt("id"));
                ep.setIdUsuario(rs.getInt("id_usuario"));
                ep.setEmpresa(rs.getString("empresa"));
                ep.setCargo(rs.getString("cargo"));
                ep.setDataInicio(rs.getDate("data_inicio"));
                ep.setDataFim(rs.getDate("data_fim"));
                ep.setDescricao(rs.getString("descricao"));
                lista.add(ep);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public boolean atualizar(ExperienciaProfissional ep){
        String sql = "UPDATE ExperienciaProfissional SET empresa = ?, cargo = ?, data_inicio = ?, data_fim = ?, descricao = ? WHERE id = ? ";
        try (PreparedStatement st = conn.prepareStatement(sql)) {
            st.setString(1, ep.getEmpresa());
            st.setString(2, ep.getCargo());
            st.setDate(3, ep.getDataInicio());
            st.setDate(4, ep.getDataFim());
            st.setString(2, ep.getDescricao());
            st.setInt(5, ep.getId());
            return st.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}