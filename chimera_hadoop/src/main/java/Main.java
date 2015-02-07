import enums.Types;
import map.ChimeraMapper;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import reduce.ChimeraReducer;

/**
 * Created by gleb on 06.02.15.
 */
public class Main {
    public static void main(String[] args) throws Exception {
        Configuration configuration = new Configuration();
        configuration.set("type", Types.PHASE.getValue());
        Job job = new Job(configuration);
        job.setJarByClass(Main.class);
        job.setJobName("Chimera job");

        Runtime.getRuntime().exec("/home/gleb/scripts/clearOut.sh");
        FileInputFormat.addInputPath(job, new Path("/home/gleb/trajectory"));
        FileOutputFormat.setOutputPath(job, new Path("/home/gleb/out"));

        job.setMapperClass(ChimeraMapper.class);
        job.setReducerClass(ChimeraReducer.class);

        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);

        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
