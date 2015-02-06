import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;
import java.util.Arrays;

/**
 * Created by gleb on 06.02.15.
 */
public class ChimeraMapper extends Mapper<LongWritable, Text, Text, Text> {

    private static final String IGNORE_LINES[] = {
            "; Solver config file = solver-config",
            "; Links matrix file = /dev/stdin",
            "; Neurons state file = init_state"
    };

    private String type = "f";


    @Override
    protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        String line = value.toString();
        if (Arrays.asList(IGNORE_LINES).contains(line)) return;
        String data = "";
        if (Types.FREQUENCY.getValue().equals(type)) {
            data = frequencyProcess(line);
        }
        if (Types.PHASE.getValue().equals(type)) {
            data = phaseProcess(line);
        }
        context.write(new Text(line.substring(0, 1)), new Text(data));
    }

    private String frequencyProcess(String line) {
        StringBuilder data = new StringBuilder();
        String[] items = line.split(" ");
        for (int i = 5; i < items.length; i += 5) {
            data.append(items[i]);
        }
        return data.toString();
    }

    private String phaseProcess(String line) {
        StringBuilder data = new StringBuilder();
        String[] items = line.split(" ");
        for (int i = 4; i < items.length; i += 5) {
            data.append(items[i]);
        }
        return data.toString();
    }
}
