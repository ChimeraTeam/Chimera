package interfaces;

import org.apache.solr.client.solrj.response.UpdateResponse;

import java.io.Serializable;
import java.util.List;

/**
 * Created by gleb on 03.11.2014.
 */
public abstract class ISolrDAO<T, ID extends Serializable> implements ISolorGenericDAO {

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
    public Serializable save(Object entity) {
        return null;
    }

    @Override
    public boolean delete(Object entity) {
        return false;
    }

    @Override
    public boolean delete(Serializable entityId) {
        return false;
    }
}
