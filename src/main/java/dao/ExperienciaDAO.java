package dao;

import dto.ExperienciaDTO;
import util.Conexao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ExperienciaDAO {

    public void inserir(ExperienciaDTO dto, int idCurriculo) {
        String sql = "INSERT INTO ExperienciaProfissional (idCurriculo, empresa, cargo, dataInicio, dataFim, descricao) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            stmt.setString(2, dto.getEmpresa());
            stmt.setString(3, dto.getCargo());
            stmt.setString(4, dto.getDataInicio());
            stmt.setString(5, dto.getDataFim());
            stmt.setString(6, dto.getDescricao());
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public List<ExperienciaDTO> listarPorCurriculo(int idCurriculo) {
        List<ExperienciaDTO> lista = new ArrayList<>();
        String sql = "SELECT * FROM ExperienciaProfissional WHERE idCurriculo = ?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                ExperienciaDTO e = new ExperienciaDTO();
                e.setId(rs.getInt("id"));
                e.setEmpresa(rs.getString("empresa"));
                e.setCargo(rs.getString("cargo"));
                e.setDataInicio(rs.getString("dataInicio"));
                e.setDataFim(rs.getString("dataFim"));
                e.setDescricao(rs.getString("descricao"));
                lista.add(e);
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return lista;
    }

    // -------------------------
    // ATUALIZAR
    // -------------------------
    public void atualizar(ExperienciaDTO dto) {

        String sql = "UPDATE ExperienciaProfissional "
                   + "SET empresa=?, cargo=?, dataInicio=?, dataFim=?, descricao=? "
                   + "WHERE id=?";

        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, dto.getEmpresa());
            stmt.setString(2, dto.getCargo());
            stmt.setString(3, dto.getDataInicio());
            stmt.setString(4, dto.getDataFim());
            stmt.setString(5, dto.getDescricao());
            stmt.setInt(6, dto.getId());

            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // -------------------------
    // 🔥 ATUALIZAR LISTA COMPLETA
    // -------------------------
    public void atualizarLista(int idCurriculo, List<ExperienciaDTO> novas) {

        // 1. Buscar itens atuais
        List<ExperienciaDTO> atuais = listarPorCurriculo(idCurriculo);

        // 2. Deletar itens que sumiram no DTO
        for (ExperienciaDTO existente : atuais) {
            boolean aindaExiste = novas.stream()
                    .anyMatch(n -> n.getId() != 0 && n.getId() == existente.getId());

            if (!aindaExiste) {
                deletar(existente.getId());
            }
        }

        // 3. Atualizar ou inserir
        for (ExperienciaDTO nova : novas) {

            if (nova.getId() == 0 || nova.getId() == -1) {
                // novo item
                inserir(nova, idCurriculo);
            } else {
                // atualizar existente
                atualizar(nova);
            }
        }
    }

    public void deletar(int idCurriculo) {
        String sql = "DELETE FROM ExperienciaProfissional WHERE idCurriculo = ?";
        try (Connection conn = Conexao.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurriculo);
            stmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }
}
