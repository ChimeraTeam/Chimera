package interfaces;

import common.SystemUtil;
import org.apache.log4j.Logger;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.params.DefaultSolrParams;
import utils.DataSource;

import java.io.Serializable;
import java.util.List;

/**
 * Created by gleb on 03.11.2014.
 */
public abstract class DefaultSolrDAO<T, ID extends Serializable> implements ISolorGenericDAO {

    private static Logger logger = Logger.getLogger(DefaultSolrDAO.class.getName());
    protected SolrServer solrServer = DataSource.getSolrServer(SystemUtil.getInstance().getSolrServer());

    public abstract UpdateResponse addFeed(T t);

    public abstract UpdateResponse deleteFeed(T t);

    public abstract UpdateResponse deleteById(ID id);

    @Override
    public Object getByID(Serializable serializable) {
        return null;
    }

    @Override
    public List getListAll() {
        return null;
    }

    @Override
    public UpdateResponse save(Object entity) {
        UpdateResponse updateResponse = null;
        try {
            updateResponse = solrServer.addBean(entity);
        } catch (Exception e) {
            logger.error("DefaultSolrDAO:save:exception save entity " + e);
        }
        return updateResponse;
    }

    @Override
    public boolean delete(Object entity) {
        return false;
    }

    @Override
    public boolean delete(Serializable entityId) {
        return false;
    }

    @Override
    public boolean rollback() {
        boolean success;
        try {
            UpdateResponse response = solrServer.rollback();
            success = response.getStatus() == 0;
        } catch (Exception ex) {
            logger.error("Could not rollback from solr index", ex);
            success = Boolean.FALSE;
        }
        return success;
    }

    @Override
    public boolean commit() {
        boolean success;
        try {
            UpdateResponse response = solrServer.commit();
            success = response.getStatus() == 0;
        } catch (Exception ex) {
            logger.error("Could not commit to solr index", ex);
            success = Boolean.FALSE;
        }
        return success;
    }
}
