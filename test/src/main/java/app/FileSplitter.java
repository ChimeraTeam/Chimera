package app;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

/**
 * Created by Gleb on 16.06.14.
 */
public class FileSplitter {

    private File file;
    private int nodes;
    private BufferedReader reader;
    private BufferedWriter writer;

    public FileSplitter(File file, int nodes) throws Exception {
        this.file = file;
        this.nodes = nodes;
        this.reader = new BufferedReader(new FileReader(file));
    }

    public File[] split() throws IOException {

        for (int i = 0; i < 3; i++) {
            reader.readLine();
        }

        int c;
        int t = 0;

        while (t != 2) {
            c = reader.read();
            if (c == 32) {
                t++;
            }
        }

        Stream<String> lines = Files.lines(Paths.get(file.toURI()));
        long count = lines.count() - 3;
        long chunk = count / nodes;
        String str = null;
        File[] fls = new File[nodes];
        for (int i = 0; i < nodes; i++) {
            File file1 = new File("tmp" + i);
            writer = new BufferedWriter(new FileWriter(file1));
            for (int j = 0; j < chunk; j++) {
                str = reader.readLine();
                if (str == null) break;
                writer.write(str.trim());
                writer.newLine();
            }
            fls[i] = file1;
            writer.close();
        }
        writer.close();
        reader.close();
        String dir = System.getProperty("user.dir");
        File files[] = new File(dir).listFiles();
        for (File file1 : files) {
            if (file1.length() == 0) {
                file1.deleteOnExit();
            }
        }

        return fls;
    }
}
