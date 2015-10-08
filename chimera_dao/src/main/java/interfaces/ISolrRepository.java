package interfaces;

import domain.ChimeraDomain;
import org.springframework.stereotype.Repository;

/**
 * Created by gleb on 05.02.15.
 */
@Deprecated
@Repository
public interface ISolrRepository {

    ChimeraDomain addFeed(ChimeraDomain document);

    Iterable addFeeds(Iterable iterable);

    void deleteFeed(ChimeraDomain document);

    void deleteFeed(String id);

    void deleteAllFeeds();

    ChimeraDomain getFeed(String id);

    Iterable getAll();

    Long totalCount();
}
