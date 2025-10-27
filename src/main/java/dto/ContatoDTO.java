package dto;

public class ContatoDTO {
    private int id_usuario; // importante: frontend deve enviar id do usuário logado
    private String telefone;
    private String tituloProfissional;
    private String linkLinkedin;
    private String linkPortfolio;

    // getters / setters
    public int getIdUsuario() { return id_usuario; }
    public void setIdUsuario(int id_usuario) { this.id_usuario = id_usuario; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    
    public String getTituloProfissional() { return tituloProfissional; }
    public void setTituloProfissional(String tituloProfissional) { this.tituloProfissional = tituloProfissional; }
    
    public String getLinkLinkedin() { return linkLinkedin; }
    public void setLinkLinkedin(String linkLinkedin) { this.linkLinkedin = linkLinkedin; }
    
    public String getLinkPortfolio() { return linkPortfolio; }
    public void setLinkPortfolio(String linkPortfolio) { this.linkPortfolio = linkPortfolio; }
}