package dao;

import dto.FormacaoDTO;
import util.Conexao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class FormacaoDAO {

    public void inserir(FormacaoDTO dto, int idCurriculo) {
        String sql = "INSERT INTO FormacaoAcademica (idCurriculo, instituicao, curso, dataInicio, dataFim) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            stmt.setString(2, dto.getInstituicao());
            stmt.setString(3, dto.getCurso());
            stmt.setString(4, dto.getDataInicio());
            stmt.setString(5, dto.getDataFim());
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

   public List<FormacaoDTO> listarPorCurriculo(int idCurriculo) {
        List<FormacaoDTO> lista = new ArrayList<>();

        String sql = "SELECT * FROM FormacaoAcademica WHERE idCurriculo = ?";

        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurriculo);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                FormacaoDTO f = new FormacaoDTO();
                f.setId(rs.getInt("id"));
                f.setInstituicao(rs.getString("instituicao"));
                f.setCurso(rs.getString("curso"));
                f.setDataInicio(rs.getString("dataInicio"));
                f.setDataFim(rs.getString("dataFim"));

                lista.add(f);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }

    // ATUALIZAR
    public void atualizar(FormacaoDTO dto) {

        String sql = "UPDATE FormacaoAcademica "
                   + "SET instituicao=?, curso=?, dataInicio=?, dataFim=? "
                   + "WHERE id=?";

        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, dto.getInstituicao());
            stmt.setString(2, dto.getCurso());
            stmt.setString(3, dto.getDataInicio());
            stmt.setString(4, dto.getDataFim());
            stmt.setInt(5, dto.getId());

            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deletar(int idCurriculo) {
        String sql = "DELETE FROM ExperienciaProfissional WHERE idCurriculo = ?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    // ATUALIZAR LISTA COMPLETA
    public void atualizarLista(int idCurriculo, List<FormacaoDTO> novas) {

        // Buscar existentes
        List<FormacaoDTO> atuais = listarPorCurriculo(idCurriculo);

        // Deletar removidos
        for (FormacaoDTO existente : atuais) {
            boolean aindaExiste = novas.stream()
                .anyMatch(n -> n.getId() != 0 && n.getId() == existente.getId());

            if (!aindaExiste) {
                deletar(existente.getId());
            }
        }

        // Inserir/Atualizar
        for (FormacaoDTO nova : novas) {

            if (nova.getId() == 0) {
                inserir(nova, idCurriculo);
            } else {
                atualizar(nova);
            }
        }
    }
}