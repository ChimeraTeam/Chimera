package app;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

/**
 * Created by Gleb on 22.06.14.
 */
public class Worker implements Runnable {
    private int n;
    private BufferedReader bufferedReader;
    private int id;
    private boolean flag = true;

    public int getId() {
        return id;
    }

    public Worker(int n, int id, File file) throws IOException {
        this.n = n;
        bufferedReader = new BufferedReader(new FileReader(file));
        this.id = id;
    }

    @Override
    public void run() {
        try {
            long size = 0;
            bufferedReader.skip(n * id);
            String str = null;
            while ((str = bufferedReader.readLine()) != null) {
                size += str.length();
                if (size >= n * id) {
                    break;
                }
                String strings[] = str.split(" ");
                for (int j = 0; j < strings.length; j += 5) {
                    if (strings[j].equals("]") || strings[j].equals("[")
                            || strings[j].charAt(0) != '-') {
                        continue;
                    }
                    setStr(strings[j]);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    String str;

    public void setStr(String str) {
        this.str = str;
    }

    public String getString() {
        return str;
    }
}
