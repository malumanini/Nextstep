package dto;

public class ContatoDTO {
    private int idUsuario; // importante: frontend deve enviar id do usuário logado
    private String telefone;
    private String titulo_profissional;
    private String link_linkedin;
    private String link_portifolio;

    // getters / setters
    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public String getTituloProfissional() { return titulo_profissional; }
    public void setTituloProfissional(String titulo_profissional) { this.titulo_profissional = titulo_profissional; }
    public String getLinkLinkedin() { return link_linkedin; }
    public void setLinkLinkedin(String link_linkedin) { this.link_linkedin = link_linkedin; }
    public String getLinkPortfolio() { return link_portifolio; }
    public void setLinkPortfolio(String link_portifolio) { this.link_portifolio = link_portifolio; }
}
