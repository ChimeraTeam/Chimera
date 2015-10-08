package t1.reader;

import t1.threads.ChimeraReader;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by gleb on 06.10.15.
 */
public class MultiThreadReader {

    private String input;
    private String output;
    private int threads;
    private ChimeraReader[] readers;
    private List<File> files;

    public MultiThreadReader(String input, String output, int threads) {
        this.input = input;
        this.threads = threads;
        this.output = output;
        this.readers = new ChimeraReader[this.threads];
        this.files = new ArrayList<>();
    }

    public void readData() {
        createFiles();
        createThreads();
        execute();
    }

    private void createFiles() {
        File f[] = new File(input).listFiles();
        if (f != null) {
            Collections.addAll(files, f);
        }
    }

    private void execute() {
        for (ChimeraReader reader : readers) {
            new Thread(reader).start();
        }
    }

    private void createThreads() {
        for (int i = 0; i < readers.length; i++) {
            readers[i] = new ChimeraReader(files.get(i), output);
        }
    }
}
