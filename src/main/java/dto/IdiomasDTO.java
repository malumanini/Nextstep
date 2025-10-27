package dto;

public class IdiomasDTO {
    private int id_usuario;
    private String nome;

    public IdiomasDTO () {}

    // Getters e Setters
    public int getIdUsuario() { return id_usuario; }
    public void setIdUsuario(int id_usuario) { this.id_usuario = id_usuario; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
}