package dto;

import java.sql.Date;

public class FormacaoDTO {
    private int id_usuario;
    private String instituicao;
    private String curso;
    private Date data_inicio;
    private Date data_fim;

    // getters / setters
    public int getIdUsuario() { return id_usuario; }
    public void setIdUsuario(int id_usuario) { this.id_usuario = id_usuario; }

    public String getInstituicao() { return instituicao; }
    public void setInstituicao(String instituicao) { this.instituicao = instituicao; }
    
    public String getCurso() { return curso; }
    public void setCurso(String curso) { this.curso = curso; }
    
    public Date getDataInicio() { return data_inicio; }
    public void setDataInicio(Date data_inicio) { this.data_inicio = data_inicio; }

    public Date getDataFim() { return data_fim; }
    public void setDataFim(Date data_fim) { this.data_fim = data_fim; }
    
}