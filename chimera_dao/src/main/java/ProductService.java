import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.solr.repository.SolrCrudRepository;
import org.springframework.data.solr.repository.SolrRepository;
import org.springframework.data.solr.repository.support.SimpleSolrRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

/**
 * Created by gleb on 03.02.2015.
 */

public class ProductService {

    private SorRepo repository;

    public ProductService(){
    }

    public void doSomething() {
        repository.deleteAll();
    }

    public SorRepo getRepository() {
        return repository;
    }

    public void setRepository(SorRepo repository) {
        this.repository = repository;
    }
}
