import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

/**
 * Created by gleb on 06.02.15.
 */
public class Main {
    public static void main(String[] args) throws Exception {
        Job job = new Job();
        job.setJarByClass(Main.class);
        job.setJobName("Chimera job");

        FileInputFormat.addInputPath(job, new Path("chimera_hadoop/src/main/resources/trajectory"));
        FileOutputFormat.setOutputPath(job, new Path("chimera_hadoop/src/main/resources/out"));

        job.setMapperClass(ChimeraMapper.class);
        job.setReducerClass(ChimeraReducer.class);

        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);

        System.exit(job.waitForCompletion(true) ? 0 : 1);

    }
}
