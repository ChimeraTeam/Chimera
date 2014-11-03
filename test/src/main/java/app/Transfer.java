package app;

import java.io.*;
import java.net.Socket;
import java.util.Map;
import java.util.Set;

/**
 * Created by Gleb on 21.06.14.
 */
public class Transfer {

    private int nodes;
    private Map<String, String> address;

    public Transfer(int nodes, Map<String, String> address) {
        this.nodes = nodes;
        this.address = address;
    }

    public void transfer() {
        if (address.size() != nodes) {
            System.err.println("address size != nodes");
            return;
        }
        for (int i = 0; i < nodes; i++) {
            Thread thread = new Thread(new Worker(address, i));
            thread.start();
        }
    }

    class Worker implements Runnable {

        private Map<String, String> address;
        private int id;

        public Worker(Map<String, String> address, int id) {
            this.address = address;
            this.id = id;
        }

        @Override
        public void run() {
            Set<Map.Entry<String, String>> entries = address.entrySet();
            Object[] objects = entries.toArray();
            String adrs[] = objects[id].toString().split("=");
            String ip = adrs[0];
            String port = adrs[1];
            try {
                Socket socket = new Socket(ip, Integer.valueOf(port));
                File file = new File("tmp" + id);
                byte b[] = new byte[(int) file.length()];
                BufferedOutputStream stream = new BufferedOutputStream(socket.getOutputStream());
                BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream(file));
                bufferedInputStream.read(b);
                stream.write(b);
                bufferedInputStream.close();
                stream.close();
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
