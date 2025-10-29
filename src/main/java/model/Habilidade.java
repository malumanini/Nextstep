package model;

import java.io.Serializable;

public class Habilidade implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private int idCurriculo; // Chave estrangeira
    private String nome;

    // Construtor padrão
    public Habilidade() {}

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdCurriculo() { return idCurriculo; }
    public void setIdCurriculo(int idCurriculo) { this.idCurriculo = idCurriculo; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
}