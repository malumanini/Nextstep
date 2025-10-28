package dto;

import java.util.List;

public class CurriculoDTO {
    private int id_usuario;
    private ContatoDTO contato;
    private ResumoProfissionalDTO resumo;
    private List<ExperienciaDTO> experiencias;
    private List<FormacaoDTO> formacoes;
    private List<HabilidadeDTO> habilidades;
    private List<IdiomasDTO> idiomas;

    // getters / setters
    public int getIdUsuario() { return id_usuario; }
    public void setIdUsuario(int id_usuario) { this.id_usuario = id_usuario; }

    public ContatoDTO getContato() { return contato; }
    public void setContato(ContatoDTO contato) { this.contato = contato; }
    
    public ResumoProfissionalDTO getResumo() { return resumo; }
    public void setResumo(ResumoProfissionalDTO resumo) { this.resumo = resumo; }
    
    public List<ExperienciaDTO> getExperiencias() { return experiencias; }
    public void setExperiencias(List<ExperienciaDTO> experiencias) { this.experiencias = experiencias; }
    
    public List<FormacaoDTO> getFormacoes() { return formacoes; }
    public void setFormacoes(List<FormacaoDTO> formacoes) { this.formacoes = formacoes; }
    
    public List<HabilidadeDTO> getHabilidades() { return habilidades; }
    public void setHabilidades(List<HabilidadeDTO> habilidades) { this.habilidades = habilidades; }

    public List<IdiomasDTO> getIdiomas() { return idiomas; }
    public void setIdiomas(List<IdiomasDTO> idiomas) { this.idiomas = idiomas; }
}