package model;

public class Contatos {
    private int id;
    private int idUsuario;
    private String telefone;
    private String tituloProfissional;
    private String linkLinkedin;
    private String linkPortifolio;

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getTituloProfissional() { return tituloProfissional; }
    public void setTituloProfissional(String tituloProfissional) { this.tituloProfissional = tituloProfissional; }

    public String getLinkLinkedin() { return linkLinkedin; }
    public void setLinkLinkedin(String linkLinkedin) { this.linkLinkedin = linkLinkedin; }

    public String getLinkPortifolio() { return linkPortifolio; }
    public void setLinkPortifolio(String linkPortifolio) { this.linkPortifolio = linkPortifolio; }
}
