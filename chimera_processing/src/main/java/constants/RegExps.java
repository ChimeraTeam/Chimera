package constants;

/**
 * Created by gleb on 08.10.15.
 */
public enum RegExps {

    FREQUENCY("-*(?:\\d*\\.)?\\d+ ]"),
    PHASE("\\[ \\d+ -*(?:\\d*\\.)?\\d+");

    private String value;

    public String getValue() {
        return value;
    }

    RegExps(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "RegExps{" +
                "value='" + value + '\'' +
                '}';
    }

}
