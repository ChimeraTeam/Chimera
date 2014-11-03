package utils;

import common.SystemUtil;
import org.apache.log4j.Logger;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.impl.HttpSolrServer;

import java.util.Map;

/**
 * Created by gleb on 03.11.2014.
 */
public class DAOSessionUtil {

    private static Logger logger = Logger.getLogger(DAOSessionUtil.class);
    private static volatile Map<String, Object> sessionFactories = null;
    public static final String CHIMERA_SOLR_CORE = "chimera_solr_core";


    public static Map getSessionFactories() {
        try {
            if (sessionFactories == null) {
                synchronized (DAOSessionUtil.class) {
                    if (sessionFactories == null) {
                        SolrServer solrServer = DataSource.getSolrServer(SystemUtil.getInstance().getSolrServer());
                        sessionFactories.put(CHIMERA_SOLR_CORE, solrServer);
                    }
                }
            }
        } catch (Exception e) {
            logger.error("DAOSessionUtil:getSessionFactory Error initialize session factory: ", e);
            logger.error("DAOSessionUtil:getSessionFactory Error initialize session factory: " + e.getMessage());
        }
        return sessionFactories;
    }
}