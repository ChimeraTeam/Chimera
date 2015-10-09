package constants;

/**
 * Created by gleb on 08.10.15.
 */
public enum Types {

    FREQUENCY("F"),
    PHASE("P");

    private String value;

    public String getValue() {
        return value;
    }

    public static Types getEnum(String value) {
        for (Types v : values()) {
            if (v.getValue().equals(value)) {
                return v;
            }
        }
        return null;
    }

    Types(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "enums.Types{" +
                "value='" + value + '\'' +
                '}';
    }
}
