package t2.reader;

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
    private String[] readers;
    private List<File> files;

    public MultiThreadReader(String input, String output, int threads) {
        this.input = input;
        this.threads = threads;
        this.output = output;
        this.readers = new String[this.threads];
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
        String application = "chimera_run.sh";
        for (String reader : readers) {
            try {
                String[] cmd = new String[]{application, reader};
                Runtime.getRuntime().exec(cmd).waitFor();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        int c = 0;
        List<String> list = new ArrayList<>();
        System.out.println(readers.length);
        while (c != readers.length) {
            File[] files = new File(output).listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.getName().startsWith("done") && !list.contains(file.getName())) {
                        list.add(file.getName());
                        c++;
                    }
                }
            }
        }
        System.out.println("Done");
    }

    private void createThreads() {
        for (int i = 0; i < readers.length; i++) {
            readers[i] = files.get(i) + " " + output;
        }
    }
}
