package model;

public class Habilidade {
    private int id;
    private int id_Usuario;
    private String nome;

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdUsuario() { return id_Usuario; }
    public void setIdUsuario(int id_Usuario) { this.id_Usuario = id_Usuario; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
}
