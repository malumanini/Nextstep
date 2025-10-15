package dto;

public class ContatoDTO {
    private int idUsuario; // importante: frontend deve enviar id do usuário logado
    private String telefone;
    private String tituloProfissional;
    private String linkLinkedin;
    private String linkPortfolio;

    // getters / setters
    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    
    public String getTituloProfissional() { return tituloProfissional; }
    public void setTituloProfissional(String tituloProfissional) { this.tituloProfissional = tituloProfissional; }
    
    public String getLinkLinkedin() { return linkLinkedin; }
    public void setLinkLinkedin(String linkLinkedin) { this.linkLinkedin = linkLinkedin; }
    
    public String getLinkPortfolio() { return linkPortfolio; }
    public void setLinkPortfolio(String linkPortfolio) { this.linkPortfolio = linkPortfolio; }
}