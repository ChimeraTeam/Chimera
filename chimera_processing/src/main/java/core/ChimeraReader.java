package core;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.compress.compressors.xz.XZCompressorInputStream;
import org.springframework.stereotype.Component;

import java.io.*;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.apache.commons.io.IOUtils.closeQuietly;

/**
 * Created by gleb on 08.10.15.
 */
@Component
@Slf4j
public class ChimeraReader {

    private BufferedReader stream;
    private String currentValue;

    public ChimeraReader(String file) {
        try {
            FileInputStream compressed = new FileInputStream(file);
            XZCompressorInputStream xzIn = new XZCompressorInputStream(compressed, true);
            this.stream = new BufferedReader(new InputStreamReader(new BufferedInputStream(xzIn), UTF_8));
        } catch (IOException e) {
            log.error("Error occurred while creating reader ", e);
            closeQuietly(stream);
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
