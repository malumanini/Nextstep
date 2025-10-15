package model;

public class Contato {
    private int id;
    private int id_usuario;
    private String telefone;
    private String titulo_profissional;
    private String link_linkedin;
    private String link_portifolio;

    public Contato() {}

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdUsuario() { return id_usuario; }
    public void setIdUsuario(int id_usuario) { this.id_usuario = id_usuario; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getTituloProfissional() { return titulo_profissional; }
    public void setTituloProfissional(String titulo_profissional) { this.titulo_profissional = titulo_profissional; }

    public String getLinkLinkedin() { return link_linkedin; }
    public void setLinkLinkedin(String link_linkedin) { this.link_linkedin = link_linkedin; }

    public String getLinkPortfolio() { return link_portifolio; }
    public void setLinkPortfolio(String link_portifolio) { this.link_portifolio = link_portifolio; }
}
