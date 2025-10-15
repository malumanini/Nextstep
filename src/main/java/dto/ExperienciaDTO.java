package dto;

public class ExperienciaDTO {
    private String empresa;
    private String cargo;
    private String inicio; // yyyy-MM-dd
    private String fim;    // yyyy-MM-dd or empty/null
    private String descricao;

    // getters / setters
    public String getEmpresa() { return empresa; }
    public void setEmpresa(String empresa) { this.empresa = empresa; }
    
    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }
    
    public String getInicio() { return inicio; }
    public void setInicio(String inicio) { this.inicio = inicio; }
    
    public String getFim() { return fim; }
    public void setFim(String fim) { this.fim = fim; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
}