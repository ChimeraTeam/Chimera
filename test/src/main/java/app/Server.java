package app;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Created by Gleb on 22.06.14.
 */
public class Server {

    private int port;
    public Server(int port) {
        this.port = port;
    }

    public void start() throws IOException {
        InputStream inputStream = null;
        BufferedInputStream bufferedInputStream = null;
        OutputStream outputStream = null;
        BufferedOutputStream bufferedOutputStream = null;
        try {
            ServerSocket serverSocket = new ServerSocket(port);
            while (true) {
                Socket socket = serverSocket.accept();
                inputStream = socket.getInputStream();
                bufferedInputStream = new BufferedInputStream(inputStream);
                outputStream = socket.getOutputStream();
                bufferedOutputStream = new BufferedOutputStream(outputStream);
                download(inputStream);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            try {
                inputStream.close();
                bufferedInputStream.close();
                bufferedOutputStream.close();
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }

    private void download(InputStream inputStream) {
        BufferedOutputStream fileOutputStream = null;
        File file = null;
        try {
            file = new File("C:\\p");
            fileOutputStream = new BufferedOutputStream(new FileOutputStream(
                    file));
            int a = 0;
            while ((a = inputStream.read()) != -1) {
                fileOutputStream.write(a);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        } finally {
            try {
                fileOutputStream.close();
                inputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }
}
