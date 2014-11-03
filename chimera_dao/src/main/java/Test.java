import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrRequest;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.apache.solr.client.solrj.impl.XMLResponseParser;
import org.apache.solr.client.solrj.request.CollectionAdminRequest;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;

import java.io.IOException;

/**
 * Created by gleb on 02.11.2014.
 */
public class Test {

    private static HttpSolrServer server = new HttpSolrServer("http://localhost:8983/solr");

    public static void main(String[] args) throws Exception {
//        Feed feed = new Feed();
//        feed.setId(2l);
//        feed.setNumber(2l);
//        feed.setFrequency(5.705);
//        feed.setPhase(0.005);
//
//        File file = new File("feed_" + feed.getId() + ".mxl");
//        JAXBContext jaxbContext = JAXBContext.newInstance(Feed.class);
//        Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
//
//        // output pretty printed
//        jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
//
//        jaxbMarshaller.marshal(feed, file);
//        jaxbMarshaller.marshal(feed, System.out);

        delete();
        add();
        showAll();


    }

    private static void add() throws IOException, SolrServerException {
        SolrInputDocument doc = new SolrInputDocument();
        Feed feed = FeedCreator.getFeed();
        if (feed != null) {
            doc.addField("id", feed.getId());
            doc.addField("number", feed.getNumber());
            doc.addField("phase", feed.getPhase());
            doc.addField("frequency", feed.getFrequency());
        }
        UpdateResponse add = server.add(doc);
        server.commit();
    }

    private static void delete() throws IOException, SolrServerException {
        server.deleteByQuery("*:*");
        server.commit();
    }

    private static void showAll() throws SolrServerException {
        SolrQuery query = new SolrQuery();
        query.setQuery(" *:* ");
        query.setFields("id", "number", "frequency", "phase");
        query.setStart(0);
        query.setRows(100);
        QueryResponse response = server.query(query);
        SolrDocumentList results = response.getResults();
        for (Object result : results) {
            System.out.println(result);
        }
    }
}
