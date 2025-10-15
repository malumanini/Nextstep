package model;

import java.sql.Date;

public class Curriculo {
    private int id;
    private int id_usuario;
    private Date data_criacao;
    private String modelo;
    private String arquivo_gerado;

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdUsuario() { return id_usuario; }
    public void setIdUsuario(int id_usuario) { this.id_usuario = id_usuario; }

    public Date getDataCriacao() { return data_criacao; }
    public void setDataCriacao(Date data_criacao) { this.data_criacao = data_criacao; }

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public String getArquivoGerado() { return arquivo_gerado; }
    public void setArquivoGerado(String arquivo_gerado) { this.arquivo_gerado = arquivo_gerado; }
}