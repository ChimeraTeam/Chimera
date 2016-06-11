package chimera;


import constants.Types;
import map.ChimeraMapper;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mrunit.mapreduce.MapDriver;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

/**
 * Created by gleb on 05.10.15.
 */
public class ChimeraTest {

    private static Text data;
    private static Configuration configuration;

    @BeforeClass
    public static void init() {
        configuration = new Configuration();
        data = new Text("0 0.000000 [ 1 0.500474 -0.034468 ] " +
                "[ 2 0.466176 -0.004997 ] [ 3 0.430653 0.016493 ] " +
                "[ 4 0.393931 0.029963 ] [ 5 0.356054 0.036283 ] " +
                "[ 6 0.317079 0.036974 ] [ 7 0.277082 0.033751 ] " +
                "[ 8 0.236154 0.027904 ] [ 9 0.194404 0.021621 ]" +
                " [ 10 0.151957 0.014998 ] [ 11 0.108950 0.008099 ]" +
                " [ 12 0.065536 0.000992 ] [ 13 0.021873 -0.006241 ]");
    }

    @Test
    @Ignore
    public void frequencyTest() throws Exception {
        configuration.set("type", Types.FREQUENCY.getValue());
        new MapDriver<LongWritable, Text, Text, Text>()
                .withConfiguration(configuration)
                .withMapper(new ChimeraMapper())
                .withInput(new LongWritable(), data)
                .withOutput(new Text("0"), new Text("-0.034468,-0.004997," +
                        "0.016493,0.029963,0.036283,0.036974,0.033751," +
                        "0.027904,0.021621,0.014998,0.008099,0.000992,-0.006241,"))
                .runTest();
    }

    @Test
    @Ignore
    public void phaseTest() throws Exception {
        configuration.set("type", Types.PHASE.getValue());
        new MapDriver<LongWritable, Text, Text, Text>()
                .withConfiguration(configuration)
                .withMapper(new ChimeraMapper())
                .withInput(new LongWritable(), data)
                .withOutput(new Text("0"), new Text("0.500474,0.466176," +
                        "0.430653,0.393931,0.356054,0.317079,0.277082," +
                        "0.236154,0.194404,0.151957,0.108950,0.065536,0.021873,"))
                .runTest();
    }
}
