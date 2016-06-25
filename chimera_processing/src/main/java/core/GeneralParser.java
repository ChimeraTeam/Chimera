package core;

import constants.Compress;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by gleb on 6/19/16.
 */
public abstract class GeneralParser {

    private Compress compress;
    private Pattern pattern;

    public GeneralParser(Compress compress) {
        this.compress = compress;
        this.pattern = createPattern();
    }

    public String parse(String line) {
        if (line.startsWith(";")) return null;
        return parseLine(line);
    }

    private String parseLine(String input) {
        StringBuilder data = new StringBuilder();
        Matcher matcher = pattern.matcher(input);
        int i = 0;
        double min = 1.0;
        double max = -1.0;
        while (matcher.find()) {
            if (Compress.S.equals(compress) && (++i % compress.getCompressValue() != 0)) continue;

            String value = getValue(matcher.group());
            data.append(parseValue(value)).append(",");

            max = Math.max(Double.valueOf(value), max);
            min = Math.min(Double.valueOf(value), min);
        }

        data.append(additional(min, max));
        return data.toString();
    }

    protected abstract String additional(double min, double max);

    protected abstract Pattern createPattern();

    protected abstract String getValue(String line);

    protected abstract String parseValue(String value);

}
