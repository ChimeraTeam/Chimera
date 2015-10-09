package model;

/**
 * Created by gleb on 07.10.15.
 */
public class ChimeraFile {

    private String name;
    private String absoluteName;
    private String lastUpdate;
    private Long size;


    public String getAbsoluteName() {
        return absoluteName;
    }

    public void setAbsoluteName(String absoluteName) {
        this.absoluteName = absoluteName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(String lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }
}
