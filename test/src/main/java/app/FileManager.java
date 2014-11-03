package app;

import java.io.*;
import java.net.Socket;

/**
 * Created by Gleb on 22.06.14.
 */
public class FileManager {
    private BufferedOutputStream bufferedOutputStream;
    private BufferedReader bufferedReader;
    private String url;
    private int port;

    public FileManager(String url, int port) {
        this.url = url;
        this.port = port;
    }


    public void connect() throws IOException {
        OutputStream outputStream = null;
        Socket socket = new Socket(url, port);
        outputStream = socket.getOutputStream();
        sendFile(outputStream);
    }

    private void sendFile(OutputStream outputStream) {
        try {
            bufferedOutputStream = new BufferedOutputStream(outputStream);
            File fileIn = new File("trajectory");
            bufferedReader = new BufferedReader(new FileReader(fileIn));
            String str = null;
            bufferedReader.readLine();
            bufferedReader.readLine();
            bufferedReader.readLine();
            while ((str = bufferedReader.readLine()) != null) {
                String strings[] = str.split(" ");
                for (int j = 4; j < strings.length; j += 5) {

                    if (strings[j].equals("]") || strings[j].equals("[")
                            || strings[j].charAt(0) == '-') {
                        continue;
                    }
                    if (check(strings[j])) {
                        StringBuilder res = new StringBuilder();
                        for (int i = 0; i < strings[j].length(); i++) {
                            if (strings[j].charAt(i) == '.') {
                                res.append(strings[j].substring(0, i));
                                double d = Double.parseDouble(res.toString());
                                int value = (int) ((3 * d) / Math.PI);
                                bufferedOutputStream.write((char) (value));
                                d = 0;
                                value = 0;
                                res.setLength(0);
                                res.append(strings[j].substring(i + 1, i + 3));
                                d = Double.parseDouble(res.toString());
                                value = (int) ((3 * d) / Math.PI);
                                bufferedOutputStream.write((char) (value));
                                res.setLength(0);
                            }
                        }
                    }
                }
            }

        } catch (Exception e) {
            System.out.println("Something goes wrong, file is not uploading (((");
            e.printStackTrace();
        } finally {

            try {
                bufferedOutputStream.close();
                bufferedReader.close();
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
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
