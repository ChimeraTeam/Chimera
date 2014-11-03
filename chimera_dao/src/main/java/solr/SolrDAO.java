package solr;

import interfaces.ISolrDAO;
import org.apache.log4j.Logger;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrDocument;
import utils.DataSource;

import java.io.IOException;
import java.io.Serializable;
import java.util.List;

/**
 * Created by gleb on 03.11.2014.
 */
public class SolrDAO<T, ID extends Serializable> extends ISolrDAO<T, ID> {

    private static Logger logger = Logger.getLogger(SolrDAO.class.getName());

    @Override
    public UpdateResponse addFeed(T t) {
        logger.debug("SolrDAO:addFeed:in");
        SolrServer solrServer = DataSource.getSolrServer("");
        if (t instanceof SolrDocument) {
            try {
                solrServer.addBean(t);
            } catch (Exception e) {
                logger.error("SolrDAO:addFeed:exception on add feed " + e);
            }
        }
        logger.debug("SolrDAO:addFeed:out");
        return null;
    }

    @Override
    public UpdateResponse deleteFeed(T t) {
        return null;
    }

    @Override
    public UpdateResponse deleteById(ID id) {
        return null;
    }

}
