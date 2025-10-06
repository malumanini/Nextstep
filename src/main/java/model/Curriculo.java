package model;

import java.sql.Date;

public class Curriculo {
    private int id;
    private int id_Usuario;
    private Date data_Criacao;
    private String modelo;
    private String arquivo_Gerado;

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdUsuario() { return id_Usuario; }
    public void setIdUsuario(int id_Usuario) { this.id_Usuario = id_Usuario; }

    public Date getDataCriacao() { return data_Criacao; }
    public void setDataCriacao(Date data_Criacao) { this.data_Criacao = data_Criacao; }

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public String getArquivoGerado() { return arquivo_Gerado; }
    public void setArquivoGerado(String arquivo_Gerado) { this.arquivo_Gerado = arquivo_Gerado; }
}