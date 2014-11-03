package app;

import java.io.IOException;

/**
 * Created by Gleb on 22.06.14.
 */
public class ServerLauncher {
    public static void main(String[] args) throws IOException {
        Server server = new Server(4242);
        server.start();
    }
}
