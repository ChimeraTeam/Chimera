package constants;

/**
 * Created by gleb on 08.10.15.
 */
public enum Types {

    FREQUENCY("F"),
    PHASE("P");

    private String value;

    Types(String value) {
        this.value = value;
    }

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

    @Override
    public String toString() {
        return "Types{" +
                "value='" + value + '\'' +
                '}';
    }
}
