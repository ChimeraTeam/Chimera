package service;

import constants.RegExps;
import constants.Types;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by gleb on 08.10.15.
 */
public class ChimeraFilter {

    private Types type;
    private Pattern pattern;
    private Double min = 1;
    private Double max = -1;

    public ChimeraFilter(Types type) {
        this.type = type;
    }

    public String process(String input) {
        String out = null;
        if (input.startsWith(";")) return null;
        if (Types.FREQUENCY.equals(type)) {
            pattern = Pattern.compile(RegExps.FREQUENCY.getValue());
            out = frequencyProcess(input);
        }
        if (Types.PHASE.equals(type)) {
            pattern = Pattern.compile(RegExps.PHASE.getValue());
            out = phaseProcess(input);
        }
        return out;
    }

    private String frequencyProcess(String line) {
        StringBuilder data = new StringBuilder();
        Matcher matcher = pattern.matcher(line);
        refresh();
        while (matcher.find()) {
            String value = matcher.group().split(" ")[0];
            Double frequency = Double.valueOf(value);
            frequencyCalculations(frequency);
            data.append(frequencyCompress(frequency)).append(",");
        }
        data.append(min.toString()).append(",");
        data.append(max.toString()).append(",");
        return data.toString();
    }

    private String phaseProcess(String line) {
        StringBuilder data = new StringBuilder();
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            String value = matcher.group().split(" ")[2];
            Double phase = Math.abs(Double.valueOf(value));
            Double newPhase = phase - ((int) (phase / (2 * Math.PI))) * 2 * Math.PI;
            data.append(phaseCompress(newPhase)).append(",");
        }
        return data.toString();
    }

    private String frequencyCompress(Double frequency) {
        frequency += 1;
        frequency *= 128;
        return String.valueOf(frequency.intValue());
    }

    private String phaseCompress(Double phase) {
        return String.valueOf((new Double(180 * phase / Math.PI)).intValue());
    }

    private void refresh() {
        min = 1;
        max = -1;
    }

    private void frequencyCalculations(Double frequency) {
        if (frequency > max) {
            max = frequency;
        }

        if (frequency < min) {
            min = frequency;
        }
    }
}
