package enums;

/**
 * Created by gleb on 07.02.15.
 */
public enum RegExps {

    FREQUENCY("-*(?:\\d*\\.)?\\d+ ]"),
    PHASE("\\[ \\d+ -*(?:\\d*\\.)?\\d+");

    private String value;

    public String getValue(){
        return value;
    }

    RegExps(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "enums.RegExps{" +
                "value='" + value + '\'' +
                '}';
    }

}
