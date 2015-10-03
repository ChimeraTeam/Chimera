package enums;

/**
 * Created by gleb on 06.02.15.
 */
public enum Types {

    FREQUENCY("frequency"),
    PHASE("phase");

    private String value;

    public String getValue(){
        return value;
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
