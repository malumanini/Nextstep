package dto;

public class ResumoProfissionalDTO {
    private int id_usuario;
    private String descricao;

    public ResumoProfissionalDTO() {}

    // Getters e Setters
    public int getIdUsuario() { return id_usuario; }
    public void setIdUsuario(int id_usuario) { this.id_usuario = id_usuario; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
}
