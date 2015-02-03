package common;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import java.util.MissingResourceException;
import java.util.ResourceBundle;

/**
 * Created by gleb on 03.11.2014.
 */
@Configuration
@PropertySource("classpath:config/chimera.properties")
public class SystemUtil {

    private static Logger logger = Logger.getLogger(SystemUtil.class);
    private static final String HOST = "chimera.host";
    private static final String SOLR = "chimera.solr.server";
    private static final String MYSQL_HOST = "chimera.mysql.host";
    private static final String PORT = "chimera.port";
    private static final String CONTEXT_PATH = "chimera.context";
    @Autowired
    private Environment environment;

    private String getProperty(String key) {
        return environment.getProperty(key);
    }

    /**
     * Return system/default property : chimera.host . Example : http://localhost:8080/chimera_web
     *
     * @return host of chimera
     */
    public String getHost() {
        return (System.getProperty(HOST) != null) ? System.getProperty(HOST) : getProperty(HOST);
    }

    /**
     * Return system/default property : chimera.port . Example : 8080
     *
     * @return port of chimera
     */
    public String getPort() {
        return (System.getProperty(PORT) != null) ? System.getProperty(PORT) : getProperty(PORT);
    }

    /**
     * Return system/default property : chimera.context . Example : /chimera_web
     *
     * @return port of chimera
     */
    public String getContextPath() {
        return (System.getProperty(CONTEXT_PATH) != null) ? System.getProperty(CONTEXT_PATH) : getProperty(CONTEXT_PATH);
    }

    /**
     * Return system/default property : chimera.solr.server . Example : http://localhost:8983/solr
     * http://localhost:8983/solr
     *
     * @return url of solr server
     */
    public String getSolrServer() {
        return (System.getProperty(SOLR) != null) ? System.getProperty(SOLR) : getProperty(SOLR);
    }

    /**
     * Return system/default property : chimera.mysql.host . Example :
     * ""
     *
     * @return host of mysql
     */
    public String getMysqlHost() {
        return (System.getProperty(MYSQL_HOST) != null) ? System.getProperty(MYSQL_HOST) : getProperty(MYSQL_HOST);
    }
}
