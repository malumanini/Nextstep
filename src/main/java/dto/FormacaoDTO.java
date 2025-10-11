package dto;

public class FormacaoDTO {
    private String instituicao;
    private String curso;
    private String inicio; // yyyy-MM-dd
    private String fim;    // yyyy-MM-dd or empty/null
    private String status; // opcional

    // getters / setters
    public String getInstituicao() { return instituicao; }
    public void setInstituicao(String instituicao) { this.instituicao = instituicao; }
    public String getCurso() { return curso; }
    public void setCurso(String curso) { this.curso = curso; }
    public String getInicio() { return inicio; }
    public void setInicio(String inicio) { this.inicio = inicio; }
    public String getFim() { return fim; }
    public void setFim(String fim) { this.fim = fim; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}