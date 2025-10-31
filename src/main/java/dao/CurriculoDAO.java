package dao;

import dto.*;
import util.Conexao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CurriculoDAO {

    private final ContatoDAO contatoDAO = new ContatoDAO();
    private final ResumoProfissionalDAO resumoDAO = new ResumoProfissionalDAO();
    private final ExperienciaDAO experienciaDAO = new ExperienciaDAO();
    private final FormacaoDAO formacaoDAO = new FormacaoDAO();
    private final HabilidadeDAO habilidadeDAO = new HabilidadeDAO();
    private final IdiomaDAO idiomaDAO = new IdiomaDAO();

    public int cadastrarCurriculo(CurriculoDTO dto) {
        String sql = "INSERT INTO Curriculo (idUsuario, dataCriacao, modelo, arquivoGerado) VALUES (?, CURRENT_DATE, ?, ?)";
        int idGerado = -1;

        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setInt(1, dto.getIdUsuario());
            stmt.setString(2, null);
            stmt.setString(3, null);
            stmt.executeUpdate();

            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) idGerado = rs.getInt(1);

            if (idGerado > 0) {
                if (dto.getContato() != null) contatoDAO.inserir(dto.getContato(), idGerado);
                if (dto.getResumo() != null) resumoDAO.inserir(dto.getResumo(), idGerado);
                if (dto.getExperiencias() != null) for (ExperienciaDTO e : dto.getExperiencias()) experienciaDAO.inserir(e, idGerado);
                if (dto.getFormacoes() != null) for (FormacaoDTO f : dto.getFormacoes()) formacaoDAO.inserir(f, idGerado);
                if (dto.getHabilidades() != null) for (HabilidadeDTO h : dto.getHabilidades()) habilidadeDAO.inserir(h, idGerado);
                if (dto.getIdiomas() != null) for (IdiomasDTO i : dto.getIdiomas()) idiomaDAO.inserir(i, idGerado);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return idGerado;
    }

    public List<CurriculoDTO> listarPorUsuario(int idUsuario) {
        List<CurriculoDTO> lista = new ArrayList<>();
        String sql = "SELECT * FROM Curriculo WHERE idUsuario = ?";

        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idUsuario);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                CurriculoDTO c = new CurriculoDTO();
                int idCurriculo = rs.getInt("id");

                c.setId(idCurriculo);
                c.setIdUsuario(rs.getInt("idUsuario"));
                c.setDataCriacao(rs.getString("dataCriacao"));
                c.setModelo(rs.getString("modelo"));
                c.setArquivoGerado(rs.getString("arquivoGerado"));

                c.setContato(contatoDAO.listarPorCurriculo(idCurriculo).stream().findFirst().orElse(null));
                c.setResumo(resumoDAO.listarPorCurriculo(idCurriculo).stream().findFirst().orElse(null));
                c.setExperiencias(experienciaDAO.listarPorCurriculo(idCurriculo));
                c.setFormacoes(formacaoDAO.listarPorCurriculo(idCurriculo));
                c.setHabilidades(habilidadeDAO.listarPorCurriculo(idCurriculo));
                c.setIdiomas(idiomaDAO.listarPorCurriculo(idCurriculo));

                lista.add(c);
            }

        } catch (SQLException e) { e.printStackTrace(); }

        return lista;
    }

    public void editar(CurriculoDTO dto) {
        String sql = "UPDATE Curriculo SET modelo=?, arquivoGerado=? WHERE id=?";

        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, dto.getModelo());
            stmt.setString(2, dto.getArquivoGerado());
            stmt.setInt(3, dto.getId());
            stmt.executeUpdate();

            if (dto.getContato() != null) contatoDAO.editar(dto.getContato(), dto.getId());
            if (dto.getResumo() != null) resumoDAO.editar(dto.getResumo(), dto.getId());
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public void deletar(int idCurriculo) {
        try {
            contatoDAO.deletar(idCurriculo);
            resumoDAO.deletar(idCurriculo);
            experienciaDAO.deletar(idCurriculo);
            formacaoDAO.deletar(idCurriculo);
            habilidadeDAO.deletar(idCurriculo);
            idiomaDAO.deletar(idCurriculo);

            String sql = "DELETE FROM Curriculo WHERE id=?";
            try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, idCurriculo);
                stmt.executeUpdate();
            }

        } catch (SQLException e) { e.printStackTrace(); }
    }
}
