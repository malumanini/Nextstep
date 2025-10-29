package model;

import java.sql.Date;
import java.io.Serializable;

public class FormacaoAcademica implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private int idCurriculo; // Chave estrangeira
    private String instituicao;
    private String curso;
    private Date dataInicio;
    private Date dataFim;

    // Construtor padrão
    public FormacaoAcademica() {}

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdCurriculo() { return idCurriculo; }
    public void setIdCurriculo(int idCurriculo) { this.idCurriculo = idCurriculo; }

    public String getInstituicao() { return instituicao; }
    public void setInstituicao(String instituicao) { this.instituicao = instituicao; }

    public String getCurso() { return curso; }
    public void setCurso(String curso) { this.curso = curso; }

    public Date getDataInicio() { return dataInicio; }
    public void setDataInicio(Date dataInicio) { this.dataInicio = dataInicio; }

    public Date getDataFim() { return dataFim; }
    public void setDataFim(Date dataFim) { this.dataFim = dataFim; }
}