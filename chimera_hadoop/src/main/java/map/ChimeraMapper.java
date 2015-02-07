package map;

import enums.RegExps;
import enums.Types;
import org.apache.commons.lang.StringUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;
import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by gleb on 06.02.15.
 */
public class ChimeraMapper extends Mapper<LongWritable, Text, Text, Text> {

    private static final String IGNORE_LINES[] = {
            "; Solver config file = solver-config",
            "; Links matrix file = /dev/stdin",
            "; Neurons state file = init_state",
            "; computation successful"
    };

    private Pattern pattern;


    @Override
    protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        Configuration configuration = context.getConfiguration();
        String type = configuration.get("type");
        if (type != null) {
            String line = value.toString();
            if (Arrays.asList(IGNORE_LINES).contains(line)) return;
            String data = "";
            if (Types.FREQUENCY.getValue().equals(type)) {
                pattern = Pattern.compile(RegExps.FREQUENCY.getValue());
                data = frequencyProcess(line);
            }
            if (Types.PHASE.getValue().equals(type)) {
                pattern = Pattern.compile(RegExps.PHASE.getValue());
                data = phaseProcess(line);
            }
            context.write(new Text(line.substring(0, 1)), new Text(data));
        }
    }

    private String frequencyProcess(String line) {
        StringBuilder data = new StringBuilder();
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            data.append(matcher.group());
        }
        return StringUtils.remove(data.toString(), "]");
    }

    private String phaseProcess(String line) {
        StringBuilder data = new StringBuilder();
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            data.append(matcher.group().split(" ")[2]);
        }
        return StringUtils.remove(data.toString(), "[");
    }
}
