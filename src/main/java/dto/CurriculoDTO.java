package dto;

import java.util.List;

public class CurriculoDTO {
    private int id_usuario;
    private ContatoDTO contato;
    private String resumo;
    private List<ExperienciaDTO> experiencias;
    private List<FormacaoDTO> formacoes;
    private List<String> habilidades;

    // getters / setters
    public int getIdUsuario() { return id_usuario; }
    public void setIdUsuario(int id_usuario) { this.id_usuario = id_usuario; }

    public ContatoDTO getContato() { return contato; }
    public void setContato(ContatoDTO contato) { this.contato = contato; }
    
    public String getResumo() { return resumo; }
    public void setResumo(String resumo) { this.resumo = resumo; }
    
    public List<ExperienciaDTO> getExperiencias() { return experiencias; }
    public void setExperiencias(List<ExperienciaDTO> experiencias) { this.experiencias = experiencias; }
    
    public List<FormacaoDTO> getFormacoes() { return formacoes; }
    public void setFormacoes(List<FormacaoDTO> formacoes) { this.formacoes = formacoes; }
    
    public List<String> getHabilidades() { return habilidades; }
    public void setHabilidades(List<String> habilidades) { this.habilidades = habilidades; }
}