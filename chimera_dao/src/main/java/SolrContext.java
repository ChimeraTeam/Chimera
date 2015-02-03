import common.ChimeraContext;
import common.SystemUtil;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.solr.core.SolrTemplate;
import org.springframework.data.solr.repository.config.EnableSolrRepositories;
import org.springframework.data.solr.repository.support.SimpleSolrRepository;


/**
 * Created by gleb on 08.11.2014.
 */
@Configuration
@EnableSolrRepositories
@ComponentScan
public class SolrContext {

    @Bean
    public SolrServer solrServer() {
        AnnotationConfigApplicationContext context = ChimeraContext.getAnnotationConfigApplicationContext();
        context.register(SystemUtil.class);
        context.refresh();
        return new HttpSolrServer(context.getBean(SystemUtil.class).getSolrServer());
    }

    @Bean
    public SimpleSolrRepository getDocumentRepository() {
        return new SimpleSolrRepository();
    }

    @Bean
    public SolrTemplate solrTemplate(SolrServer solrServer) {
        return new SolrTemplate(solrServer);
    }

    @Bean
    public ServiceG getServiceG() {
        return new ServiceG();
    }
}
