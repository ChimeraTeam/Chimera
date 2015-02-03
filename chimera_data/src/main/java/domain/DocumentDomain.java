package domain;

import org.apache.solr.client.solrj.beans.Field;

import java.util.List;

/**
 * Created by gleb on 08.11.2014.
 */
public class DocumentDomain {

    @Field
    private String id;
    @Field
    private List<String> oscillations;
    @Field
    private List<String> phases;
    @Field
    private List<String> frequencies;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getOscillations() {
        return oscillations;
    }

    public void setOscillations(List<String> oscillations) {
        this.oscillations = oscillations;
    }

    public List<String> getPhases() {
        return phases;
    }

    public void setPhases(List<String> phases) {
        this.phases = phases;
    }

    public List<String> getFrequencies() {
        return frequencies;
    }

    public void setFrequencies(List<String> frequencies) {
        this.frequencies = frequencies;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DocumentDomain that = (DocumentDomain) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "FeedDomain{" +
                "id='" + id + '\'' +
                ", oscillations=" + oscillations +
                ", phases=" + phases +
                ", frequencies=" + frequencies +
                '}';
    }
}