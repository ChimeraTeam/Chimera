package service;

import org.tukaani.xz.*;

import java.io.*;
import java.util.Iterator;

/**
 * Created by gleb on 08.10.15.
 */
public class ChimeraReader implements Iterator<String> {

    private BufferedReader stream;
    private String file;
    private String data;

    public ChimeraReader(String file) {
        this.file = file;
        initStream();
    }

    private void initStream() {
        try {
            FileInputStream compressed = new FileInputStream(file);
            XZInputStream xzInputStream = new XZInputStream(compressed);
            this.stream = new BufferedReader(new InputStreamReader(new BufferedInputStream(xzInputStream)));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public boolean hasNext() {
        try {
            data = stream.readLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data != null;
    }

    @Override
    public String next() {
        return data;
    }
}
