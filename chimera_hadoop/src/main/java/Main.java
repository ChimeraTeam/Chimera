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
        Job job = Job.getInstance(configuration, "Chimera job");
        job.setJarByClass(Main.class);

        configuration.set("fs.hdfs.impl", org.apache.hadoop.hdfs.DistributedFileSystem.class.getName());
        configuration.set("fs.file.impl", org.apache.hadoop.fs.LocalFileSystem.class.getName());

        Runtime.getRuntime().exec("/home/gleb/scripts/clearOut.sh");
        FileInputFormat.addInputPath(job, new Path("hdfs://localhost:1111/in/trajectory"));
        FileOutputFormat.setOutputPath(job, new Path("/home/gleb/out"));

        job.setMapperClass(ChimeraMapper.class);
        job.setReducerClass(ChimeraReducer.class);

        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);

        job.submit();
    }
}
