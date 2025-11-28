package util;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexao {
    public static Connection getConnection() {
        try {
            String databaseUrl = System.getenv("DATABASE_URL");
            
            if (databaseUrl != null) {
                return DriverManager.getConnection(databaseUrl);
            } else {
                String host = System.getenv().getOrDefault("DB_HOST", "localhost");
                String port = System.getenv().getOrDefault("DB_PORT", "3306");
                String dbName = System.getenv().getOrDefault("DB_NAME", "curriculo");
                String user = System.getenv().getOrDefault("DB_USER", "root");
                String password = System.getenv().getOrDefault("DB_PASSWORD", "");
                
                String url = "jdbc:mysql://" + host + ":" + port + "/" + dbName;
                
                return DriverManager.getConnection(url, user, password);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao conectar ao banco: " + e.getMessage());
        }
    }
}