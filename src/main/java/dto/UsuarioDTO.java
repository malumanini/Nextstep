package dto;

public class UsuarioDTO {
    private String nome;
    private String email;
    private String senha;
    private String plano;

    // Construtor vazio
    public UsuarioDTO() {}

    // Getters e Setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getPlano() { return plano; }
    public void setPlano(String plano) { this.plano = plano; }
}