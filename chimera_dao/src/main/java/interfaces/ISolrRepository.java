package interfaces;

import domain.ChimeraDomain;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

/**
 * Created by gleb on 05.02.15.
 */
@Repository
public interface ISolrRepository {

    public ChimeraDomain addFeed(ChimeraDomain document);

    public Iterable addFeeds(Iterable iterable);

    public void deleteFeed(ChimeraDomain document);

    public void deleteFeed(String id);

    public void deleteAllFeeds();

    public ChimeraDomain getFeed(String id);

    public Iterable getAll();

    public Long totalCount();
}
