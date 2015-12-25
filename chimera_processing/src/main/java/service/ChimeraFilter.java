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
        if(input.startsWith(";")) return null;
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
			String value = matcher.group().split(" ")[0];
            Double frequency = Double.valueOf(value);
            data.append(frequencyCompress(frequency)).append(",");
        }
        return data.toString();
    }

    private String phaseProcess(String line) {
        StringBuilder data = new StringBuilder();
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            String value = matcher.group().split(" ")[2];
            Double phase = Math.abs(Double.valueOf(value));
			Double newPhase = phase - ((int)(phase / (2 * Math.PI))) * 2 * Math.PI;
            data.append(phaseCompress(newPhase)).append(",");
        }
        return data.toString();
    }
	
	private String frequencyCompress(Double frequency) {
		frequency += 1;
		frequency *= 8.5;
		
		return String.valueOf(frequency.intValue());
	}

	private String phaseCompress(Double phase) {
		return String.valueOf((new Double(180 * phase / Math.PI)).intValue());
	}
}
