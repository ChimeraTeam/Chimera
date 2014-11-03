package app;

import java.io.*;

/**
 * Created by Gleb on 22.06.14.
 */
public class Printer {

    public static void printPhase() throws IOException {

        BufferedReader bufferedReader = new BufferedReader(new FileReader("trajectory"), 100_000_000);
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter("phase"), 100_000_000);
        int skip = 15;   // frequency skip = 16, lastIndex = 9, n = 24
        int n = 15;      //phase skip = 15, lastIndex = 8, n=15
        int lastIndex = 8;
        char ch[] = new char[lastIndex];

        for (int i = 0; i < 3; i++) {
            bufferedReader.readLine();
        }

        bufferedReader.skip(n);
        bufferedReader.read(ch, 0, lastIndex);
        bufferedWriter.write(new String(ch));

        bufferedReader.skip(skip);

        while ((bufferedReader.read()) != -1) {
            while ((bufferedReader.read()) != 32) {
            }
            bufferedReader.read(ch, 0, lastIndex);
            bufferedReader.skip(skip);
            bufferedWriter.write(new String(ch));
        }
        bufferedReader.close();
    }

    public static void printFrequency() throws IOException {
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter("frequency"), 100_000_000);
        BufferedReader bufferedReader = new BufferedReader(new FileReader("trajectory"), 100_000_000);
        int skip = 4;   // frequency skip = 16, lastIndex = 9, n = 24
        int n = 24;      //phase skip = 15, lastIndex = 8, n=15
        int lastIndex = 9;
        int skip2 = 9;
        char ch[] = new char[lastIndex];

        for (int i = 0; i < 3; i++) {
            bufferedReader.readLine();
        }

        bufferedReader.skip(n);
        bufferedReader.read(ch, 0, lastIndex);
        bufferedWriter.write(new String(ch));

        bufferedReader.skip(skip);

        while ((bufferedReader.read()) != -1) {
            while ((bufferedReader.read()) != 32) {
            }
            bufferedReader.skip(skip2);
            bufferedReader.read(ch, 0, lastIndex);
            bufferedWriter.write(new String(ch));
            bufferedReader.skip(skip);
        }
        bufferedReader.close();
    }
}
