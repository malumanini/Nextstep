package dao;

import dto.*;
import model.*;
import java.sql.*;
import util.Conexao;

public class CurriculoDAO {

    private final ContatoDAO contatoDAO = new ContatoDAO();
    private final ResumoProfissionalDAO resumoDAO = new ResumoProfissionalDAO();
    private final ExperienciaDAO experienciaDAO = new ExperienciaDAO();
    private final FormacaoDAO formacaoDAO = new FormacaoDAO();
    private final HabilidadeDAO habilidadeDAO = new HabilidadeDAO();
    private final IdiomaDAO idiomaDAO = new IdiomaDAO();

    public int cadastrarCurriculo(CurriculoDTO dto) {
        String sql = "INSERT INTO Curriculo (id_usuario, data_criacao, modelo, arquivo_gerado) VALUES (?, CURRENT_DATE, ?, ?)";
        int idGerado = -1;

        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setInt(1, dto.getIdUsuario());
            stmt.setString(2, null);
            stmt.setString(3, null);
            stmt.executeUpdate();

            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) idGerado = rs.getInt(1);

            if (idGerado <= 0) return -1;

            // Insere entidades relacionadas
            if (dto.getContato() != null) contatoDAO.inserir(dto.getContato(), idGerado);
            if (dto.getResumo() != null) resumoDAO.inserir(dto.getResumo(), idGerado);
            if (dto.getExperiencias() != null) for (ExperienciaDTO e : dto.getExperiencias()) experienciaDAO.inserir(e, idGerado);
            if (dto.getFormacoes() != null) for (FormacaoDTO f : dto.getFormacoes()) formacaoDAO.inserir(f, idGerado);
            if (dto.getHabilidades() != null) for (HabilidadeDTO h : dto.getHabilidades()) habilidadeDAO.inserir(h, idGerado);
            if (dto.getIdiomas() != null) for (IdiomasDTO i : dto.getIdiomas()) idiomaDAO.inserir(i, idGerado);

            return idGerado;

        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }
}
