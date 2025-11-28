package dao;

import dto.IdiomasDTO;
import util.Conexao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class IdiomaDAO {

    // LISTAR
    public List<IdiomasDTO> listarPorCurriculo(int idCurriculo) {
        List<IdiomasDTO> lista = new ArrayList<>();

        String sql = "SELECT * FROM Idioma WHERE idCurriculo = ?";

        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurriculo);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                IdiomasDTO i = new IdiomasDTO();
                i.setId(rs.getInt("id"));
                i.setNome(rs.getString("nome"));
                lista.add(i);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }

    // INSERIR
    public void inserir(IdiomasDTO dto, int idCurriculo) {

        String sql = "INSERT INTO Idioma (idCurriculo, nome) VALUES (?, ?)";

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
    public void atualizar(IdiomasDTO dto) {

        String sql = "UPDATE Idioma SET nome=? WHERE id=?";

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

    // ATUALIZAR LISTA COMPLETA
    public void atualizarLista(int idCurriculo, List<IdiomasDTO> novas) {

        List<IdiomasDTO> atuais = listarPorCurriculo(idCurriculo);

        // deletar removidos
        for (IdiomasDTO existente : atuais) {
            boolean aindaExiste = novas.stream()
                .anyMatch(n -> n.getId() != 0 && n.getId() == existente.getId());

            if (!aindaExiste) deletar(existente.getId());
        }

        // atualizar ou inserir
        for (IdiomasDTO nova : novas) {

            if (nova.getId() == 0) {
                inserir(nova, idCurriculo);
            } else {
                atualizar(nova);
            }
        }
    }
}