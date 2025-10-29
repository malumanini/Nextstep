package model;

import java.sql.Date;
import java.io.Serializable;

public class ExperienciaProfissional implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private int idCurriculo; // Chave estrangeira
    private String empresa;
    private String cargo;
    private Date dataInicio;
    private Date dataFim;
    private String descricao; // Responsabilidades

    // Construtor padrão
    public ExperienciaProfissional() {}

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdCurriculo() { return idCurriculo; }
    public void setIdCurriculo(int idCurriculo) { this.idCurriculo = idCurriculo; }

    public String getEmpresa() { return empresa; }
    public void setEmpresa(String empresa) { this.empresa = empresa; }

    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }

    public Date getDataInicio() { return dataInicio; }
    public void setDataInicio(Date dataInicio) { this.dataInicio = dataInicio; }

    public Date getDataFim() { return dataFim; }
    public void setDataFim(Date dataFim) { this.dataFim = dataFim; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
}