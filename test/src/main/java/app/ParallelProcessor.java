package app;

import java.io.*;

/**
 * Created by Gleb on 22.06.14.
 */
public class ParallelProcessor implements Runnable {

    private BufferedInputStream bufferedInputStream;
    private BufferedOutputStream bufferedOutputStream;
    private File fileIn;
    private int id;
    private int nodes;

    public ParallelProcessor(File fileIn, int id, int nodes) throws IOException {
        this.fileIn = fileIn;
        this.nodes = nodes;
        this.id = id;
        bufferedInputStream = new BufferedInputStream(new FileInputStream(fileIn));
        bufferedOutputStream = new BufferedOutputStream(new FileOutputStream("temp" + id));
    }

    @Override
    public void run() {
        int chunk = (int) (fileIn.length() / nodes);
        byte b[] = new byte[(int) fileIn.length() / nodes];
        try {
            if (!(id == 0)) {
                bufferedInputStream.skip(chunk * id);
            }
            bufferedInputStream.read(b);
            bufferedInputStream.close();
            bufferedInputStream = new BufferedInputStream(new FileInputStream(fileIn), 100_000_0);
            bufferedInputStream.skip(fileIn.length() / nodes + (id + 1));
            bufferedOutputStream.write(b);
            bufferedInputStream.close();
            bufferedOutputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
