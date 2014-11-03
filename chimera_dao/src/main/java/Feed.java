/**
 * Created by gleb on 02.11.2014.
 */

import org.apache.solr.client.solrj.beans.Field;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Feed {

    @Field
    private Long id;
    @Field
    private String number;
    @Field
    private String phase;
    @Field
    private String frequency;


    public Long getId() {
        return id;
    }

    @XmlAttribute
    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getPhase() {
        return phase;
    }

    public void setPhase(String phase) {
        this.phase = phase;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    @Override
    public String toString() {
        return "Feed{" +
                "id=" + id +
                ", number=" + number +
                ", phase=" + phase +
                ", frequency=" + frequency +
                '}';
    }
}
