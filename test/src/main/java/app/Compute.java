package app;

import org.gridgain.grid.lang.GridClosure;

import java.io.*;

/**
 * Created by Gleb on 21.06.14.
 */
public class Compute implements GridClosure<File, File> {


    @Override
    public File apply(File file) {

        File fileOut = new File(file.getName() + "Out");
        String str = null;
        try {
            BufferedReader bufferedReader = new BufferedReader(new FileReader(file));
            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(fileOut));
            while ((str = bufferedReader.readLine()) != null) {
                String strings[] = str.split(" ");
                for (int j = 3; j < strings.length; j += 5) {
                    if (strings[j].equals("]") || strings[j].equals("[")) {
                        continue;
                    }
                    bufferedWriter.write(strings[j]);
                }
            }
            bufferedReader.close();
            bufferedWriter.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return fileOut;
    }
}
