package core;


import constants.Compress;

import java.util.regex.Pattern;

import static constants.RegExps.FREQUENCY;

/**
 * Created by gleb on 6/25/16.
 */
public class FrequencyParser extends GeneralParser {

    public FrequencyParser(Compress compress) {
        super(compress);
    }

    @Override
    protected String additional(double min, double max) {
        return compressValue(min) + "," + compressValue(max) + ",";
    }

    @Override
    protected Pattern createPattern() {
        return Pattern.compile(FREQUENCY.getValue());
    }

    @Override
    protected String getValue(String line) {
        return line.split(" ")[0];
    }

    @Override
    public String parseValue(String line) {
        double frequency = Double.parseDouble(line);
        return compressValue(frequency);
    }

    private String compressValue(double frequency) {
        return String.valueOf((int) ((++frequency) * 128));
    }

}
