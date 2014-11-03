package utils;

import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.impl.HttpSolrServer;

/**
 * Created by gleb on 03.11.2014.
 */
public class DataSource {

    private static SolrServer solrServer = null;

    public static synchronized SolrServer getSolrServer(String url) {
        if (solrServer == null) {
            solrServer = new HttpSolrServer(url);
        }
        return solrServer;
    }
}
