package model;

import java.sql.Date;

public class ExperienciaProfissional {
    private int id;
    private int id_usuario;
    private String empresa;
    private String cargo;
    private Date data_inicio;
    private Date data_fim;
    private String descricao;

    public ExperienciaProfissional() {}

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdUsuario() { return id_usuario; }
    public void setIdUsuario(int id_usuario) { this.id_usuario = id_usuario; }

    public String getEmpresa() { return empresa; }
    public void setEmpresa(String empresa) { this.empresa = empresa; }

    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }

    public Date getDataInicio() { return data_inicio; }
    public void setDataInicio(Date data_inicio) { this.data_inicio = data_inicio; }

    public Date getDataFim() { return data_fim; }
    public void setDataFim(Date data_fim) { this.data_fim = data_fim; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
}
