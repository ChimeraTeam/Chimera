package app;

import org.gridgain.grid.lang.GridReducer;
import org.jetbrains.annotations.Nullable;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Gleb on 21.06.14.
 */
public class Reduce implements GridReducer<File, List<File>> {

    private List<File> files = new ArrayList<>();
    private File fileResult = new File("result");

    @Override
    public boolean collect(@Nullable File file) {
        files.add(file);
        return true;
    }

    @Override
    public List<File> reduce() {
        try {
            BufferedOutputStream outputStream = new BufferedOutputStream(new FileOutputStream(fileResult));
            BufferedInputStream inputStream = null;
            for (File file1 : files) {
                byte b[] = new byte[(int) file1.length()];
                inputStream = new BufferedInputStream(new FileInputStream(file1));
                inputStream.read(b);
                outputStream.write(b);

            }
            outputStream.close();
            inputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return files;
    }
}