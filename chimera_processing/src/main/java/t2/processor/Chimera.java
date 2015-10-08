package t2.processor;

import t2.reader.MultiThreadReader;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Created by gleb on 06.10.15.
 */
public class Chimera {

    private static final String WC_SCRIPT = "chimera_wc.sh";
    private static final String SPLIT_SCRIPT = "chimera_split.sh";
    private static final int DEFAULT_THREADS = 16;
    private static final String DEFAULT_OUTPUT = ".";
    private static final String TEMPORARY_OUTPUT = "/tmp/chimera/";
    private static final String CHIMERA_OUTPUT_NAME = ".CHIMERA_";

    private String file;
    private int lines;
    private int threads;
    private String output;
    private boolean isSplited;
    private MultiThreadReader reader;

    public Chimera(String file) {
        this.file = file;
        this.lines = getLines();
        this.threads = DEFAULT_THREADS;
        this.output = DEFAULT_OUTPUT;
        this.isSplited = false;
    }

    public Chimera(String file, Integer threads) {
        this(file);
        this.threads = threads;
    }

    public void split() {
        if (!isSplited) {
            int parts = (int) Math.ceil((double) lines / threads);
            String[] cmd = new String[]{SPLIT_SCRIPT, parts + "", file, TEMPORARY_OUTPUT + CHIMERA_OUTPUT_NAME};
            this.threads = lines / parts;
            try {
                Runtime.getRuntime().exec(cmd).waitFor();
            } catch (Exception e) {
                e.printStackTrace();
            }
            isSplited = true;
        }
    }

    public void read() {
        if (reader == null) reader = new MultiThreadReader(TEMPORARY_OUTPUT, output, threads);
        reader.readData();
    }

    public void process() {
        split();
        read();
    }

    public void setOutput(String dir) {
        this.output = dir;
    }

    private int getLines() {
        String[] cmd = new String[]{WC_SCRIPT, file};
        int lines = 0;
        try {
            Process pr = Runtime.getRuntime().exec(cmd);
            InputStream inputStream = pr.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            lines = Integer.parseInt(reader.readLine());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return lines;
    }

}
