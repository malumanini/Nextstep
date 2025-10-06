package model;

import java.sql.Date;

public class FormacaoAcademica {
    private int id;
    private int id_Usuario;
    private String instituicao;
    private String curso;
    private Date data_Inicio;
    private Date data_Fim;

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdUsuario() { return id_Usuario; }
    public void setIdUsuario(int id_Usuario) { this.id_Usuario = id_Usuario; }

    public String getInstituicao() { return instituicao; }
    public void setInstituicao(String instituicao) { this.instituicao = instituicao; }

    public String getCurso() { return curso; }
    public void setCurso(String curso) { this.curso = curso; }

    public Date getDataInicio() { return data_Inicio; }
    public void setDataInicio(Date data_Inicio) { this.data_Inicio = data_Inicio; }

    public Date getDataFim() { return data_Fim; }
    public void setDataFim(Date data_Fim) { this.data_Fim = data_Fim; }
}
