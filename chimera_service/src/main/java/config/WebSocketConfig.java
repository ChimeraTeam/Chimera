package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import web.ChimeraWebSocket;

/**
 * Created by gleb on 6/11/16.
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        webSocketHandlerRegistry.addHandler(chimeraWebSocket(), "/websocket").setAllowedOrigins("*");
    }

    @Bean
    public ChimeraWebSocket chimeraWebSocket() {
        return new ChimeraWebSocket();
    }
}
