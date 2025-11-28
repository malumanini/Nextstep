package dao;

import dto.HabilidadeDTO;
import util.Conexao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class HabilidadeDAO {

    // LISTAR
    public List<HabilidadeDTO> listarPorCurriculo(int idCurriculo) {
        List<HabilidadeDTO> lista = new ArrayList<>();

        String sql = "SELECT * FROM Habilidade WHERE idCurriculo = ?";

        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurriculo);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                HabilidadeDTO h = new HabilidadeDTO();
                h.setId(rs.getInt("id"));
                h.setNome(rs.getString("nome"));
                lista.add(h);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }

    // INSERIR
    public void inserir(HabilidadeDTO dto, int idCurriculo) {

        String sql = "INSERT INTO Habilidade (idCurriculo, nome) VALUES (?, ?)";

        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurriculo);
            stmt.setString(2, dto.getNome());
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // ATUALIZAR
    public void atualizar(HabilidadeDTO dto) {

        String sql = "UPDATE Habilidade SET nome=? WHERE id=?";

        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, dto.getNome());
            stmt.setInt(2, dto.getId());
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // DELETAR
    public void deletar(int idCurriculo) {

        String sql = "DELETE FROM ExperienciaProfissional WHERE idCurriculo = ?";

        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurriculo);
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // ATUALIZAR LISTA
    public void atualizarLista(int idCurriculo, List<HabilidadeDTO> novas) {

        List<HabilidadeDTO> atuais = listarPorCurriculo(idCurriculo);

        // Remover os que sumiram
        for (HabilidadeDTO existente : atuais) {
            boolean aindaExiste = novas.stream()
                .anyMatch(n -> n.getId() != 0 && n.getId() == existente.getId());

            if (!aindaExiste) deletar(existente.getId());
        }

        // Inserir/Atualizar
        for (HabilidadeDTO nova : novas) {

            if (nova.getId() == 0) {
                inserir(nova, idCurriculo);
            } else {
                atualizar(nova);
            }
        }
    }
}