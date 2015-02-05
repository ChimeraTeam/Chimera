package impl;

import domain.ChimeraDomain;
import interfaces.ISolrRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.solr.repository.support.SimpleSolrRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by gleb on 03.02.2015.
 */
@Repository
public class SorRepository extends SimpleSolrRepository implements ISolrRepository {

    public ChimeraDomain addFeed(ChimeraDomain document) {
        Object save = save(document);
        return (ChimeraDomain) save;
    }

    public Iterable addFeeds(Iterable iterable) {
        Iterable save = save(iterable);
        return save;
    }

    public void deleteFeed(ChimeraDomain document) {
        delete(document);
    }

    public void deleteFeed(String id) {
        delete(id);
    }

    public void deleteAllFeeds() {
        deleteAll();
    }

    public ChimeraDomain getFeed(String id) {
        return (ChimeraDomain) findOne(id);
    }

    public Iterable getAll() {
        return findAll();
    }

    public Long totalCount() {
        return count();
    }
}
