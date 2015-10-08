import common.ChimeraContext;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.solr.core.SolrTemplate;

/**
 * Created by gleb on 03.02.2015.
 */
@Deprecated
@Configuration
public class SolrContext extends ChimeraContext {

    @Bean
    public SolrServer solrServer() {
        return new HttpSolrServer(systemUtil().getSolr());
    }

    @Bean
    public SolrTemplate solrTemplate() {
        return new SolrTemplate(solrServer());
    }

}
