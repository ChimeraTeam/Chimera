package app;

import java.io.*;
import java.util.List;

/**
 * Created by Gleb on 21.06.14.
 */
public class RollUp {
    private List<File> files;

    public RollUp(List<File> files) {
        this.files = files;
    }

    public void rollUp() throws IOException {
        File file = new File("result");
        BufferedOutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file));
        BufferedInputStream inputStream = null;
        for (File file1 : files) {
            byte b[] = new byte[(int) file1.length()];
            inputStream = new BufferedInputStream(new FileInputStream(file1));
            inputStream.read(b);
            outputStream.write(b);
        }
        outputStream.close();
        inputStream.close();
    }
}
