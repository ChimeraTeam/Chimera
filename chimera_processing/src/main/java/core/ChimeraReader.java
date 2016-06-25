package core;

import org.apache.commons.compress.compressors.xz.XZCompressorInputStream;
import org.springframework.stereotype.Component;

import java.io.*;

import static org.apache.commons.io.IOUtils.closeQuietly;

/**
 * Created by gleb on 08.10.15.
 */
@Component
public class ChimeraReader {

    private BufferedReader stream;
    private String currentValue;

    public ChimeraReader(String file) {
        try {
            FileInputStream compressed = new FileInputStream(file);
            XZCompressorInputStream xzIn = new XZCompressorInputStream(compressed, true);
            this.stream = new BufferedReader(new InputStreamReader(new BufferedInputStream(xzIn)));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean hasData() throws IOException {
        currentValue = stream.readLine();
        return currentValue != null;
    }

    public String readLine() {
        return currentValue;
    }

    public void close() {
        closeQuietly(stream);
    }
}
