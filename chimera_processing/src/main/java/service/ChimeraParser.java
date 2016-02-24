package service;

import constants.Compress;
import constants.RegExps;
import constants.Types;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by gleb on 08.10.15.
 */
public class ChimeraParser {

    private Types type;
    private Pattern pattern;
    private Compress compress;
    private Double min = 1.0;
    private Double max = -1.0;

    public ChimeraParser(Types type, Compress compress) {
        this.type = type;
        this.compress = compress;
    }

    public String process(String input) {
        if (input.startsWith(";")) return null;
        if (Types.FREQUENCY.equals(type)) pattern = Pattern.compile(RegExps.FREQUENCY.getValue());
        if (Types.PHASE.equals(type)) pattern = Pattern.compile(RegExps.PHASE.getValue());
        return parseValue(input);
    }

    private String parseValue(String input) {
        StringBuilder data = new StringBuilder();
        Matcher matcher = pattern.matcher(input);
        String out;
        int i = 0;
        refresh();
        while (matcher.find()) {
            i++;
            if (Compress.S.equals(compress) && (i % compress.getCompressValue() != 0)) continue;
            String value = matcher.group().split(" ")[type.equals(Types.FREQUENCY) ? 0 : 2];
            if (type.equals(Types.FREQUENCY)) {
                out = parseFrequency(value);
                data.append(out).append(",");
                calculateValues(value);
            } else {
                out = parsePhase(value);
                data.append(out).append(",");
            }
        }
        if (type.equals(Types.FREQUENCY)) {
            data.append(compressFrequency(min)).append(",");
            data.append(compressFrequency(max)).append(",");
        }

        return data.toString();
    }

    private String parseFrequency(String line) {
        Double frequency = Double.valueOf(line);
        return compressFrequency(frequency);
    }

    private String parsePhase(String line) {
        Double phase = Math.abs(Double.valueOf(line));
        Double actual = phase - ((int) (phase / (2 * Math.PI))) * 2 * Math.PI;
        return compressPhase(actual);
    }

    private String compressFrequency(Double frequency) {
        frequency += 1;
        frequency *= 128;
        return String.valueOf(frequency.intValue());
    }

    private String compressPhase(Double phase) {
        return String.valueOf((new Double(180 * phase / Math.PI)).intValue());
    }

    private void calculateValues(Double frequency) {
        if (frequency > max) {
            max = frequency;
        }
        if (frequency < min) {
            min = frequency;
        }
    }

    private void refresh() {
        min = 1.0;
        max = -1.0;
    }
}
