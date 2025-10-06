package model;

import java.sql.Date;

public class ExperienciaProfissional {
    private int id;
    private int id_Usuario;
    private String empresa;
    private String cargo;
    private String descricao;
    private Date data_Inicio;
    private Date data_Fim;

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdUsuario() { return id_Usuario; }
    public void setIdUsuario(int id_Usuario) { this.id_Usuario = id_Usuario; }

    public String getEmpresa() { return empresa; }
    public void setEmpresa(String empresa) { this.empresa = empresa; }

    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public Date getDataInicio() { return data_Inicio; }
    public void setDataInicio(Date data_Inicio) { this.data_Inicio = data_Inicio; }

    public Date getDataFim() { return data_Fim; }
    public void setDataFim(Date data_Fim) { this.data_Fim = data_Fim; }
}
