import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

/**
 * Optional Java backend for the portfolio.
 *
 * The front-end runs with VS Code Live Server.
 * This class is a dependency-free Java example that exposes a small API
 * at http://localhost:8080/api/status when started with:
 *
 *   javac PortfolioServer.java
 *   java PortfolioServer
 */
public class PortfolioServer {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/api/status", (HttpExchange exchange) -> {
            String response = "{\"status\":\"online\",\"owner\":\"Saugat Sapkota\",\"role\":\"IT Student & Web Designer\"}";
            exchange.getResponseHeaders().add("Content-Type", "application/json; charset=UTF-8");
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            byte[] data = response.getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, data.length);
            try (OutputStream out = exchange.getResponseBody()) {
                out.write(data);
            }
        });

        server.start();
        System.out.println("Java portfolio API running at http://localhost:8080/api/status");
    }
}
