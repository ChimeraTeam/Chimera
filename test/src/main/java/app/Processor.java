package app;

import java.io.*;

/**
 * Created by Gleb on 22.06.14.
 */
public class Processor {
    private int nodes;
    private BufferedReader bufferedReader;
    private BufferedWriter bufferedWriter;
    private File fileIn;

    public Processor(File fileIn, int nodes) throws IOException {
        this.fileIn = fileIn;
        this.nodes = nodes;
        bufferedReader = new BufferedReader(new FileReader(fileIn));
        bufferedWriter = new BufferedWriter(new FileWriter("temp"));
    }


    public void exec() throws IOException {
        int chunk = (int) (fileIn.length() / nodes);
        char ch[] = new char[chunk];

        for (int i = 0; i < nodes; i++) {
            bufferedReader.read(ch, 0, chunk);
            bufferedWriter.write(new String(ch));
            bufferedWriter.close();
            bufferedReader = new BufferedReader(new FileReader(fileIn), 100_000_0);
            bufferedWriter = new BufferedWriter(new FileWriter("temp" + i), 100_000_0);
            bufferedReader.skip(chunk * (i + 1));
        }

        bufferedWriter.close();
        bufferedReader.close();
    }
}
