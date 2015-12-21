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

    public ChimeraFilter(Types type) {
        this.type = type;
    }

    public String process(String input) {
        String out = null;
        if(input.startsWith(";")) return null;
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
        while (matcher.find()) {
            data.append(matcher.group().split(" ")[0]).append(",");
        }
        return data.toString();
    }

    private String phaseProcess(String line) {
        StringBuilder data = new StringBuilder();
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            data.append(matcher.group().split(" ")[2]).append(",");
        }
        return data.toString();
    }
}
