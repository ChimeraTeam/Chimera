package app;

import org.apache.commons.lang.math.NumberUtils;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;

/**
 * Created by Gleb on 22.06.14.
 */
public class ApplicationWriterPreProcessor {

    private static BufferedReader bufferedReader;
    private static BufferedWriter bufferedWriter;


    private static boolean check(String str) {
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) == '.')
                return true;
        }
        return false;
    }

    private static void phase() throws Exception {

        int skip = 15;   // frequency skip = 16, lastIndex = 9, n = 24
        int n = 15;      //phase skip = 15, lastIndex = 8, n=15
        int lastIndex = 8;
        char ch[] = new char[lastIndex];

        bufferedReader.read(ch, 0, lastIndex);
        for (int i = 0; i < 3; i++) {
            bufferedReader.readLine();
        }
        bufferedReader.skip(n);
        bufferedWriter.write(new String(ch));

        bufferedReader.skip(skip);
        while ((bufferedReader.read()) != -1) {
            while ((bufferedReader.read()) != 32) {
            }
            bufferedReader.read(ch, 0, lastIndex);
            bufferedReader.skip(skip);
            if (!NumberUtils.isNumber(new String(ch))) {
                continue;
            }
            if (check(new String(ch))) {
                createChar(new String(ch));
            }
            //    bufferedWriter.write(new String(ch));
        }
        bufferedReader.close();
        bufferedWriter.close();
    }

    private static void createChar(String str) throws IOException {

        StringBuilder res = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) == '.') {
                res.append(str.substring(0, i));
                double d = Double.parseDouble(res.toString());
                int value = (int) ((3 * d) / Math.PI);
                bufferedWriter.write((char) (value));
                d = 0;
                value = 0;
                res.setLength(0);
                res.append(str.substring(i + 1, i + 2));
                d = Double.parseDouble(res.toString());
                value = (int) ((3 * d) / Math.PI);
                bufferedWriter.write((char) (value));
                res.setLength(0);
            }
        }

    }
}
