package util;

import java.net.URI;
import java.sql.Connection;
import java.sql.DriverManager;

public class Conexao {
    public static Connection getConnection() {
        try {
            String databaseUrl = System.getenv("DATABASE_URL");

            if (databaseUrl != null) {
                if (databaseUrl.startsWith("postgresql://")) {
                    Class.forName("org.postgresql.Driver");

                    URI uri = new URI(databaseUrl);

                    String userInfo = uri.getUserInfo(); // user:pass
                    String[] parts = userInfo.split(":", 2);
                    String user = parts[0];
                    String password = parts.length > 1 ? parts[1] : "";

                    String host = uri.getHost();
                    int port = uri.getPort();
                    String dbName = uri.getPath(); // /dbname

                    String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + dbName;

                    return DriverManager.getConnection(jdbcUrl, user, password);
                } else {
                    // Se já vier em formato JDBC, usa direto
                    return DriverManager.getConnection(databaseUrl);
                }

            } else {
                // Fallback: MySQL local (como você já tinha)
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
