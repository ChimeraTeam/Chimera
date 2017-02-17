package launcher;

import config.WebSocketConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.test.ImportAutoConfiguration;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.web.servlet.DispatcherServlet;
import service.CacheManager;
import service.ChimeraService;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by gleb on 5/22/16.
 */
@SpringBootApplication(scanBasePackages = {"web", "service"})
@ImportAutoConfiguration(WebSocketConfig.class)
public class Launcher {

    @Value("${spring.redis.host}")
    private String redisHost;
    @Value("${async.cache.threads}")
    private int threads;

    public static void main(String[] args) {
        SpringApplication.run(Launcher.class, args);
    }

    @Bean
    public ServletRegistrationBean dispatcherRegistration(DispatcherServlet dispatcherServlet) {
        ServletRegistrationBean registration = new ServletRegistrationBean(dispatcherServlet);
        registration.addUrlMappings("/chimera_service/*");
        return registration;
    }

    @Bean
    public CacheManager cacheManager() {
        return new CacheManager(redisHost);
    }

    @Bean
    @Scope("prototype")
    public ChimeraService chimeraService() {
        return new ChimeraService();
    }

    @Bean
    public ExecutorService executorService() {
        return Executors.newFixedThreadPool(threads);
    }

}
