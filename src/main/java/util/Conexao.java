package util;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexao {
    private static final String URL = System.getenv().getOrDefault(
        "DATABASE_URL", 
        "jdbc:postgresql://localhost:5432/curriculoDB"
    );
    private static final String USER = System.getenv().getOrDefault("DB_USER", "postgres");
    private static final String PASSWORD = System.getenv().getOrDefault("DB_PASSWORD", "123");

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (Exception e) {
            throw new RuntimeException("Erro na conexão com o banco de dados: " + e.getMessage());
        }
    }
}