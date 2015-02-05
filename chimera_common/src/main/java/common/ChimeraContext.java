package common;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * Created by gleb on 31.01.2015.
 */
@Configuration
@PropertySource("classpath:config/chimera.properties")
public class ChimeraContext {

    @Bean
    public SystemUtil systemUtil(){
        return SystemUtil.getSystemUtil();
    }

}
