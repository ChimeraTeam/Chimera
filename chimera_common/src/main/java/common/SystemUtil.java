package common;

import org.apache.log4j.Logger;

import java.util.MissingResourceException;
import java.util.ResourceBundle;

/**
 * Created by gleb on 03.11.2014.
 */
public class SystemUtil {

    private static Logger logger = Logger.getLogger(SystemUtil.class);
    private static SystemUtil instance;
    private static ResourceBundle rb;
    private static final String CONFIGURATION_PROPERTIES_FILE = "com.commons.config.chimera_system";
    private static final String HOST = "chimera.host";
    private static final String SOLR = "chimera.solr.server";
    private static final String SOLR_CLOUD = "chimera.solr.cloud";
    private static final String MYSQL_HOST = "chimera.mysql.host";

    public static SystemUtil getInstance() {
        if (instance == null) {
            try {
                rb = ResourceBundle.getBundle(CONFIGURATION_PROPERTIES_FILE);
            } catch (MissingResourceException e) {
                logger.debug("SystemUtil:getInstance ", e);
                logger.error("SystemUtil:getInstance " + e.getMessage());
            }
            instance = new SystemUtil();
        }
        return instance;
    }

    private String getProperty(String key) {
        return rb.getString(key);
    }

    /**
     * Return system/default property : chimera.host . Example : chimera.com
     *
     * @return host of chimera
     */
    public String getHost() {
        return (System.getProperty(HOST) != null) ? System.getProperty(HOST) : getProperty(HOST);
    }

    /**
     * Return system/default property : chimera.solr.server . Example :
     * http://localhost:8983/solr
     *
     * @return url of solr server
     */
    public String getSolrServer() {
        return (System.getProperty(SOLR) != null) ? System.getProperty(SOLR) : getProperty(SOLR);
    }

    /**
     * Return system/default property : chimera.solr.cloud . Example :
     *
     *
     * @return host of solr cloud
     */
    public String getSolrCloud() {
        return (System.getProperty(SOLR_CLOUD) != null) ? System.getProperty(SOLR_CLOUD) : getProperty(SOLR_CLOUD);
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
