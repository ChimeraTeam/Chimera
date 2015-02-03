import domain.DocumentDomain;
import interfaces.DocumentRepository;
import org.apache.solr.client.solrj.SolrServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.solr.repository.SolrCrudRepository;
import org.springframework.data.solr.repository.support.SimpleSolrRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * Created by gleb on 08.11.2014.
 */
public class ServiceG {

    @Autowired
    private SimpleSolrRepository repository;

    void test() {
        repository.deleteAll();
        DocumentDomain feed = new DocumentDomain();
        feed.setId("new_text_file");
        feed.setFrequencies(new ArrayList<>(Arrays.asList("32.43", "12.4", "435.5")));
        feed.setPhases(new ArrayList<>(Arrays.asList("32.43", "12.4", "435.5")));
        feed.setOscillations(new ArrayList<>(Arrays.asList("32.43", "12.4", "435.5")));
        repository.save(feed);
    }

}
