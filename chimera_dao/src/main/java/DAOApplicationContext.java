import impl.SorRepository;
import interfaces.ISolrRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import services.SolrService;

/**
 * Created by gleb on 05.02.15.
 */
@Configuration
public class DAOApplicationContext extends SolrContext {

    @Bean
    public ISolrRepository sorRepository() {
        SorRepository repository = new SorRepository();
        repository.setSolrOperations(solrTemplate());
        return repository;
    }

    @Bean
    public SolrService solrService() {
        return new SolrService();
    }
}
