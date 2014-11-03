package app;

import java.io.*;
import java.util.zip.GZIPOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * Created by Gleb on 22.06.14.
 */
public class CompressDecompress {

    private File file;

    public CompressDecompress(File file) {
        this.file = file;
    }

    public void compress() throws IOException {

        BufferedReader bufferedReader = new BufferedReader(new FileReader(file));
        String str = null;

        bufferedReader.readLine();
        bufferedReader.readLine();
        bufferedReader.readLine();

        FileOutputStream fos = new FileOutputStream(file.getName() + ".gzip");
        GZIPOutputStream zos = new GZIPOutputStream(fos);

        try {
            while ((str = bufferedReader.readLine()) != null) {
                String strings[] = str.split(" ");
                for (int j = 5; j < strings.length; j += 5) {
                    if (strings[j].equals("]") || strings[j].equals("[")
                            || strings[j].charAt(0) != '-') {
                        continue;
                    }
                    zos.write(strings[j].getBytes());

                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            bufferedReader.close();
            zos.close();
            fos.close();
        }
    }

    public void decompress() throws IOException {

        ZipInputStream zis = new ZipInputStream(new FileInputStream(file));
        ZipEntry ze = zis.getNextEntry();
        while (ze != null) {

            String fileName = ze.getName();
            File newFile = new File(fileName);
            FileOutputStream fileOutputStream = new FileOutputStream(newFile);
            int c = -1;
            while ((c = zis.read()) != -1) {
                fileOutputStream.write(c);
            }
            fileOutputStream.close();
            zis.close();
        }
    }
}
