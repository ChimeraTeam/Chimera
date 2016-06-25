package core;

import constants.Compress;

import java.util.regex.Pattern;

import static constants.RegExps.PHASE;
import static java.lang.Math.PI;

/**
 * Created by gleb on 6/25/16.
 */
public class PhaseParser extends GeneralParser {

    public PhaseParser(Compress compress) {
        super(compress);
    }

    @Override
    protected String additional(double min, double max) {
        return "";
    }

    @Override
    protected Pattern createPattern() {
        return Pattern.compile(PHASE.getValue());
    }

    @Override
    protected String getValue(String line) {
        return line.split(" ")[2];
    }

    public String parseValue(String line) {
        double phase = Math.abs(Double.valueOf(line));
        double actual = phase - ((int) (phase / (2 * PI))) * 2 * PI;
        return compressValue(actual);
    }

    private String compressValue(double phase) {
        return String.valueOf((new Double(180 * phase / PI)).intValue());
    }

}
