package interfaces;

import org.springframework.data.solr.repository.SolrCrudRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

/**
 * Created by gleb on 03.11.2014.
 */
@Repository
public interface DocumentRepository<T, ID extends Serializable> extends SolrCrudRepository<T, ID> {

}
