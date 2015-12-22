package service;

import constants.RegExps;
import constants.Types;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by gleb on 08.10.15.
 */
public class ChimeraFilter {

    private static final String IGNORE_LINES[] = {
            "; Solver config file = solver-config",
            "; Links matrix file = /dev/stdin",
            "; Neurons state file = init_state",
            "; computation successful"
    };

    private Types type;
    private Pattern pattern;

    public ChimeraFilter(Types type) {
        this.type = type;
    }

    public String process(String input) {
        String out = null;
        if (input.startsWith(";")) return null;
//        if (Arrays.asList(IGNORE_LINES).contains(input)) return null;
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
            data.append(frequencyCompress(Double.valueOf(matcher.group().split(" ")[0]))).append(",");
        }
        return data.toString();
    }

    private String phaseProcess(String line) {
        StringBuilder data = new StringBuilder();
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            data.append(phaseCompress(Double.valueOf(matcher.group().split(" ")[2]))).append(",");
        }
        return data.toString();
    }

    private String frequencyCompress(Double frequency) {
        frequency += 1;
        frequency *= 127.5;
        return ((char) (frequency.intValue())) + "";
    }

    private String phaseCompress(Double phase) {
        int displacement = 110;
        double degree = 180 * phase / Math.PI;
        int newPhase = ((int) degree) - displacement;
        if (newPhase >= 0) {
            return ((char) newPhase) + "";
        }
        return "-" + ((char) Math.abs(newPhase));
    }
}
