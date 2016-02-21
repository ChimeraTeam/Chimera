package constants;

/**
 * Created by gleb on 2/20/16.
 */
public enum Compress {

    S("s"),
    N("n"),
    M("m");

    private String value;
    private int compressValue;

    public String getValue() {
        return value;
    }

    public int getCompressValue() {
        return compressValue;
    }

    public void setCompressValue(int compressValue) {
        this.compressValue = compressValue;
    }

    Compress(String value) {
        this.value = value;
    }

    public static Compress getEnum(String value) {
        for (Compress v : values()) {
            if (v.getValue().equals(value)) {
                return v;
            }
        }
        return null;
    }

    @Override
    public String toString() {
        return "Compress{" +
                "value='" + value + '\'' +
                '}';
    }

}
