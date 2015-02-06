import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

import java.io.IOException;

/**
 * Created by gleb on 06.02.15.
 */
public class ChimeraReducer extends Reducer<Text, Text, Text, Text> {

    @Override
    protected void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
        StringBuilder builder = new StringBuilder();
        for (Text value : values) {
            builder.append(value);
        }
        context.write(key, new Text(builder.toString()));
    }
}
