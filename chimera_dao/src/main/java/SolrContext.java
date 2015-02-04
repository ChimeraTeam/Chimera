import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.data.solr.repository.config.EnableSolrRepositories;
import org.springframework.stereotype.Component;

/**
 * Created by gleb on 03.02.2015.
 */
@Configuration
public class SolrContext {

    @Bean
    public SolrServer solrServer() {
        return new HttpSolrServer("http://localhost:8983/solr");
    }

    @Bean
    public SolrTemplate solrTemplate() {
        return new SolrTemplate(solrServer());
    }

    @Bean
    public ProductService productService() {
        ProductService productService = new ProductService();
        productService.setRepository(sorRepo());
        return productService;
    }

    @Bean
    public SorRepo sorRepo() {
        SorRepo sorRepo = new SorRepo();
        sorRepo.setSolrOperations(solrTemplate());
        return sorRepo;
    }
}
