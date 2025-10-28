package dto;

public class ContatoDTO {
    private int id_usuario; // importante: frontend deve enviar id do usuário logado
    private String nome;
    private String email;
    private String telefone;
    private String titulo_profissional;
    private String link_linkedin;
    private String link_portifolio;

    // getters / setters
    public int getIdUsuario() { return id_usuario; }
    public void setIdUsuario(int id_usuario) { this.id_usuario = id_usuario; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getTituloProfissional() { return titulo_profissional; }
    public void setTituloProfissional(String titulo_profissional) { this.titulo_profissional = titulo_profissional; }

    public String getLinkLinkedin() { return link_linkedin; }
    public void setLinkLinkedin(String link_linkedin) { this.link_linkedin = link_linkedin; }

    public String getLinkPortfolio() { return link_portifolio; }
    public void setLinkPortfolio(String link_portifolio) { this.link_portifolio = link_portifolio; }
}