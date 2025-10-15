package dao;

import model.Curriculo;
import util.Conexao;

import java.sql.*;

public class CurriculoDAO {
    public void inserir(Curriculo c) {
        String sql = "INSERT INTO Curriculo (id_usuario, data_criacao, modelo, arquivo_gerado) VALUES (?, ?, ?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setInt(1, c.getIdUsuario());
            ps.setDate(2, c.getDataCriacao());
            ps.setString(3, c.getModelo());
            ps.setString(4, c.getArquivoGerado());
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) c.setId(rs.getInt(1));
        } catch (SQLException ex) { ex.printStackTrace(); }
    }
}
