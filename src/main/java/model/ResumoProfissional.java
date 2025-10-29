package model;

import java.io.Serializable;

public class ResumoProfissional implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private int idCurriculo; // Chave estrangeira
    private String descricao; // Usamos 'descricao' para simplificar no modelo

    // Construtor padrão
    public ResumoProfissional() {}

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdCurriculo() { return idCurriculo; }
    public void setIdCurriculo(int idCurriculo) { this.idCurriculo = idCurriculo; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
}