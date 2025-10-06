package model;

public class Contatos {
    private int id;
    private int id_Usuario;
    private String telefone;
    private String titulo_Profissional;
    private String link_Linkedin;
    private String link_Portifolio;

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdUsuario() { return id_Usuario; }
    public void setIdUsuario(int id_Usuario) { this.id_Usuario = id_Usuario; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getTituloProfissional() { return titulo_Profissional; }
    public void setTituloProfissional(String titulo_Profissional) { this.titulo_Profissional = titulo_Profissional; }

    public String getLinkLinkedin() { return link_Linkedin; }
    public void setLinkLinkedin(String link_Linkedin) { this.link_Linkedin = link_Linkedin; }

    public String getLinkPortifolio() { return link_Portifolio; }
    public void setLinkPortifolio(String link_Portifolio) { this.link_Portifolio = link_Portifolio; }
}
