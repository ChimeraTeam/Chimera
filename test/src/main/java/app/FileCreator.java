package app;

import java.io.*;

/**
 * Created by Gleb on 05.06.14.
 */
public class FileCreator {

    private BufferedWriter bufferedWriter;
    private BufferedReader bufferedReader;
    private int iterator = 2;
    private String type;
    private static final String PHASE = "phase";
    private static final String FREQUENCY = "frequency";
    private InputStream inputStream;
    private String targetDir;


    public FileCreator(int iterator, String type, InputStream inputStream, String targetDir) {
        this.iterator = iterator;
        this.inputStream = inputStream;
        this.type = type;
        this.targetDir = targetDir;
    }

    public FileCreator(String type, InputStream inputStream, String targetDir) {
        this.type = type;
        this.inputStream = inputStream;
        this.targetDir = targetDir;
    }

    public File createFile() throws Exception {
        if (PHASE.equals(type))
            return createPhase();
        if (FREQUENCY.equals(type))
            return createFrequency();
        return null;
    }

    private File createFrequency() throws IOException {
        String dir = targetDir + FREQUENCY;
        File fileOut = new File(dir); // create frequency file
        bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        bufferedWriter = new BufferedWriter(new FileWriter(fileOut));

        String str = null;

        bufferedReader.readLine();  //skip 3 lines
        bufferedReader.readLine();
        bufferedReader.readLine();

        // Solver config file = solver-config
        // ; Links matrix file = /dev/stdin
        // ; Neurons state file = /home/saa/nauka/tst-2d/maistrenko/50x50x50-3d-spher/alpha=1.245-r=15.9/last_step

//        char ch[] = s.toCharArray();
//        for (int i = 0; i < ch.length - 2; i++) {
//            if (ch[i] == '5' & ch[i + 1] == '0' & ch[i + 2] == 'x') {
//                System.out.println("50x50x50");
//                break;
//            }
//        }
        try {
            while ((str = bufferedReader.readLine()) != null) {
                String strings[] = str.split(" ");
                for (int j = 0; j < strings.length; j += 5) {
                    if (strings[j].equals("]") || strings[j].equals("[")
                            || strings[j].charAt(0) != '-') {
                        continue;
                    }
                    bufferedWriter.write(strings[j]);
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            bufferedReader.close();
            bufferedWriter.close();
        }

        return fileOut;
    }


    private File createPhase() throws IOException {
        String dir = targetDir + PHASE;
        File fileOut = new File(dir);
        bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String str = null;
        bufferedWriter = new BufferedWriter(new FileWriter(fileOut));
        bufferedReader.readLine();
        bufferedReader.readLine();
        bufferedReader.readLine();

        try {
            while ((str = bufferedReader.readLine()) != null) {
                String strings[] = str.split(" ");
                for (int j = 4; j < strings.length; j += 5) {
                    if (strings[j].equals("]") || strings[j].equals("[")
                            || strings[j].charAt(0) == '-') {
                        continue;
                    }
                    if (check(strings[j])) {
                        createChar(strings[j]);
                    }
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            bufferedReader.close();
            bufferedWriter.close();

        }

        return fileOut;
    }

    private void createChar(String str) throws IOException {

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
                res.append(str.substring(i + 1, i + iterator));
                d = Double.parseDouble(res.toString());
                value = (int) ((3 * d) / Math.PI);
                bufferedWriter.write((char) (value));
                res.setLength(0);
            }
        }

    }

    private boolean check(String str) {
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) == '.')
                return true;
        }
        return false;
    }

}
