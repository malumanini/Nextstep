package dto;

public class ContatoDTO {
    private int id;
    private String nome;
    private String email;
    private String telefone;
    private String tituloProfissional;
    private String linkLinkedin;
    private String linkPortifolio;

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getTituloProfissional() { return tituloProfissional; }
    public void setTituloProfissional(String tituloProfissional) { this.tituloProfissional = tituloProfissional; }

    public String getLinkLinkedin() { return linkLinkedin; }
    public void setLinkLinkedin(String linkLinkedin) { this.linkLinkedin = linkLinkedin; }

    public String getLinkPortifolio() { return linkPortifolio; }
    public void setLinkPortifolio(String linkPortifolio) { this.linkPortifolio = linkPortifolio; }
}