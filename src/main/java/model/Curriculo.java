package model;

import java.sql.Date;
import java.io.Serializable;

public class Curriculo implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private int idUsuario; // Chave estrangeira para a tabela Usuario
    private Date dataCriacao;
    private String modelo;
    private String arquivoGerado; // URL ou caminho do PDF/arquivo final

    // Construtor padrão
    public Curriculo() {}

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

    public Date getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(Date dataCriacao) { this.dataCriacao = dataCriacao; }

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public String getArquivoGerado() { return arquivoGerado; }
    public void setArquivoGerado(String arquivoGerado) { this.arquivoGerado = arquivoGerado; }
}