package dto;

import java.util.List;

public class CurriculoDTO {
    private int id;
    private int idUsuario;
    private String dataCriacao;
    private String modelo;
    private String arquivoGerado;

    private ContatoDTO contato;
    private ResumoProfissionalDTO resumo;
    private List<ExperienciaDTO> experiencias;
    private List<FormacaoDTO> formacoes;
    private List<HabilidadeDTO> habilidades;
    private List<IdiomasDTO> idiomas;

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

    public String getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(String dataCriacao) { this.dataCriacao = dataCriacao; }

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public String getArquivoGerado() { return arquivoGerado; }
    public void setArquivoGerado(String arquivoGerado) { this.arquivoGerado = arquivoGerado; }

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