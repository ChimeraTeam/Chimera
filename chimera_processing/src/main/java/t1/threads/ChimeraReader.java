package t1.threads;

import java.io.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by gleb on 06.10.15.
 */
public class ChimeraReader implements Runnable {

    private File file;
    private String output;
    private String regexp = "-*(?:\\d*\\.)?\\d+ ]";

    public ChimeraReader(File file, String output) {
        this.file = file;
        this.output = output;
    }

    @Override
    public void run() {
        BufferedReader bufferedReader = null;
        BufferedWriter bufferedWriter = null;
        try {
            bufferedReader = new BufferedReader(new FileReader(file));
            bufferedWriter = new BufferedWriter(new FileWriter(output + "/job" + Thread.currentThread().getId()));
            String line;
            StringBuffer data = new StringBuffer();
            Pattern pattern = Pattern.compile(regexp);
            while ((line = bufferedReader.readLine()) != null) {
                Matcher matcher = pattern.matcher(line);
                while (matcher.find()) {
                    data.append(matcher.group().split(" ")[0]).append(",");
                }
                bufferedWriter.write(data.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (bufferedWriter != null) {
                try {
                    bufferedWriter.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            file.deleteOnExit();
        }
    }
}
