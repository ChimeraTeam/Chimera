package common;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

/**
 * Created by gleb on 31.01.2015.
 */
@Configuration
@PropertySource("classpath:config/chimera.properties")
public class ChimeraContext {

    @Autowired
    private Environment environment;

    public String getHost() {
        return environment.getRequiredProperty(SystemUtil.HOST);
    }

    public String getSolr() {
        return environment.getRequiredProperty(SystemUtil.SOLR);
    }

    public String getMysql() {
        return environment.getRequiredProperty(SystemUtil.MYSQL_HOST);
    }

    public String getPort() {
        return environment.getRequiredProperty(SystemUtil.PORT);
    }

    public String getContextPath() {
        return environment.getRequiredProperty(SystemUtil.CONTEXT_PATH);
    }

}
